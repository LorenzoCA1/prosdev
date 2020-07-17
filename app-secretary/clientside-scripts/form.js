// const appoint_form = $('.app-form')
// const doctor_form = $('doctor')
// const process_form = $('process')
const AJAX_FUNC = {
  //ADD
  add_DOC: (data)=>{

  },
  add_APP:(data)=>{

  },
  add_PROC:(data)=>{
    
  },
  //EDIT
  edit_APP:(data)=>{

  },
  edit_DOC:(data)=>{

  },
  edit_PROC:(data)=>{

  },
  //DELETE
  delete_DOC:(data)=>{

  },
  fetch_DOCS:()=>{
      return sampledata.doc;
  },
  fetch_APPS:()=>{
      return sampledata.app;
  }
}

//VIEW RELATED FUNCTIONS
const Appointment = {
  showEditForm: (info)=>{
    event = info.event
    console.log(info.event)
    $('#app-id').val(event._def.publicId)
    $("#firstName").val(event._def.extendedProps.firstName);
    $("#lastName").val((event._def.extendedProps.lastName));
    $('#process').val(event._def.extendedProps.process);
    $('#doctor').val(event._def.title);
    $('.app-form').modal("show")
  },
  showAddForm: ()=>{ $('.app-form').modal("show") },
  add: (timetable, event)=>{
    //adds in view
    event.extendedProps; //from event object
    timetable.addEvent(event)
    timetable.update()
    //sends to server

  },
  delete: (timetable, event)=>{
    console.log(event)
    timetable.getEventById(id).remove();
    timetable.update();
  },
  edit(event){
    console.log(event)
  },
  init_views: () =>{
    let apps = AJAX_FUNC.fetch_APPS()
  },
  init_buttons: () => {
    $("#save-app").click((e)=>{
        
    })
  }
}

const Doctor = {
  showForm: ()=>{
  },
  delete: ()=>{

  },
  edit: ()=>{

  },
  add: ()=>{

  },
  init_views: ()=>{
      let docs = AJAX_FUNC.fetch_DOCS()
      docs.forEach((doc)=>{
      $("#fieldDoctors .dropdown")
      .append(`<option value= ${doc._id}>Dr. ${doc.name}</option>)`) })
      $("#fieldDoctors .dropdown").dropdown();
  }
}
