	db = db.getSiblingDB('fTData')
	db.createCollection('users')
	userCollection = db.getCollection("users")
	userCollection.remove({})
	
	userCollection.insert(
	{  
		  name: "Francis Time",
		  uID: 10204294063808640,
		
		  calendarIDs:[
		  {
			  cID:3
		  },
		  {
			  cID:1
		  },
		  {
			  cID:2
		  }
		  ]
	}
	)
	userCollection.insert(
	{
		  name: "Fred Time",
		  uID: 10207174424383277,
		 
		  calendarIDs:[
		  {
		    cID:1
		  },
		  {
			cID: 2
		  }
		  ]
	}
	)
	
	
	userCollection.insert(
	{  
		  name: "Silverman",
		  uID: 10207082729414692,
		  calendarIDs:[
		  {
			  cID:2
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
			uID: 10207174424383277,
			privacy: "true",
			start: "2015-05-20T20:00-22:20"
		 },
		 {
			title: "Class",
			description: "SaaS",
			id: 100,
			uID: 10207174424383277,
			privacy: "true",
			start: "2015-05-10T10:00-12:20"
		 },
		 {
			title: "Class",
			description: "SaaS",
			id: 100,
			uID: 10207174424383277,
			privacy: "true",
			start: "2015-05-12T10:00-12:20"
		 },
		 {
			title: "Class",
			description: "SaaS",
			id: 100,
			uID: 10207174424383277,
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
			uID: 10204294063808640,
			id: 10,
			privacy: "true",
			start: "2015-05-20T10:00-12:20"
			
		 },
		 {
			title: "Fix The Car",
			description: "Yup",
			uID: 10204294063808640,
			id: 11,
			privacy: "true",
			start: "2015-05-22T10:00-12:20"
		 },
		  {
			title: "Date Night",
			uID: 10204294063808640
			description: "",
			id: 12,
			privacy: "true",
			start: "2015-05-15T16:00-20:20"
		 },
		 {
			title: "Concert",
			description: "Some cool music ayyoooo",
			uID: 10204294063808640,
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
			uID: 10207082729414692,
			id: 4,
			privacy: "true",
			start: "2015-05-28T10:00-12:20"
			
		 },
		 {
			title: "Meet with Francis for that thing",
			description: "gotta move fast",
			uID: 10207082729414692,
			id: 22,
			privacy: "true",
			start: "2015-05-22T23:00-23:15"
		 },
		  {
			title: "Date Night",
			description: "",
			id: 42,
			uID: 10207082729414692,
			privacy: "true",
			start: "2015-05-10T16:00-20:20"
		 },
		 {
			title: "Free Tim",
			description: "Gotta get my homie free, Gucci too",
			uID: 10207082729414692,
			id: 24,
			privacy: "true",
			start: "2015-05-12T16:00-23:00"
		 },
		]
	}
	)




