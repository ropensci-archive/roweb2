var eventList = calendar.eventList
var tableList = document.getElementById('eventlist')

for (i in eventList) {
  var tr = document.createElement('tr')
  var calEvent = eventList[i]
  var eventTitle = calEvent.title
  var tdTitle = document.createElement('td')
  tdTitle.innerHTML = eventTitle
  var eventStart = calEvent.dateStart
  var eventEnd = calEvent.dateEnd
  var tdTime = document.createElement('td')
  tdTime.innerHTML = eventStart + ' - ' + eventEnd
  var eventSummary = calEvent.description
  var tdSummary = document.createElement('td')
  tdSummary.innerHTML = eventSummary
  var eventLocation = calEvent.location
  var tdLocation = document.createElement('td')
  tdLocation.innerHTML = eventLocation
  var eventGuests = calEvent.attendees
  var tdGuests = document.createElement('td')
  tdGuests.innerHTML = eventGuests
  tr.appendChild(tdTitle)
  tr.appendChild(tdTime)
  tr.appendChild(tdLocation)
  tr.appendChild(tdGuests)
  tr.appendChild(tdSummary)
  tableList.appendChild(tr)
}

// also, please put everything into functions
