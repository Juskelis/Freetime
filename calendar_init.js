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

function ChangeCalendar(arr)
{
	$('#calendar').fullCalendar('removeEvents');
	$('#calendar').fullCalendar('addEventSource', arr);
}