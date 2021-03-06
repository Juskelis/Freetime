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
		templateUrl: 'Modules/Core/Views/welcome.html'
	})
	.when('/auth/', {
		templateUrl: 'Modules/Authentication/Views/auth.html',
		controller: 'AccountCtrl'
	})
	.when('/cal/', {
		templateUrl: 'Modules/Calendar/Views/calendar.html',
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
	
	// this function needs to be modified in the future
	this.loadEventsFromServer = function() {
		$http.get('/events/' + url).success(function(data, status, headers, config) {
			AddToCalendar(data);
		});
	};
});