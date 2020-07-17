
//sample DATA
let sampledata = {
app: [
    {id: 9999,
    title: 'Meeting', 
    start: '2020-07-16T10:30:00',
    end: '2020-07-16T12:30:00',
    extendedProps:{
        firstName:'Phoebe',
        lastName: 'Chen',
        doctor: "Belo",
        process: 'Dental Cleaning'
    }
    },
    {title: 'Lunch', 
     start: '2020-07-16T12:00:00'},
    { id: 99999,
     title: 'Meeting',
     start: '2020-06-12T14:30:00'},
    {title: 'Happy Hour', 
     start: '2020-06-12T17:30:00'},
    {title: 'Dinner', 
     start: '2020-06-12T20:00:00'},
    {title: 'Birthday Party', 
     start: '2020-06-13T07:00:00' },
  ],
  doc:[
    { _id: 111, name: 'RANDY' },
    { _id: 123, name: 'HASAN' },
    { _id: 131, name: 'UIFER' },
    { _id: 121, name: 'NEVFU' },
    { _id: 131, name: 'DEJAM' },
    { _id: 141, name: 'MOGVI' }
  ],
  process:[
     
  ]
}

//api options
const api_options = {
    initialView: 'timeGridWeek',
    nowIndicator: true,
    headerToolbar: {
        left: 'prev,next timeGridDay,timeGridWeek today',
        center: 'title',
        right: 'appointment doctor process'
    },
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    selectable: true,
    selectMirror: false,
    dayMaxEvents: true, // allow "more" link when too many events
    //handlers 
}



//ajax functions to get appointments