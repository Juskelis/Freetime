function openLogin()
{
	$('#loginModal').modal({
		keyboard: false,
		backdrop: "static"
	});
}

function openSignup()
{
	$('#signupModal').modal({
		keyboard: false,
		backdrop: "static"
	});
}

var loginErrorMessage = document.getElementById("failed-login");
function login(username, password)
{
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
		//allEvents();
		document.getElementById('LoginButton').style.display = "none";
		document.getElementById('SignUpButton').style.display = "none";
		document.getElementById('SignOutButton').style.display = "block";
		document.getElementById('SharingButton').style.display = "block"
		document.getElementById('myEventsButton').disabled = false;
		document.getElementById('allEventsButton').disabled = false;
		document.getElementById('friendEventsButton').disabled = false;
	}
}

var signupErrorMessage = document.getElementById("failed-signup");
function signup(email, username, password)
{
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
}

function signOut() {
	$('#calendar').fullCalendar('removeEvents');
	document.getElementById('LoginButton').style.display = "block";
	document.getElementById('SignUpButton').style.display = "block";
	document.getElementById('SignOutButton').style.display = "none";
	document.getElementById('SharingButton').style.display = "none"
	document.getElementById('myEventsButton').disabled = true;
	document.getElementById('allEventsButton').disabled = true;
	document.getElementById('friendEventsButton').disabled = true;
}

function loginEnterKeyCheck(event) {
	if (event.which == 13 || event.keyCode == 13) {
        login(document.getElementById('login-username').value, document.getElementById('login-password').value);
    }
}

function signUpEnterKeyCheck(event) {
	if (event.which == 13 || event.keyCode == 13) {
        signup(document.getElementById('signup-email').value, document.getElementById('signup-username').value, document.getElementById('signup-password').value);
    }
}
/* NOTE THIS BELONGS IN ITS OWN FILE*/
function sharingEnterKeyCheck(event) {
	if (event.which == 13 || event.keyCode == 13) {
        addFriend(document.getElementById('friend-id').value);
    }
}

function addFriend(ID) {
	$('#sharingModal').modal('toggle');
}

function removeFriend() {
	document.getElementById("friendList").options[document.getElementById("friendList").selectedIndex] = null;
}