class AppointmentController {
    constructor(){
      this.server = APP_AJAX;
      this.view = ComponentMap.timegrid;
      this.parser = AppParser
      this.update_views()
    }

    update_views(){
      const callback = (arr_data)=>{
        if(arr_data)
          arr_data.forEach((data)=>{this.view.addEvent( this.parser.parseDatabaseObj(data)) })
          this.view.update();
      }
      this.server.fetch(callback.bind(this));
    }
    add(data){
      console.log("++++++ADDING APPOINTMENT++++++"); console.log(data);
      const on_success = (data) => {  
        this.view.addEvent(data.api) 
        this.view.update()
      }
      this.server.add(data, on_success.bind(this))
    }
    delete(data){
      console.log("++++++DELETING APPOINTMEN++++++"); console.log(data);
      const on_success = (data) =>{
        this.view.getEventById(data._id).remove();
        this.view.update()
      }

      this.server.delete({_id: data}, on_success.bind(this))
    }

    edit(data){
      console.log("++++++EDITING APPOINTMEN++++++"); console.log(data);
      const on_success = (data)=>{
        this.view.getEventById(data.api.id).remove();
        this.view.addEvent(data.api);
        this.view.update(); 
      }

      data.db = {_id: data.api.id, update: data.db};
      this.server.edit(data, on_success.bind(this))

    }
}

//functions for Parsing View, Database, Form Data
const AppParser = {
  parseDatabaseObj: (data) =>{  //DatabaseObject to FullCalendar API EventObject
    console.log(data.date, data.time)
    return{                
      id: data._id, 
      title: "Title",
      start: data.date + "T" + moment(data.time, "HH:mm:ss").format("h:mm A"),
      extendedProps:{ firstname: data.firstname, 
                      lastname: data.lastname, 
                      doctor: data.doctor, 
                      process: data.process,
                      notes: data.notes  },
    }
  },
  parseAPIObj: (event)=>{ //FullCalendar API EventObject to DatabaseObject
   console.log("Parsing"); console.log(event._def)
    return{
        _id: event._def.publicId,    
        firstname: event._def.extendedProps.firstname,
        lastname: event._def.extendedProps.lastname,
        doctor: event._def.extendedProps.doctor,
        process: event._def.extendedProps.process,
        time: moment(event.start.getHours() + ":" + event.start.getMinutes(), "h:mm A").format("HH:mm"),
        date: event.start.getFullYear() + "-"  + ((event.start.getMonth() + 1) < 10 ? '0' : '') + (event.start.getMonth() + 1) + "-" + event.start.getDate(),
        notes: event._def.extendedProps.notes
    }
  },
  parseDropDownValue: (data)=>{
      return{
        _id: data.split("-")[0],
        name: data.split("-")[1]
      }
  },
  formToJSON: ()=>{     //returns JSON representaion of the Appointment form 
    const jsonData = {doctor: [], process:[], name: '', time: '', date:''}
    let formdata = ComponentMap.frmApp.serializeArray();
    console.log(formdata)
    if($('#app-id').val() != -1)
      jsonData.id = $('#app-id').val()

        formdata.forEach((field)=> { 

            if( field['name'] === 'doctor') 
                  jsonData.doctor.push(AppParser.parseDropDownValue(field['value']))
            
            else if(field['name'] === 'process')
                  jsonData.process.push(AppParser.parseDropDownValue(field['value']))
            
            else  jsonData[field['name']] = field["value"]
            
        }) 

    console.log("+++JSON++"); console.log(jsonData); console.log(formdata);
    return jsonData;
  },
  parseForm: ()=>{ //Form values to FullCalendar API EventObject and DatabaseObject
    let data = AppParser.formToJSON();
    let arr_docID = []; data.doctor.forEach(doc =>arr_docID.push({_id: doc._id}));
    let arr_procID = [];  data.process.forEach(proc =>arr_procID.push({_id: proc._id}));
    console.log("+++++++PARSE FORM+++++++"); console.log(data);

    return{
      db:{
         firstname: data.firstname,
        lastname: data.lastname,
         process: arr_procID,
         doctor: arr_docID,
        time: moment(data.time, "h:mm A").format("HH:mm:ss"),
        date:  moment(data.date, "YYYY-MM-DD").format("YYYY-MM-DD"),
        notes: data.notes
      },
      api:{
        id: data.id,
        title: "Title",
        start: data.date + "T" + moment(data.time, "h:mm A").format("HH:mm"),
        extendedProps:{
          firstname: data.firstname,
          lastname: data.lastname,
          doctor: data.doctor,
          process: data.process,
          notes: data.notes
        }
      }
    }
  },
}

