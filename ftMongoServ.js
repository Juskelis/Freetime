var express = require('express')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , util = require('util')
  , ejs = require('ejs')
  , http = require('http')
  , morgan = require('morgan')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , FacebookStrategy = require('passport-facebook').Strategy;
var app = express();

var FACEBOOK_APP_ID = "372279769646000"; 
var FACEBOOK_APP_SECRET = "b70bc4f287f6648696feed2a3feaf25b";


// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var Users;
var Calendars;

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//put config url behind file to hide passwords and username
var mongoDBConnection = require('./db.ftSample.config');

console.log(mongoDBConnection.uri);


passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
	callbackURL: "http://me.localtest.me/auth/facebook/callback"
  },
  function	(accessToken, refreshToken, profile, done) {
    //User.find({uId: profile.id}, function(err, user) {
    //if (err) { return done(err); }
	process.nextTick(function () {
      
    return done(null, profile);
    });
  }
));



var server = http.createServer(app);


// configure Express
//app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.engine('html', ejs.renderFile);
  //  app.use(express.logger());
  app.use(morgan('combined'));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extend: false}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.Router());
  //app.use(express.static(__dirname + '/public'));
//});







mongoose.connect(mongoDBConnection.uri);
mongoose.connection.on('open', function() {
	var Schema = mongoose.Schema;
	var userSchema = new Schema( 
		{
			name: String,
			uID: Number,
			calendarId: Number,
			hashedPW: String,
			fcalendarIDs: [
			{
				fID: Number
			}
			]

		},
	   {collection: 'users'}
	);
	Users = mongoose.model('Users', userSchema);
	
	var calendarSchema = new Schema( 
		{
			calendarId: Number,
			events: [ {
			   title: String,
			   description: String,
			   //eventId listed as ID
			   id: Number,
			   privacy: String,
			   start: String
			}]
		},
	   {collection: 'calendars'}
	);
	
	
	Calendars = mongoose.model('Calendars', calendarSchema);
	console.log('models have been created');
});
//------------------------------------------------------------------------------------------------------------------------------

// GET /auth/facebook 
//   Use passport.authenticate() as route middleware to authenticate the 
//   request.  The first step in Facebook authentication will involve 
//   redirecting the user to facebook.com.  After authorization, Facebook will 
//   redirect the user back to this application at /auth/facebook/callback 
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['public_profile'] }),
  function(req, res){
    // The request will be redirected to Facebook for authentication, so
    // this function will not be called.
  });

// GET /auth/facebook/callback 
//   Use passport.authenticate() as route middleware to authenticate the 
//   request.  If authentication fails, the user will be redirected back to the 
//   login page.  Otherwise, the primary route function function will be called, 
//   which, in this example, will redirect the user to the home page. 
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/cal/');
  });

  
  
 //FUNCTIONS
 //-----------------------------------------------------------------------------------------------------------
 
 //User has their own calendar with ID, find that
 //then find that calendar
 //then find the specific  event that needs to be changed
 function DeleteEvent(req, res, eID) {
	var curID = req.session.user.id;
	var calQuery = Users.findOne({uID: curID});
	calQuery.exec(function(err,user) {
		if(!err) {
			var calID = Users.calendarId;
			var query = Calendars.update({calendarId: calID}, {$pull: { events:{id: eID}}});
			query.exec(function(err, numOfDocsChanged) {
				console.log("Changed " + numOfDocsChanged);
			});
		}
	});
	/*
	var query = Calendars.update({calendarId: calID}, {$pull: { events:{id: eID}}});
	query.exec(function(err, numOfDocsChanged) {
		console.log("Changed " + numOfDocsChanged);
	});
	*/
}

//I think this might be better handled without a function, just in the call proper
function UpdateEvent(res, userID, eID, event) {

	//gets the calendarID from the user
	var curID = req.session.user.id;
	var calQuery = Users.find({uID: curID});
	calQuery.exec(function(err, user) {
		if(!err) {
			var calID = user.calendarId;
			/*
				performs the update on the given eID in the given calID
			*/
		}
	});
	
	/*
	var query = Calendars.update(
		{calendarId: calID, events.id: eID},
		{$set:
			{
			}
		}
	);
	*/
}

