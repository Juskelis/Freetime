'use strict';

angular
.module('calendarApp')
.controller('EventCtrl', ['$scope', '$rootScope', '$http', '$location', '$route',
	function($scope,  $rootScope, $http, $location, $route) {
		console.log("you are here");
		$scope.init = function() {
			$scope.event = {
				title:"",
				start: moment($('#calendar').fullCalendar('getDate')).format(),
				description:""
			};
			if($rootScope.event != null) {
				//$scope.event = $rootScope.event;
				$scope.event.title = $rootScope.event.title;
				$scope.event.description = $rootScope.event.description;
				$scope.event.uID = $rootScope.event.uID;
				$scope.event.privacy = $rootScope.event.privacy;
				$scope.event.start = $rootScope.event.start;
				$scope.event.id = $rootScope.event.id
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
			console.log(" In submitEvent");		
			if($scope.event.title.length > 0 && toString($scope.event.start).length != 0)			
			{
				if($rootScope.event != null) {
					console.log("submitEvent: $rootScope.event != null");	
					$http.put('/event/' + $scope.event.id, event).success(function(data, status, headers, config) {
						$location.path('/calendar');
						$route.reload();
					});
				}
				else {
					if(moment($scope.event.start).format() == "Invalid date") {
						$scope.event.start = moment($('#calendar').fullCalendar('getDate')).format();
					}	
					$http.post('/event/', event).success(function(data, status, headers, config) {
						$location.path('/calendar');
						$route.reload();
					});
				}
			}
		};
		
		$scope.deleteEvent = function() {
			console.log("In deleteEvent");	
			//no validation required
			$http.delete('/event/' + $scope.event.id).success(function(data,status,headers,config) {
				$location.path('calendar');
				$route.reload();
			});
		};
	}
]);
