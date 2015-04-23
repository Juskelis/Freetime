$(document).ready(function() {
	// page is now ready, init calendar
	
	$('#calendar').fullCalendar({
		editable: true,
		eventlimit: true,
		
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