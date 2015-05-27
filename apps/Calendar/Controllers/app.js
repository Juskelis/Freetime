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
.module('calendarApp', [
	'ngAnimate',
	'ngAria',
	'ngCookies',
	'ngMessages',
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'ngTouch'
])
.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'Calendar/Views/calendar.html',
		controller: 'CalendarCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
})
.service('CalendarService', function() {
	this.ClearCalendar = function() {
		$('#calendar').fullCalendar('removeEvents');
	};
	
	this.AddToCalendar = function(eventList) {
		$('#calendar').fullCalendar('addEventSource', eventList[0].events);
	};
	
	this.loadEventsFromServer = function() {
		$http.get('/events/' + url).success(function(data, status, headers, config) {
			AddToCalendar(data);
		});
	};
});

/*
.service('AddToCalendar', function() {
	return { 
        fn: function(code, callback) { //note the callback argument
            $http.get("${createLink(controller:'kats', action:'loadBreedInfo')}",
            params:{code: code}) //place your code argument here
                .success(function (template, status, headers, config) {
                    callback(template); //pass the result to your callback
                });
        };
	};
});
*/