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
.controller('AccountCtrl', ['$scope', '$rootScope', '$http',
	function($scope,  $rootScope, $http) {
		$scope.login = function()
		{
			//GET userID from DB
			//if userID -1
			//	"that's a typo"
			//else
			//	$location.path("/cal/");
		};
		
		$scope.signUp = function()
		{
			//GET userIS from DB
			//if userID -1
			//	thats a typo
			//else
			//	$location.path("/cal/");
		};
		/*
		$scope.login = function()
		{
			var username = document.getElementById("login-username").value;
			var password = document.getElementById("login-password").value;

			var loginErrorMessage = document.getElementById("failed-login");
			loginErrorMessage.hidden = true;

			if(username.length <= 0 && password.length <= 0)
			{
				loginErrorMessage.hidden = false;
				loginErrorMessage.innerHTML = "Please enter a username and password. ";
			}
			else if(username.length <= 0)
			{
				loginErrorMessage.hidden = false;
				loginErrorMessage.innerHTML = "Please enter a username. ";
			}
			else if(password.length <= 0)
			{
				loginErrorMessage.hidden = false;
				loginErrorMessage.innerHTML = "Please enter a password. ";
			}
			else if(username != "Free" && password != "Time")
			{
				loginErrorMessage.hidden = false;
				loginErrorMessage.innerHTML = "Whoops! Wrong username or password. ";
			}
			else
			{
				$('#loginModal').modal('toggle');
				$scope.loadEventsFromServer(['self', 'friend']);
				document.getElementById('LoginButton').style.display = "none";
				document.getElementById('SignUpButton').style.display = "none";
				document.getElementById('SignOutButton').style.display = "block";
				document.getElementById('SharingButton').style.display = "block";
			}
		};

		$scope.signup = function ()
		{
			var email = document.getElementById("signup-email").value;
			var username = document.getElementById("signup-username").value;
			var password = document.getElementById("signup-password").value;
			var signupErrorMessage = document.getElementById("failed-signup");
			loginErrorMessage.hidden = true;
			if(email.length <= 0 || username.length <= 0 || password.length <= 0)
			{
				signupErrorMessage.hidden = false;
				signupErrorMessage.innerHTML = "Please fill out all the fields. ";
			}
			else if(email != "freetime@free.time" && username != "Free" && password != "Time")
			{
				signupErrorMessage.hidden = false;
				signupErrorMessage.innerHTML = "Whoops! That's wrong.";
			}
			else
			{
				$('#signupModal').modal('toggle');
			}
		};

		$scope.signOut = function() {
			$('#calendar').fullCalendar('removeEvents');
			document.getElementById('LoginButton').style.display = "block";
			document.getElementById('SignUpButton').style.display = "block";
			document.getElementById('SignOutButton').style.display = "none";
			document.getElementById('SharingButton').style.display = "none";
		};

		$scope.loginEnterKeyCheck = function(event) {
			if (event.which == 13 || event.keyCode == 13) {
			    $scope.login();
			}
		};

		$scope.signUpEnterKeyCheck = function(event) {
			if (event.which == 13 || event.keyCode == 13) {
			    $scope.signup();
			}
		};
		*/
	}
]);