	db = db.getSiblingDB('fTData')
	db.createCollection('users')
	userCollection = db.getCollection("users")
	userCollection.remove({})
	
	userCollection.insert(
	{  
		  //jackson
		  name: "Francis Time",
		  uID: 10204287096954473,
		  calendarID: 3,
		  hashedPW: "n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=",
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
		  uID:1,
		  calendarId: 1,
		  hashedPW: "n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=",
		  fCalendarIDs:[
		  {
			fID: 2
		  }
		  ]
	}
	)
	
	
	userCollection.insert(
	{  
		  name: "Frank Time",
		  uID: 3,
		  calendarID: 2,
		  hashedPW: "n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=",
		  fCalendarIDs:[{
		  }
		  ]
	}
	)


user1 = userCollection.findOne({name: 'Francis Time'})
user1Id = user1._id.valueOf();
user2 = userCollection.findOne({username: 'Fred Time'})
user2Id = user2._id.valueOf();
user3 = userCollection.findOne({username: 'Frank'})
user3Id = user3._id.valueOf();	
	

	db.createCollection('calendars')
	calendarsCollection = db.getCollection("calendars")
	calendarsCollection.remove({})
	calendarsCollection.insert(
	{
		calendarId : 1,
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
		calendarId : 3,
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
		calendarId : 2,
		events : [
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




