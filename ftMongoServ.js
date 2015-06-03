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



//put config url behind file to hide passwords and username
var mongoDBConnection = require('./db.ftSample.config');

console.log(mongoDBConnection.uri);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



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




var Users;
var Calendars                  

mongoose.connect(mongoDBConnection.uri);
mongoose.connection.on('open', function() {
	var Schema = mongoose.Schema;
	var userSchema = new Schema( 
		{
			name: String,
			uID: Number,
			
			calendarIDs: [
			{
				cID: Number
			}
			]

		},
	   {collection: 'users'}
	);
	Users = mongoose.model('Users', userSchema);
	
	var calendarSchema = new Schema( 
		{
			calendarID: Number,
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
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['public_profile'] }),
  function(req, res){
    // The request will be redirected to Facebook for authentication, so
    // this function will not be called.
  });

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/cal/');
  });
  
app.get('logout', function(req, res){
	req.logout();
	res.redirect('/');
});

  
  
 //FUNCTIONS
 //-----------------------------------------------------------------------------------------------------------
 


 function getAllEvents(req, res) {
	 
	var userQuery = Users.findOne({uID: req.user});
	userQuery.exec(function (err, foundUser) {
		if(!err) {
			console.log(foundUser.calendarIDs);
			var arr = [];
			for (i = 0; i < foundUser.calendarIDs.length; i++){
				arr.push(foundUser.calendarIDs[i].cID);
			}
			var fcalQuery = Calendars.where('calendarID').in('calendarID', arr);
			
			fcalQuery.exec(function(err, cal) {
				if(!err) {
					console.log(cal);
					res.json(cal);
					}
				else{
					console.log("ERROR");
					res.json();
				}
				});
		}
	});
}


function getMyEvents(req, res){
	var userQuery = Users.findOne({uID: req.user});
	userQuery.exec(function (err, foundUser) {
		if(!err) {
			console.log(foundUser.calendarIDs);
			var arr = [];
			arr.push(foundUser.calendarIDs[0].cID);
			var fcalQuery = Calendars.where('calendarID').in('calendarID', arr);
			
			fcalQuery.exec(function(err, cal) {
				if(!err) {
					console.log(cal);
					res.json(cal);
					}
				else{
					console.log("ERROR");
					res.json();
				}
				});
		}
	});
}
function getFriendEvents(req, res) {
	var userQuery = Users.findOne({uID: req.user});
	userQuery.exec(function (err, foundUser) {
		if(!err) {
			console.log(foundUser.calendarIDs);
			var arr = [];
			for (i = 1; i < foundUser.calendarIDs.length; i++){
				arr.push(foundUser.calendarIDs[i].cID);
			}
			var fcalQuery = Calendars.where('calendarID').in('calendarID', arr);
			
			fcalQuery.exec(function(err, cal) {
				if(!err) {
					console.log(cal);
					res.json(cal);
					}
				else{
					console.log("ERROR");
					res.json();
				}
				});
		}
	});
}






/*
 function getAllEvents(req, res){
	 var calQuery = Users.findOne({uID: req.user});
	 var test = []; 
	 calQuery.exec(function (err, foundUser) {
		//displayDBError(err);
		console.log(foundUser);
		console.log(foundUser.calendarID);
		var foundCalID = foundUser.calendarID;
		var query = Calendars.findOne({calendarID: foundCalID})
		query.exec(function (err, itemArray){
			console.log("result: " + itemArray);
		});
	});
 }

 
 function getFriendEvents(req,res){
	 var curID = req.user;
	 query = Calendars.find({}).where('calendarID').in(Users.fcalendarIDs);
	 query.exec(function (err, itemArray) {
		displayDBError(err);
		console.log("result: " + itemArray);
		res.json(itemArray);
	});
 }	
 
 
 
  function getMyEvents(req, res){
	 query = Calendars.findOne({uID: req.user});
	 query.exec(function (err, itemArray) {
		displayDBError(err);
		console.log("result: " + itemArray);
		res.json(itemArray);
	});
 }
 
*/
app.use('/', express.static('./apps/'));
app.use('/eventSources/', express.static('./eventsources'));	
	

//-----------API's----------------------------------------------------------------------
	
 //loading calendars
app.get('/cal/', function (req, res){
	console.log("get all events");
	getFriendEvents(req,res);
});

app.get('/cal/self',function (req, res){
	console.log("get my events");
	getMyEvents(req,res);
});

app.get('/cal/friends',function (req, res){
	console.log("get friend events");
	getFriendEvents(res);	
});


/*
	What I'm doing:
		getting all the data I need at the beginning (eventID, actual event object, userID)
		get the user in the DB with userID
		get calendar user calendarId in user
		edit returned calendar
			loop through event list and overwrite events with same eventID
		Update calendars DB with new calendar
*/
app.put('/event/:eID', jsonParser, function(req, res){
	var eventID = req.params.eID;
	var event = req.body;
	var curID = req.user.id;
	var calQuery = Users.findOne({uID: curID});
	calQuery.exec(function(err, user) {
		if(!err) {
			var calID = user.calendarId;
			var eventListQuery = Calendars.findOne({calendarId: calID});
			eventListQuery.exec(function(err, cal) {
				if(!err) {
					var evList = cal.events;
					for(var i in evList) {
						if(evList[i].id == eventID)
							evList[i] = event;
					}
					cal.events = evList;
					Calendars.Update({calendarId: calID}, cal, {multi:false}, function(err) {
						if(err) {
							console.log("error updating events in calendar");
						}
					});
				}
			});
		}
	});
});
/*
	What I'm doing:
		getting all the data I need at the beginning (eventID, actual event object, userID)
		get the user in the DB with userID
		get calendar user calendarId in user
		edit returned calendar
			push new event onto event list
		Update calendars DB with new calendar
*/
app.post('/event/:eID', jsonParser, function(req, res){
	var eventID = req.params.eID;
	var event = req.body;
	var curID = req.user.id;
	var calQuery = Users.findOne({uID: curID});
	calQuery.exec(function(err, user) {
		if(!err) {
			var calID = user.calendarId;
			var eventListQuery = Calendars.findOne({calendarId: calID});
			eventListQuery.exec(function(err, cal) {
				if(!err) {
					var evList = cal.events;
					evList.push(event);
					cal.events = evList;
					Calendars.Update({calendarId: calID}, cal, {multi: false}, function(err) {
						if(err) {
							console.log("error creating new event in calendar");
						}
					});
				}
			});
		}
	});
});


/*
	get current user
	get current calendar and remove events with eventID
*/
app.delete('/event/:eID', function(req, res) {
	var eventID = req.params.eID;
	var curID = req.user.id;
	var calQuery = Users.findOne({uID: curID});
	calQuery.exec(function(err, user) {
		if(!err) {
			var calID = user.calendarID;
			var query = Calendars.update({calendarId: calID}, {$pull: { events:{id:eventID}}});
			query.exec(function(err, numOfDocsChanged) {
				console.log("Changed " + numOfDocsChanged);
			});
		}
	});
});
  
 
app.listen(80);
