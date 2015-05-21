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
		name: "dinner",
		description: "Din-Din",
		eventListId: 1,
		privacy: "true",
		eventId: 999,
		date: "2015-05-20T10:00-12:20"
	 },
	 {
		name: "class",
		description: "SaaS",
		eventListId: 1,
		privacy: "true",
		eventId: 100,
		date: "2015-05-20T10:00-12:20"
	 },
	 {
		name: "class",
		description: "SaaS",
		eventListId: 1,
		privacy: "true",
		eventId: 100,
		date: "2015-05-20T10:00-12:20"
	 },
	 {
		name: "class",
		description: "SaaS",
		eventListId: 1,
		privacy: "true",
		eventId: 100,
		date: "2015-05-20T10:00-12:20"
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
		name: "dinner",
		description: "Din-Din",
		eventListId: 1,
		privacy: "true",
		eventId: 999,
		date: "2015-05-20T10:00-12:20"
	 },
	 {
		name: "Concert",
		description: "Some plebeian band",
		eventListId: 2,
		privacy: "true",
		eventId: 666,
		date: "2015-05-16T3:00-4:20"
	 },
	 {
		name: "something else",
		description: "SaaS",
		eventListId: 2,
		privacy: "true",
		eventId: 10,
		date: "2015-05-20T10:00-12:20"
	 }
	]
}
)






