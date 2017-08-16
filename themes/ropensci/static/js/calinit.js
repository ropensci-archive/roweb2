var eventList = calendar.eventList
var tr = document.createElement('tr')

var eventTitle = calEvent.title
var eventStart = calEvent.dateStart
var eventEnd = calEvent.dateEnd
var eventSummary = calEvent.description
var eventGuests = calEvent.attendees

for (i in eventList) {
  var calEvent = eventList[i]
  for (i in calEvent) {
    // create TDs for each element inside event object and then, push it to TR
  }
}
