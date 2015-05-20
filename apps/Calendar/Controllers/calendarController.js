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
			url = 'eventSources/' + url;
			var xmlhttp = new XMLHttpRequest();
			var events;
			
			xmlhttp.onreadystatechange = function() {
				if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var events = JSON.parse(xmlhttp.responseText);
					AddToCalendar(events);
				}
			}
			xmlhttp.open("GET", url, true);
			xmlhttp.send();
		};
	}
]);