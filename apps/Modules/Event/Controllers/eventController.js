'use strict';

angular
.module('calendarApp')
.controller('EventCtrl', ['$scope', '$rootScope', '$http',
	function($scope,  $rootScope, $http) {
		/* Expects (json object)
			Event{
				name:string
				startDate:string
				endDate:string
				description:string
			}
		*/
		$scope.submitEvent = function(event) {
			/*
				VALIDATE EVENT HERE
			*/
			$http.put('',event).success(function(data, status, headers, config) {
				/*
					CODE ON SUCCESS
				*/
			});
		};
	}
]);