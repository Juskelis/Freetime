	db = db.getSiblingDB('fTData')
	db.createCollection('calendars')
	calendarCollection = db.getCollection("calendars")
	calendarCollection.remove({})
	calendarCollection.insert(
	{
		  name: "fredTime",
		  ownerId: 1,
		  calendarId: 1,
	}
	)
	listsCollection.insert(
	{  
		  name: "francisTime",
		  ownerId: 2,
		  calendarId: 2,
	}
	)




	db.createCollection('events')
	eventsCollection = db.getCollection("events")
	eventsCollection.remove({})
	eventsCollection.insert(
	{
		calendarId : 1,
		eventListId: 1,
		events : [
		 {
			title: "My Dinner",
			description: "Din-Din",
			eventListId: 1,
			id: 999,
			privacy: "true",
			start: "2015-05-20T20:00-22:20"
		 },
		 {
			title: "Class",
			description: "SaaS",
			eventListId: 1,
			id: 100,
			privacy: "true",
			start: "2015-05-10T10:00-12:20"
		 },
		 {
			title: "Class",
			description: "SaaS",
			eventListId: 1,
			id: 100,
			privacy: "true",
			start: "2015-05-12T10:00-12:20"
		 },
		 {
			title: "Class",
			description: "SaaS",
			eventListId: 1,
			id: 100,
			privacy: "true",
			start: "2015-05-15T10:00-12:20"
		 }
		]
	}
	)



	eventsCollection.insert(
	{
		calendarId : 2,
		eventListId: 2,
		events : [
		 {
			title: "Misc",
			description: "SaaS",
			eventListId: 2,
			id: 10,
			privacy: "true",
			start: "2015-05-20T10:00-12:20"
		 },
		 {
			title: "Fix The Car",
			description: "Yup",
			eventListId: 2,
			id: 11,
			privacy: "true",
			start: "2015-05-22T10:00-12:20"
		 },
		  {
			title: "Date Night",
			description: "",
			eventListId: 2,
			id: 12,
			privacy: "true",
			start: "2015-05-15T16:00-20:20"
		 },
		 {
			title: "Concert",
			description: "Some cool music ayyoooo",
			eventListId: 2,
			id: 13,
			privacy: "true",
			start: "2015-05-24T16:00-23:00"
		 },
		]
	}
	)






