class AppointmentController {
    constructor(){
      this.server = APP_AJAX;
      this.view = ComponentMap.timegrid;
      this.parser = AppParser
      this.init_views()
    }

    init_views(){
      // let arr_data = this.server.fetch_APPS(); 
      // console.log("++++++FETCHING APPOINTMENTS++++++"); console.log(arr_data);
      // arr_data.forEach((data)=>{this.view.addEvent( this.parser.parseDatabaseObj(data)) })
      this.view.update();
                           
    }
    async add(data){
      console.log("++++++ADDING APPOINTMENT++++++"); console.log(data);
      data.api.id  = await this.server.add(data.db) 
      if(data.api.id){ 
        this.view.addEvent(data.api) 
        this.view.update()
        return true;
      }          
      return false;
    }
    delete(id){
      console.log("++++++DELETING APPOINTMEN++++++"); console.log(id);
      if(this.server.delete(id) == -1) return false;        
      this.view.getEventById(id).remove(); return true;
    }

    edit(data){
      console.log("++++++EDITING APPOINTMEN++++++"); console.log(data);
      if(this.server.edit(data.db) == -1) return false 
      this.view.getEventById(data.api.id).remove();
      this.view.addEvent(data.api);
      this.view.update(); return true;
    }
}

//functions for Parsing View, Database, Form Data
const AppParser = {
  parseDatabaseObj: (data) =>{  //DatabaseObject to FullCalendar API EventObject
    return{                
      id: data._id, 
      title: "Title",
      start: data.date + "T" + moment(data.time, ["h:mm A"]).format("HH:mm"),
      extendedProps:{ firstname: data.firstname, 
                      lastname: data.lastname, 
                      doctor: data.doctor, 
                      process: data.process   },
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
        time: moment(event.start.getHours() + ":" + event.start.getMinutes(), "HH:mm").format("HH:mm"),
        date: moment(event.start.getFullYear() + "-"  + (event.start.getMonth()+1) + "-" + event.start.getDate(), 'YYYY-MM-DD').format('YYYY-MM-DD')
    }
  },
  parseDropDownValue: (data)=>{
      return{
        _id: data.split("-")[0]
      }
  },
  formToJSON: ()=>{     //returns JSON representaion of the Appointment form 
    const jsonData = {doctor: [], process:[], name: '', time: '', date:''}
    let formdata = ComponentMap.frmApp.serializeArray();
    
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
    console.log("+++++++PARSE FORM+++++++"); console.log(data);
    return{
      db:{
         firstname: data.firstname,
        lastname: data.lastname,
         process: data.process,
         doctor: data.doctor,
        time: data.time,
        date: data.date
      },
      api:{
        id: data.id,
        title: "Title",
        start: data.date + "T" + moment(data.time, ["h:mm A"]).format("HH:mm"),
        extendedProps:{
          firstname: data.firstname,
          lastname: data.lastname,
          doctor: data.doctor,
          process: data.process
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
    this.init_forms()
  }
  isAddForm() {
    return $('#app-id').val() == -1
  }
  init_forms(){
    this.view.form(this.field_validation),
    this.view.modal({onApprove: this.submitAddEdit.bind(this), onDeny: this.submitDelete.bind(this)})
  }
  submitAddEdit(){
    if(!this.isFormValid()) 
    return false;
    
    let data = this.cleanFormData();
    console.log("==========" + this.isAddForm())
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
    this.timepicker.val(info.time)
    const process = []; info.process.forEach(e=>{ process.push(e._id+'-' + e.name)})
    const doctor = []; info.doctor.forEach(e=>{ doctor.push(e._id+'-' + e.name)})
    this.selection_process.dropdown('set selected', process)
    this.selection_doctor.dropdown('set selected', doctor)
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
  
}



