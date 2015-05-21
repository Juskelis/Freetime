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
		title: "dinner",
		description: "Din-Din",
		eventListId: 1,
		id: 999,
		privacy: "true",
		start: "2015-05-20T10:00-12:20"
	 },
	 {
		title: "class",
		description: "SaaS",
		eventListId: 1,
		id: 100,
		privacy: "true",
		start: "2015-05-20T10:00-12:20"
	 },
	 {
		title: "class",
		description: "SaaS",
		eventListId: 1,
		id: 100,
		privacy: "true",
		start: "2015-05-20T10:00-12:20"
	 },
	 {
		title: "class",
		description: "SaaS",
		eventListId: 1,
		id: 100,
		privacy: "true",
		start: "2015-05-20T10:00-12:20"
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
		title: "dinner",
		description: "Din-Din",
		eventListId: 1,
		id: 999,
		privacy: "true",
		start: "2015-05-20T10:00-12:20"
	 },
	 {
		title: "Concert",
		description: "Some plebeian band",
		eventListId: 2,
		id: 666,
		privacy: "true",
		start: "2015-05-16T3:00-4:20"
	 },
	 {
		title: "something else",
		description: "SaaS",
		eventListId: 2,
		id: 10,
		privacy: "true",
		date: "2015-05-20T10:00-12:20"
	 }
	]
}
)






