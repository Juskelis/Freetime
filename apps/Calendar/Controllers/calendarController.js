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
				}
			});
		};
		
		
		// calendar stuff
		$scope.ClearCalendar = function() {
			console.log("inside Clear");
			$('#calendar').fullCalendar('removeEvents');
		};
		//possibly change to service
		$scope.AddToCalendar = function(eventList) {
			console.log("AddToCalendar")
			$('#calendar').fullCalendar('addEventSource', eventList[0].events);
		};
		
		$scope.loadEventsFromServer = function(calendarNames) {
			$scope.ClearCalendar();
			console.log("inside loadEventsFromServer");
			for(var i = 0; i < calendarNames.length; i++) {
				$scope.loadEventSourceFromServer(calendarNames[i]);
			}
		};
		//put in server
		$scope.loadEventSourceFromServer = function(url) {
			$http.get('/events/' + url).success(function(data, status, headers, config) {
				console.log("inside loadEventsFromServer");
				$scope.AddToCalendar(data);
			});
		};
	}
]);