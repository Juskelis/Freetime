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
		
		$scope.ClearCalendar = function() {
			$('#calendar').fullCalendar('removeEvents');
		};
		
		$scope.AddToCalendar = function(arr) {
			$('#calendar').fullCalendar('addEventSource', arr);
		};
		
		$scope.loadEventsFromServer = function(calendarNames) {
			ClearCalendar();
			
			for(i = 0; i < calendarNames.length; i++) {
				loadEventSourceFromServer(calendarNames[i]);
			}
		};
		
		$scope.loadEventSourceFromServer = function(url) {
			$http.get('eventSources/' + url).success(function(data) {
				var events = JSON.parse(data);
				AddToCalendar(events);
			});
		};
	}
]);