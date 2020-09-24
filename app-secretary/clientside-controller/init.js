//fullcalendar plugin api options
const api_options = {
  initialView: 'timeGridWeek',
  nowIndicator: true,
  headerToolbar: {
      left: 'prev,next today timeGridDay,timeGridWeek',
      center: 'title',
      right: 'appointment'
  },
  navLinks: true, // can click day/week names to navigate views
  editable: true,
  selectable: true,
  selectMirror: false,
  dayMaxEvents: true, // allow "more" link when too many events
  slotMinTime:  '06:00:00',
  slotMaxTime:  '20:00:00',
  height: 520
}

let AJAX_FUNC = {
  
}

const ComponentMap = {
  btnEditApp: $("#save-app"),
  btnAddApp:  $("#add-app"),
  btnDelApp: $("#del-app"),
  txtFirstName: $("#firstname"),
  txtLastName: $("#lastname"),
  selDoctor: $(".fieldDoctors .dropdown"),
  selProcess: $(".fieldProcedures .dropdown"),
  datepicker: $("#date"),
  timepicker: $("#time"),

  txtDoc: $("#docname"),
  txtProc: $("#procname"),

  btnEditDoc: $("#edit-doc"),
  btnAddDoc:  $("#add-doc"),
  btnDelDoc: $("#del-doc"),

  btnEditProc: $("#edit-proc"),
  btnAddProc:  $("#add-proc"),
  btnDelProc: $("#del-proc"),

  frmApp: $('#app-form'),
  frmDoc: $('#doc-form'),
  frmProc: $('#proc-form'),

  txtNotes: $('#notes'),
 
}

let sample_database = {
  appointment: [],
  doctors: [],
  process: []
}

//sample DATA
let sampledata = {
  app:[
    {_id:1,
     firstname: "Luis",
     lastname: "Tan",
     time: '15:00:00',
     date:'2020-07-20',
     doctor: [{ _id: 111, name: 'RANDY' },
              { _id: 123, name: 'HASAN' }],
              
     process: [{ _id: 111, name: 'process1' },
               { _id: 123, name: 'process2' },]
    },

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
    { _id: 111, name: 'process1' },
    { _id: 123, name: 'process2' },
    { _id: 131, name: 'process3' },
    { _id: 121, name: 'process4' },
    { _id: 131, name: 'process5' },
    { _id: 141, name: 'process6' }
  ]
}