//literally just the my events
 function getAllEvents(req, res){
	 curId = req.user.id;
	 query = Calendars.findOne({uID: curID});
	 query.exec(function (err, itemArray) {
		displayDBError(err);
		console.log("result: " + itemArray);
		res.json(itemArray);
	});
 }

 function getMyEvents(req, res){
	 curId = req.user.id;
	 query = Calendars.findOne({uID: curID});
	 query.exec(function (err, itemArray) {
		displayDBError(err);
		console.log("result: " + itemArray);
		res.json(itemArray);
	});
 }
 
 function getFriendEvents(req,res){
	 curID = req.session.user.id;
	 query = Calendars.find({}).where('calendarID').in(Users.fcalendarIDs);
	 query.exec(function (err, itemArray) {
		displayDBError(err);
		console.log("result: " + itemArray);
		res.json(itemArray);
	});
 }	

app.use('/', express.static('./apps/'));
app.use('/eventSources/', express.static('./eventsources'));	
	

//-----------API's----------------------------------------------------------------------
	
 //loading calendars
app.get('/cal/', function (req, res){
	var id = req.params.uID;
	console.log("get all events");
	getAllEvents(res);
});

app.get('/cal/self',function (req, res){
	var id = req.params.uID;
	console.log("get my events");
	getMyEvents(res);
});

app.get('/cal/friends',function (req, res){
	console.log("get friend events");
	getFriendEventsEvents(res);
});

//loading and editing events
/*
app.put('/app/lists/:listId', jsonParser, function(req, res) {
	var id = req.params.listId;
	var jsObj = req.body;
	jsObj.owner = req.session.user;
	Lists.update({listId: id}, jsObj, {multi: false}, function (err) {
		if (err) {
			console.log('object update failed');
		}
	});
	res.sendStatus(200);
});
*/

app.put('/event/:eID', jsonParser, function (req, res){
	var eventId = req.params.eID;
	Calendars.update({});
	
});

app.post('event/:eID', jsonParser, function(req,res){

});
 
 app.delete('/event/:eID', jsonParser, function (req, res){
	 
});
 
 
 
 
app.listen(80);
 
 //-----------------------------------------------------------------------------------------------------------
 
 
 
 
 
 
/*

function getMyEvents(res){
	
	console.log("inside get my events");
	var query = Events.find({eventListId:1});
	query.exec(function (err, itemArray) {
		res.json(itemArray);
	});
}


function getFriendEvents(res){
	console.log("inside get friend events");
	var query = Events.find({eventListId:2});
	query.exec(function (err, itemArray) {
		res.json(itemArray);
	});
}

function getMyEvents(res, query){
	console.log("inside getSingleUserEvents")
	var query = Calendars.findOne({Users.findOne({calendarId:query})});
	query.exec(function (err, itemArray) {
		res.json(itemArray);		
	});
}

function getAllEvents(res, query){
	console.log("inside get all events");
	var query =Calendars.find({Users.find);
	query.exec(function (err, itemArray) {
 		res.json(itemArray);
	});
}


//how hilerio calls for list ID: <h4 class="panel-heading"><a href="#/lists/{{result.listId}}">{{$index + 1}} - {{result.name}}</a></h4>
app.get('/:uID/', function(req,res){
	var id = req.params.uID;
	console.log("get" + id + "'s events");
	getSingleUserEvents(res, {uID: id});
});


app.get('/events/', function (req, res){
	var id = req.params.uID;
	console.log("get all events");
	getAllEvents(res, uID: id);
});

app.get('/events/self', function (req, res){
	console.log("get my events");
	getMyEvents(res);
});

app.get('/events/friend', function (req, res){
	console.log("get friend events");
	getFriendEvents(res);
});

*/