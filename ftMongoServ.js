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

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//put config url behind file to hide passwords and username
var mongoDBConnection = require('./db.ftSample.config');
console.log(mongoDBConnection.uri);
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
var idGenerator = 1000;
var userID =  10204294063808640;
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
			   uID: Number,
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


 //FUNCTIONS
 //------------------------------------------------------------------------
 


 function getAllEvents(req, res) {
	 
	var userQuery = Users.findOne({uID: userID});
	userQuery.exec(function (err, foundUser) {
		if(!err) {
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
	var userQuery = Users.findOne({uID: userID});
	userQuery.exec(function (err, foundUser) {
		if(!err) {
			var arr = [];
			arr.push(foundUser.calendarIDs[0].cID);
			var fcalQuery = Calendars.where('calendarID').equals(arr[0]);
			
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
		else{
			console.log("ERROR");
			res.json();
			}
	});
}
function getFriendEvents(req, res) {
	var userQuery = Users.findOne({uID: userID});
	userQuery.exec(function (err, foundUser) {
		if(!err && foundUser != null) {
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



function saveCalendar(req,res, eventList){
	var userQuery = Users.findOne({uID: userID});
	userQuery.exec(function (err, foundUser) {
		if(!err) {
			//Calendars.findOneAndUpdate({calendarID: JSON.stringify(foundUser.calendarIDs[0]).replace( /\D+/g, '')} , {$set: {events: eventList}}, function (err, result) {
			Calendars.findOneAndUpdate({calendarID: JSON.stringify(foundUser.calendarIDs[0]).replace( /\D+/g, '')} , {$set: {events: eventList}}, function (err, result) {
				
				if(err){
					console.log(err);
				} else {
					console.log ("Noice. ");
					res.sendStatus(200);
				}
			});
		}
	});
}



function saveSingleEvent(req,res, event){
	
	var userQuery = Users.findOne({uID: userID});
	userQuery.exec(function (err, foundUser) {
		if(!err) {
			var arr = [];
			arr.push(foundUser.calendarIDs[0].cID);
			var fcalQuery = Calendars.where('calendarID').equals(arr[0]);
			
			fcalQuery.exec(function(err, cal) {
				if(!err) {
					for(var i in cal[0].events){
						if(cal[0].events[i].id == event.id){
							cal[0].events[i] = event;
							var holder = i;
						}
					}
					
					saveCalendar(req, res, cal[0].events);
				}
			});
		}
	});
}

function addEvent(req,res, event){
	
	var userQuery = Users.findOne({uID: userID});
	userQuery.exec(function (err, foundUser) {
		if(!err) {
			var arr = [];
			arr.push(foundUser.calendarIDs[0].cID);
			var fcalQuery = Calendars.where('calendarID').equals(arr[0]);
			
			fcalQuery.exec(function(err, cal) {
				if(!err) {
					cal.events.push(event);
					
					}
				else{
					console.log("ERROR");
					res.json();
				}
				});
		}
		else{
			console.log("ERROR");
			res.json();
			}
	});
}


function createSingleEvent(req, res, event){
	
	var userQuery = Users.findOne({uID: userID});
	userQuery.exec(function (err, foundUser) {
		if(!err) {
			var arr = [];
			arr.push(foundUser.calendarIDs[0].cID);
			var fcalQuery = Calendars.where('calendarID').equals(arr[0]);
			
			fcalQuery.exec(function(err, cal) {
				if(!err) {
					cal[0].events.push(event);
					/*
					for(var i in cal[0].events){
						if(cal[0].events[i].id == event.id){
							cal[0].events[i] = event;
							var holder = i;
						}
					}
					*/
					
					saveCalendar(req, res, cal[0].events);
				}
			});
		}
	});
}

function deleteSingleEvent(req, res, eventID) {
	var userQuery = Users.findOne({uID: userID});
	userQuery.exec(function (err, foundUser) {
		var arr = [];
		arr.push(foundUser.calendarIDs[0].cID);
		var fcalQuery = Calendars.where('calendarID').equals(arr[0]);
		
		fcalQuery.exec(function(err, cal) {
			if(!err) {
				for(var i = 0; i < cal[0].events.length; i++) {
					if(cal[0].events[i].id == eventID) {
						cal[0].events.splice(i,1);
					}
				}
				// console.log(cal[0].events);
				saveCalendar(req, res, cal[0].events);
			}
		});
	});
}


 
app.use('/', express.static('./apps/'));
app.use('/eventSources/', express.static('./eventsources'));	
	

//-----------API's----------------------------------------------------------------------
	
	
app.get('/init/', function(req,res){
	res.send(userID);
});
 //loading calendars
app.get('/cal/', function (req, res){
	console.log("get all events");
	getAllEvents(req,res);
});


app.get('/cal/self',function (req, res){
	console.log("get my events");
	getMyEvents(req,res);
});

app.get('/cal/friends',function (req, res){
	console.log("get friend events");
	getFriendEvents(req,res);	
});


app.put('/cal/save/', jsonParser, function (req,res){

	console.log('saving current calendar');
	eventList = req.body;
	console.log(eventList);
	saveCalendar(req,res, eventList);
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
	console.log("running the put");
	var event = req.body;
	saveSingleEvent(req, res, event);
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
app.post('/event/', jsonParser, function(req, res){
	console.log("running the post");
	var event = req.body;
	//var curID = userID.id;
	
	//cal.events.push(event);
		
	event.uID = userID;
	event.id = idGenerator;
	event.privacy = "true";
	
	idGenerator += 1;
	createSingleEvent(req, res, event);

});

/*
	get current user
	get current calendar and remove events with eventID
*/
app.delete('/event/:eID', jsonParser, function(req, res) {
	var eventID = req.params.eID;
	deleteSingleEvent(req, res, eventID)
});
  
 
app.listen(80);
