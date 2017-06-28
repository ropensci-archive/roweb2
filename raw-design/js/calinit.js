//replace this with proper public calendar client_id
var CLIENT_ID = '471283734345-eppvml7e6s8kjb4lqoc6ml1jufls8m9j.apps.googleusercontent.com'; 

var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

function checkAuth() {
    gapi.auth.authorize(
    {
        'client_id': CLIENT_ID,
        'scope': SCOPES.join(' '),
        'immediate': true
    }, handleAuthResult);
}


function handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        authorizeDiv.style.display = 'none';
        loadCalendarApi();
    } else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
        authorizeDiv.style.display = 'inline';
        }
    }

/**
* Initiate auth flow in response to user clicking authorize button.
*
* @param {Event} event Button click event.
*/
function handleAuthClick(event) {
    gapi.auth.authorize({
        client_id: CLIENT_ID, 
        scope: SCOPES, 
        immediate: false
    },
    handleAuthResult );
    return false;
}

/**
* Load Google Calendar client library. List upcoming events
* once client library is loaded.
*/
function loadCalendarApi() {
    gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

/**
* Print the summary and start datetime/date of the next ten events in
* the authorized user's calendar. If no events are found an
* appropriate message is printed.
*/
function listUpcomingEvents() {
    var request = gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime',
    });

    request.execute(processItems);
}

function processItems (resp) {
    var events = resp.items;
    var puchi = document.getElementById('eventlist');
    if (events.length === 0) {
        puchi.innerHTML = '<h4>No upcoming events found</h4>';
        return;
    }

    var frag = document.createDocumentFragment();

    for (i = 0; i < events.length; i++) {
        var event = events[i];

        var msg = createTr(event)
        frag.appendChild(msg)
    }
    puchi.appendChild(frag);

}


function createTr(event) {

    var start = event.start.dateTime;
    if (!start) {
        start = event.start.date;
    }

    if ( event.summary == null ) {
        var summary =  'N/A'
    } else {
        var summary = event.summary
    }

    //TODO: Invite self to calendar event to create attendees array and print that :D
    var linkNode = document.createElement('a')
    var htmlLink = event.htmlLink 
    linkNode.href = htmlLink
    var summaryContent = document.createTextNode(summary)
    linkNode.appendChild(summaryContent)

    if (event.description == null  ) {
        var details = 'TBA'
    } else {
        var details = event.description
    }

    var attendees = event.attendees
    var name = '';
    if ( attendees == null ) {
        var name = 'TBA'
    }
    for ( i = 1;  i < attendees.length; i++ ){
        if ( i < attendees.length - 1 ) {
            name = name + attendees[i].displayName + ', '
        } else if( i < attendees.length ) {
            name = name + attendees[i].displayName 
        }
    }

    if (event.location == null  ) {
        var location = 'TBA'
    } else {
        var location = event.location
    }

    var trNode = document.createElement('tr');

    var td = document.createElement('td');
    td.appendChild(linkNode)
    trNode.appendChild(td);

    var tdNodes = [start, location, name, details];

    for (var i in tdNodes) {
        var content = tdNodes[i];
        var tdNode = document.createElement('td');
        tdNode.innerHTML = content;
        trNode.appendChild(tdNode);
    }

    return trNode;
}