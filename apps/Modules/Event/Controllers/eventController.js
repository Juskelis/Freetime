'use strict';

angular
.module('calendarApp')
.controller('EventCtrl', ['$scope', '$rootScope', '$http',
	function($scope,  $rootScope, $http) {
		$scope.init = function() {
			$scope.event = {
				title:"",
				start:"",
				description:""
			};
			if($rootScope.event != null)
				$scope.event = $rootScope.event;
		};
		
		/* Expects (json object)
			Event{
				title:string
				start:string
				description:string
			}
		*/
		$scope.submitEvent = function(event) {
			if($scope.event.title.length > 0
				&& $scope.event.start.length > 0)
			{
				
				$http.put('/$scope.event.id',event).success(function(data, status, headers, config) {
					/*
						CODE ON SUCCESS
					*/
				});
			}
		};
		
		$scope.deleteEvent = function(event) {
			//no validation required
			$http.delete('/$scope.event.id', event).success(function(data,status,headers,config) {
				/*
					CODE ON SUCCESS
				*/
			});
		};
	}
]);