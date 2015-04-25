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
	if(username.length <= 0 || password.length <= 0)
	{
		loginErrorMessage.hidden = false;
		loginErrorMessage.innerHTML = "You forgot something";
	}
	else if(username != "Free" && password != "Time")
	{
		loginErrorMessage.hidden = false;
		loginErrorMessage.innerHTML = "Whoops! That's wrong.";
	}
	else
	{
		$('#loginModal').modal('toggle');
	}
}

var signupErrorMessage = document.getElementById("failed-signup");
function signup(email, username, password)
{
	loginErrorMessage.hidden = true;
	if(email.length <= 0 || username.length <= 0 || password.length <= 0)
	{
		signupErrorMessage.hidden = false;
		signupErrorMessage.innerHTML = "You forgot something";
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