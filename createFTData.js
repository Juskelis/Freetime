	db = db.getSiblingDB('fTData')
	db.createCollection('users')
	userCollection = db.getCollection("users")
	userCollection.remove({})
	
	userCollection.insert(
	{  
		  //jackson
		  name: "Francis Time",
		  uID: 10204294063808640,
		  calendarID: 3,
		  fCalendarIDs:[
		  {
			  fID:1
		  },
		  {
			  fID:2
		  }
		  ]
	}
	)
	userCollection.insert(
	{
		  name: "Fred Time",
		  uID: 10207174424383277,
		  calendarID: 1,
		  fCalendarIDs:[
		  {
			fID: 2
		  }
		  ]
	}
	)
	
	
	userCollection.insert(
	{  
		  name: "Silverman",
		  uID: 10207082729414692,
		  calendarID: 2,
		  fCalendarIDs:[{
		  }
		  ]
	}
	)

	db.createCollection('calendars')
	calendarsCollection = db.getCollection("calendars")
	calendarsCollection.remove({})
	calendarsCollection.insert(
	{
		calendarID : 1,
		events : [
		 {
			title: "My Dinner",
			description: "Din-Din",
			id: 999,
			privacy: "true",
			start: "2015-05-20T20:00-22:20"
		 },
		 {
			title: "Class",
			description: "SaaS",
			id: 100,
			privacy: "true",
			start: "2015-05-10T10:00-12:20"
		 },
		 {
			title: "Class",
			description: "SaaS",
			id: 100,
			privacy: "true",
			start: "2015-05-12T10:00-12:20"
		 },
		 {
			title: "Class",
			description: "SaaS",
			id: 100,
			privacy: "true",
			start: "2015-05-15T10:00-12:20"
		 }
		]
	}
	)



	calendarsCollection.insert(
	{
		calendarID : 3,
		events : [
		 {
			title: "Misc",
			description: "SaaS",
			id: 10,
			privacy: "true",
			start: "2015-05-20T10:00-12:20"
			
		 },
		 {
			title: "Fix The Car",
			description: "Yup",
			id: 11,
			privacy: "true",
			start: "2015-05-22T10:00-12:20"
		 },
		  {
			title: "Date Night",
			description: "",
			id: 12,
			privacy: "true",
			start: "2015-05-15T16:00-20:20"
		 },
		 {
			title: "Concert",
			description: "Some cool music ayyoooo",
			id: 13,
			privacy: "true",
			start: "2015-05-24T16:00-23:00"
		 },
		]
	}
	)


	calendarsCollection.insert(
	{
		calendarID: 2,
		events: [
		{
			title: "Hiking to see the trees",
			description: "trees",
			id: 4,
			privacy: "true",
			start: "2015-05-28T10:00-12:20"
			
		 },
		 {
			title: "Meet with Francis for that thing",
			description: "gotta move fast",
			id: 22,
			privacy: "true",
			start: "2015-05-22T23:00-23:15"
		 },
		  {
			title: "Date Night",
			description: "",
			id: 42,
			privacy: "true",
			start: "2015-05-10T16:00-20:20"
		 },
		 {
			title: "Free Tim",
			description: "Gotta get my homie free, Gucci too",
			id: 24,
			privacy: "true",
			start: "2015-05-12T16:00-23:00"
		 },
		]
	}
	)




