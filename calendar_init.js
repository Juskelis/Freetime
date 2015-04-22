$(document).ready(function() {
	// page is now ready, init calendar
	
	$('#calendar').fullCalendar({
		editable: true,
		eventlimit: true,
		
		//put callbacks here
		dayClick: function(date, jsEvent, view) {
			
		}
	});
});