const appoinment_field_rules = {
  fields:{
    firstname: 'empty',
    lastname: 'empty',
    date: 'empty',
    time: 'empty',
    doctor: ['minLength[1]','empty'],
    process: ['minLength[1]','empty'],
  }
}


class AppointmentForm{

  constructor(controller){
    this.view =  ComponentMap.frmApp;
    this.textfieldfn = ComponentMap.txtFirstName;
    this.textfieldln = ComponentMap.txtLastName;
    this.datepicker = ComponentMap.datepicker;
    this.timepicker = ComponentMap.timepicker

    this.selectionfield_doctor = $('.fieldDoctors');
    this.selectionfield_process = $('.fieldProcedures');

    this.selection_doctor = ComponentMap.selDoctor;
    this.selection_process = ComponentMap.selProcess;
    this.field_validation = appoinment_field_rules;


    this.btnDel = ComponentMap.btnDelApp;
    this.btnAdd = ComponentMap.btnAddApp;
    this.btnEdit = ComponentMap.btnEditApp;
   

    this.controller = controller
    this.notes = ComponentMap.txtNotes
    this.init_forms()
  }
  isAddForm() {
    return $('#app-id').val() == -1
  }
  init_forms(){
    this.view.form(appoinment_field_rules)
    this.view.modal({onApprove: this.submitAddEdit.bind(this), onDeny: this.submitDelete.bind(this)})
  }
  submitAddEdit(){
    if(!this.isFormValid()) 
    return false;
    
    let data = this.cleanFormData();
    console.log("==========CLEAN FORM DATA")
    console.log(data)
    console.log( $('#app-id').val() == -1)
    if(data && this.isAddForm()) this.controller.add(data);
    else if(data) this.controller.edit(data);
    return true; 
  }

  submitDelete(){
    this.controller.delete($("#app-id").val())
    return true;
  }
  cleanFormData(){
    console.log("+++++CLEANING FROM DATA++++++"); 
    return AppParser.parseForm()
  }
  isFormValid(){
    console.log("++++++Validating Form+++++++"); console.log(ComponentMap.frmApp.form('validate form'));
    return this.view.form('validate form')
  }
  populateForm(info){
    $('#app-id').val(info._id)
    console.log("+++ POPULATING FORM ++++++"); console.log(info)
    this.textfieldfn.val(info.firstname);
    this.textfieldln.val(info.lastname);
    this.datepicker.val(info.date); 
    this.timepicker.val(moment(info.time, "HH:mm:ss").format("h:mm A"))
    const process = []; info.process.forEach(e=>{ process.push(e._id+'-' + e.name)})
    const doctor = []; info.doctor.forEach(e=>{ doctor.push(e._id+'-' + e.name)})
    this.selection_process.dropdown('set selected', process)
    this.selection_doctor.dropdown('set selected', doctor)
    
    if(info.notes)
    this.notes.val(info.notes);
  }
  clearForm(){
    console.log("++++++CLEARING FORM+++++++"); 
    this.view.form('clear errors')
    this.view.form('fields {}')
    $('#app-id').val(-1); console.log( $('#app-id').val())
  }

  showAddForm (){
    console.log("++++SHOWING ADD FORM+++++"); console.log( $('#app-id').val())
    this.clearForm();
    this.btnDel.hide()
    this.btnEdit.hide()
    this.btnAdd.show()
    this.showForm();
  }

  showEditForm (info){
    const event = info.event; 
    console.log("++++SHOWING EDIT FORM+++++"); console.log(event)
    const appointment = AppParser.parseAPIObj(event); console.log(appointment)
    this.clearForm()
    this.populateForm(appointment)
    this.btnAdd.hide()
    this.btnDel.show()
    this.btnEdit.show()
    this.showForm();
  }
  showForm(){
   // $('.fieldDoctors').modal("show")
   // $('.fieldProcedures').modal("show")
    this.selectionfield_doctor.show()
    this.selectionfield_process.show()
    this.view.modal("show")
  }

  //https://codepen.io/whoisryosuke/pen/bMjLem
  
}



