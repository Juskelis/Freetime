//main calendar
function runMain()
{
	ChangeCalendar([
		{
			"title": "All Day Event",
			"start": "2015-04-01"
		},
		{
			"title": "Long Event",
			"start": "2015-04-07",
			"end": "2015-04-10"
		},
		{
			"id": "999",
			"title": "Repeating Event",
			"start": "2015-04-09T16:00:00-05:00"
		},
		{
			"id": "999",
			"title": "Repeating Event",
			"start": "2015-04-16T16:00:00-05:00"
		},
		{
			"title": "Conference",
			"start": "2015-04-11",
			"end": "2015-04-13"
		},
		{
			"title": "Meeting",
			"start": "2015-04-12T10:30:00-05:00",
			"end": "2015-04-12T12:30:00-05:00"
		},
		{
			"title": "Lunch",
			"start": "2015-04-12T12:00:00-05:00"
		},
		{
			"title": "Meeting",
			"start": "2015-04-12T14:30:00-05:00"
		},
		{
			"title": "Happy Hour",
			"start": "2015-04-12T17:30:00-05:00"
		},
		{
			"title": "Dinner",
			"start": "2015-04-12T20:00:00"
		},
		{
			"title": "Birthday Party",
			"start": "2015-04-13T07:00:00-05:00"
		},
		{
			"title": "Click for Google",
			"url": "http://google.com/",
			"start": "2015-04-28"
		}
	]);
}

function runSchool()
{
	ChangeCalendar([
		{
			"id": "999",
			"title": "Class",
			"start": "2015-04-01T10:00-12:20"
		},
		{
			"id": "999",
			"title": "Class",
			"start": "2015-04-03T10:00-12:20"
		},
		{
			"id": "999",
			"title": "Class",
			"start": "2015-04-06T10:00-12:20"
		},
		{
			"id": "999",
			"title": "Class",
			"start": "2015-04-08T10:00-12:20"
		},
		{
			"id": "999",
			"title": "Class",
			"start": "2015-04-10T10:00-12:20"
		}
	]);
}

function runWork()
{
	ChangeCalendar();
}

function runConcert()
{
	ChangeCalendar([
		{
			"title": "Kimbra",
			"start": "2015-04-13T20:00",
			"end": "2015-04-13T23:00"
		}
	]);
}

