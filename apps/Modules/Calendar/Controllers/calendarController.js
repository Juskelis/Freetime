'use strict';

/**
 * @ngdoc overview
 * @name To Do App
 * @description
 * # To do Application
 *
 * Main module of the application.
 */
angular
.module('calendarApp')
.controller('CalendarCtrl', ['$scope', '$rootScope', '$http', '$location', '$route', 
	function($scope,  $rootScope, $http, $location, $route) {
		$scope.initCalendar = function() {
			$http.get('/init/').success(function(data, status, headers, config) {
				$rootScope.user = data;
			});
			
			$('#calendar').fullCalendar({
				editable: true,
				eventLimit:true,
				
				header:
				{
					left:'title',
					center:'',
					right:'today prev,next month,agendaWeek,agendaDay'
				},
				
				eventClick: function(event, element) {
					if(event.uID == $rootScope.user) {
						$rootScope.event = event;
						$location.path('/eventDetails');
						console.log($location.path());
						$route.reload();
					}
				},
				
				eventDrop: function(event, delta) {
					if(event.uID == $rootScope.user) {
						$scope.saveEventsToServer();
					}
				}/*,
				
				eventResize: function(event, delta) {
					if(event.uID == $rootScope.user) {
						$scope.saveEventsToServer();
					}
				}*/
			});
			$scope.loadEventsFromServer('');
		};
		
		//NEED TO LEARN HOW TO LOAD EVENTS FROM SERVER
		//	update calendar.html when finished
		
		// calendar stuff
		$scope.ClearCalendar = function() {
			$('#calendar').fullCalendar('removeEvents');
		};
		
		$scope.AddToCalendar = function(eventList) {
			/*	assumptions
				this is assuming that returned data from server will be
					list of eventList objects w/ user always first
				If it is not, we need to change this.
			*/
			
			//loop through first list and change color to blue
			/*
			for(var i = 0; i < eventList[0].length; i++) {
				eventList[0][i].color = "rgb(0,0,255)";
			}
			for(var i = 1; i < eventList.length; i++) {
				for(var v = 0; i < eventList[i].length; v++) {
					eventList[i][v].color = "rgb(255,0,0)";
				}
			}
			*/
			$('#calendar').fullCalendar('addEventSource', eventList);
		};
		
		//
		$scope.loadEventsFromServer = function(calendarFlag) {
			/*	assumptions
				generate url needed (based on whatever server expects)
				for this we have access to:
					userID
					flag for which calendars to call (all, user, friends)
					
				next, send that url to $http.get and expect as return:
					array of eventSource objects
					first element is ALWAYS user's own events
						if loading only friends, make first element null
				callback calls AddToCalendar with returned object
			*/
			
			/*	routes
				all:	GET /cal/
				self:	GET /cal/self
				friends:GET /cal/friends
			*/
			
			$scope.ClearCalendar();
			var call = "/cal/" + calendarFlag;
			$http.get(call).success(function(data, status, headers, config) {
				
				if(data != null) {
					var eventList = [];
					for(var c = 0; c < data.length; c++) {
						var cal = data[c];
						for(var e = 0; e < cal.events.length; e++) {
							var event = cal.events[e];
							event.editable = event.ownerID == $rootScope.user;
							if(event.editable) {
								//event.color = "rgb(58,135,173)";
								event.color = "rgb(137,225,35)";
							}
							else {
								event.color = "rgb(58,135,173)";
								//event.color = "rgb(202,113,10)";
							}
							eventList.push(event);
						}
					}
					$scope.AddToCalendar(eventList);
				}
			});
			
			/* old version
			-----original parameter was calendarNames-----
			$scope.ClearCalendar();
			console.log("inside loadEventsFromServer");
			for(var i = 0; i < calendarNames.length; i++) {
				$scope.loadEventSourceFromServer(calendarNames[i]);
			}
			*/
		};
		
		//only called when pre-existing events change (aka they are dragged/resized)
		$scope.saveEventsToServer = function() {
			//color of user's events
			var events = $('#calendar').fullCalendar('clientEvents', function(evt) {
				return evt.editable;
			});
			var send = [];
			for(var i = 0; i < events.length; i++) {
				var evt = {};
				evt.title = events[i].title;
				evt.description = events[i].description;
				evt.ownerID = events[i].ownerID;
				evt.id = events[i].id;
				evt.privacy = events[i].privacy;
				evt.start = events[i].start;
				send.push(evt);
			}
			
			/*	routes
				post eventList to server
				
				PUT /cal/save/
			*/
			
			$http.put('/cal/save/', send).success(function(data, status, headers, config) {
				console.log("saved calendar");
			});
		};
		
		/* old stuff
		//put in server
		$scope.loadEventSourceFromServer = function(url) {
			$http.get('/events/' + url).success(function(data, status, headers, config) {
				console.log("inside loadEventsFromServer");
				$scope.AddToCalendar(data);
			});
		};
		this.ClearCalendar = function() {
			$('#calendar').fullCalendar('removeEvents');
		};
		
		this.AddToCalendar = function(eventList) {
			$('#calendar').fullCalendar('addEventSource', eventList[0].events);
		};
		
		// this function needs to be modified in the future
		this.loadEventsFromServer = function() {
			$http.get('/events/' + url).success(function(data, status, headers, config) {
				AddToCalendar(data);
			});
		};
		*/
	}
]);