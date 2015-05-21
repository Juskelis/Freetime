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
.factory('LoadEventSourceFromServer', ['$scope', '$rootScope', '$http',
	function($scope, $rootScope, $http) {
		$http.get('eventSources/' + url).success(function(data, status, headers, config) {
			$('#calendar').fullCalendar('addEventSource', data);
		}
	}
});