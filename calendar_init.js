$(document).ready(function() {
	// page is now ready, init calendar
	
	$('#calendar').fullCalendar({
		editable: true,
		eventLimit: true,
		
		events: [
		  /*{
			"title": "Birthday",
			"start": "2015-04-21",
			"allDay": "true"
		  },
		  {
			"title": "Meeting",
			"start": "2015-04-12T10:30:00-05:00",
			"end": "2015-04-12T12:30:00-05:00"
		  }*/
		],
		
		header: 
		{
			left: 'title',
			center: '',
			right: 'today prev,next month,agendaWeek,agendaDay'
		},
		
		//put callbacks here
		dayClick: function(date, jsEvent, view) {
			
		}
	});
});

function ClearCalendar()
{
	$('#calendar').fullCalendar('removeEvents');
}

function AddToCalendar(arr)
{
	$('#calendar').fullCalendar('addEventSource', arr);
}



function loadEventsFromServer(url) {
	url = 'eventSources/' + url;
	var xmlhttp = new XMLHttpRequest();
	var events;
	
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var events = JSON.parse(xmlhttp.responseText);
			AddToCalendar(events);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}
