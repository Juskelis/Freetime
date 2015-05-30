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
.controller('CalendarCtrl', ['$scope', '$rootScope', '$http',
	function($scope,  $rootScope, $http) {
		$scope.initCalendar = function() {
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
					$rootScope.event = event;
					$location.path('event');
				},
				
				eventDrop: function(event, delta) {
					$scope.saveEventsToServer();
				},
				
				eventResize: function(event, delta) {
					$scope.saveEventsToServer();
				}
			});
			//CalendarService.loadEventsFromServer(['self']);
		};
		
		//NEED TO LEARN HOW TO LOAD EVENTS FROM SERVER
		//	update calendar.html when finished
		
		// calendar stuff
		$scope.ClearCalendar = function() {
			$('#calendar').fullCalendar('removeEvents');
		};
		
		$scope.AddToCalendar = function(eventList) {
			/*
				this is assuming that returned data from server will be
					list of eventList objects
				If it is not, we need to change this.
			*/
			
			//loop through first list and change color to blue
			for(var i = 0; i < eventList[0].length; i++) {
				eventList[0][i].color = "rgb(0,255,0)";
			}
			for(var i = 0; i < eventList.length - 1; i++) {
				for(var v = 0; i < eventList[i].length; v++) {
					eventList[i][v].color = "rgb(0,0,255)";
				}
			}
			for(var i = 0; i < eventList.length; i++) {
				$('#calendar').fullCalendar('addEventSource', eventList[i].events);
			}
		};
		
		//
		$scope.loadEventsFromServer = function(calendarIDs) {
			/*
				generate url needed (based on whatever server expects)
				for this we have access to:
					userID
					flag for which calendars to call (all, user, friends)
					
				next, send that url to $http.get and expects:
					array of eventSource objects
					first element is ALWAYS user's own events
						if loading only friends, make first element null
				callback calls AddToCalendar with returned object
			*/
			
			/*
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
			var filter_color = "rgb(0,255,0)";
			
			var events = $('calendar').fullCalendar('clientEvents', function(evt) {
				return evt.color == "rgb(0,255,0)";
			});
			
			/*
				post eventList to server
			*/
		};
		
		/*
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