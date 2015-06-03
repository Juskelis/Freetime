'use strict';

angular
.module('calendarApp')
.controller('EventCtrl', ['$scope', '$rootScope', '$http',
	function($scope,  $rootScope, $http) {
		console.log("you are here");
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
				&& $scope.event.startDate.length > 0)
			{
				if($rootScope.event != null) {
					$http.put('/event/$scope.event.id',event).success(function(data, status, headers, config) {
						$location.path('calendar');
					});
				}
				else {
					$http.post('/event/', event).success(function(data, status, headers, config) {
						$location.path('calendar');
					});
				}
			}
		};
		
		$scope.deleteEvent = function(event) {
			//no validation required
			$http.delete('/event/$scope.event.id', event).success(function(data,status,headers,config) {
				$location.path('calendar')
			});
		};
	}
]);