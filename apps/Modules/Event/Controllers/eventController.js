'use strict';

angular
.module('calendarApp')
.controller('EventCtrl', ['$scope', '$rootScope', '$http', '$location', '$route',
	function($scope,  $rootScope, $http, $location, $route) {
		console.log("you are here");
		$scope.init = function() {
			$scope.event = {
				title:"",
				start:"",
				description:""
			};
			if($rootScope.event != null) {
				//$scope.event = $rootScope.event;
				$scope.event.title = $rootScope.event.title;
				$scope.event.description = $rootScope.event.description;
				$scope.event.uID = $rootScope.event.uID;
				$scope.event.id = $rootScope.event.id;
				$scope.event.privacy = $rootScope.event.privacy;
				$scope.event.start = $rootScope.event.start;
			}
		};
		
		/* Expects (json object)
			Event{
				title:string
				start:string
				description:string
			}
		*/
		$scope.submitEvent = function(event) {
			if($scope.event.title.length > 0)
			{
				if($rootScope.event != null) {
					$http.put('/event/' + $scope.event.id, event).success(function(data, status, headers, config) {
						$location.path('/calendar');
						$route.reload();
					});
				}
				else {
					$http.post('/event/', event).success(function(data, status, headers, config) {
						$location.path('/calendar');
						$route.reload();
					});
				}
			}
		};
		
		$scope.deleteEvent = function() {
			//no validation required
			$http.delete('/event/' + $scope.event.id).success(function(data,status,headers,config) {
				$location.path('calendar');
				$route.reload();
			});
		};
	}
]);