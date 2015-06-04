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
var idGenerator = 1000;
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
    res.redirect('/#/calendar/');
  });
  
app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});
 
  
 //FUNCTIONS
 //------------------------------------------------------------------------
 


 function getAllEvents(req, res) {
	 
	var userQuery = Users.findOne({uID: req.user});
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
	var userQuery = Users.findOne({uID: req.user});
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
	var userQuery = Users.findOne({uID: req.user});
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
	console.log("In saveCalendar");
	var userQuery = Users.findOne({uID: req.user});
	userQuery.exec(function (err, foundUser) {
		if(!err) {
			console.log("saveCalendar.userQuery: No Error");
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
	console.log("In saveSingleEvent");
	var userQuery = Users.findOne({uID: req.user});
	userQuery.exec(function (err, foundUser) {
		if(!err) {
			console.log("saveSingleEvent.userQuery: No error");
			var arr = [];
			arr.push(foundUser.calendarIDs[0].cID);
			var fcalQuery = Calendars.where('calendarID').equals(arr[0]);
			
			fcalQuery.exec(function(err, cal) {
				if(!err) {
					console.log("saveSingleEvent.userQuery.fcalQuery: No Error");
					for(var i in cal[0].events){
						if(cal[0].events[i].id == event.id){
							cal[0].events[i] = event;
							var holder = i;
						}
					}
					
					saveCalendar(req, res, cal[0].events);
				} else {
					console.log(err);
				}
			});
		}
		console.log(err);
	});
}


			/*
function saveSingleEvent(req,res, event){
	
	var userQuery = Users.findOne({uID: req.user});
	userQuery.exec(function (err, foundUser) {
		if(!err) {
			var arr = [];
			arr.push(foundUser.calendarIDs[0].cID);
			var fcalQuery = Calendars.where('calendarID').equals(arr[0]);
			
			fcalQuery.exec(function(err, cal) {
				
				
				if(!err) {
					for(var i in cal[0].events){
						console.log("individual IDs " + cal[0].events[i].id);
						if(cal[0].events[i].id == event.id){
							cal[0].events[i] = event;
							var holder = i;
						}
					}
					
					saveCalendar(req, res, cal[0].events);
					
					//cal[0].markModified('events');
					//cal[0].save(function (err) {
					//	if (err) {
						//	console.log(err);
						//}
					});
				})

					
					/*
					//cal[0].save();
					//calendars.markModified('cal.events[holder]');
					//Calendars.markModified('cal');
					//Calendars.markModified('cal[holder]');
					//cal[0].events[holder].save();
					//res.sendStatus(200);
					}
					else{
					console.log("ERROR");
					
					res.sendStatus(404);
				}
				});
		}
		else{
			console.log("ERROR");
			
			res.sendStatus(404);
			}
	});
}
*/

function addEvent(req,res, event){
	console.log("In addEvent");
	var userQuery = Users.findOne({uID: req.user});
	userQuery.exec(function (err, foundUser) {
		if(!err) {
			console.log("addEvent.userQuery: No error")
			var arr = [];
			arr.push(foundUser.calendarIDs[0].cID);
			var fcalQuery = Calendars.where('calendarID').equals(arr[0]);
			
			fcalQuery.exec(function(err, cal) {
				if(!err) {
					console.log("addEvent.userQuery.fcalQuery: No error")
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
	console.log("In createSingleEvent");
	var userQuery = Users.findOne({uID: req.user});
	userQuery.exec(function (err, foundUser) {
		if(!err) {
			console.log("createSingleEvent.userQuery: No Error");
			var arr = [];
			arr.push(foundUser.calendarIDs[0].cID);
			var fcalQuery = Calendars.where('calendarID').equals(arr[0]);
			
			fcalQuery.exec(function(err, cal) {
				if(!err) {
					console.log("createSingleEvent.userQuery.fcalQuery: No Error");
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
				} else {
					console.log(err);
				}
			});
		} else {
			console.log(err);
		}
	});
}

function deleteSingleEvent(req, res, eventID) {
	console.log("In deleteSingleEvent");
	var userQuery = Users.findOne({uID: req.user});
	userQuery.exec(function (err, foundUser) {
		console.log("In deleteSingleEvent.userQuery: No error checking");
		var arr = [];
		arr.push(foundUser.calendarIDs[0].cID);
		var fcalQuery = Calendars.where('calendarID').equals(arr[0]);
		
		fcalQuery.exec(function(err, cal) {
			if(!err) {
				console.log("deleteSingeEvent.userQuery.fcalQuery: No error");
				for(var i = 0; i < cal[0].events.length; i++) {
					if(cal[0].events[i].id == eventID) {
						cal[0].events.splice(i,1);
					}
				}
				// console.log(cal[0].events);
				saveCalendar(req, res, cal[0].events);
			} else {
				console.log(err);
			}
		});
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
	
	
app.get('/init/', function(req,res){
	res.send(req.user);
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
	
	/*
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
	*/
});/*
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
	//var curID = req.user.id;
	
	//cal.events.push(event);
		
	event.uID = req.user;
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
	console.log("In delete API");
	var eventID = req.params.eID;
	deleteSingleEvent(req, res, eventID)
/*
	var eventID = req.params.eID;
	console.log(eventID);

	var curID = req.user;
	console.log("curID: " + req.user);
	var calQuery = Users.findOne({uID: curID});
	calQuery.exec(function(err, user) {
		if(!err) {
			console.log("user?: " + JSON.stringify(user));
			/*var calID = user.calendarID;
			var query = Calendars.update({calendarId: calID}, {$pull: { events:{id:eventID}}});
			query.exec(function(err, numOfDocsChanged) {
				console.log("Changed " + numOfDocsChanged);
			});
		}
	});*/
});
  
 
app.listen(process.env.PORT);
