class DoctorController{

  constructor(){
    this.server = DOC_AJAX;
    this.selection = ComponentMap.selDoctor
    this.init_views()
  }

  delete(data){
    console.log("++++++DELETING DOCTOR++++++"); console.log(data);
    this.server.delete(data)
   // this.update_views()
  }

  edit(data){
    console.log("++++++EDITING DOCTOR++++++"); console.log(data);
    this.server.edit({_id: data._id, update: {name: data.name}})
  }

  add(data){
    console.log("++++++Adding DOCTOR++++++"); console.log(data);
    this.server.add(data)
  }

  init_views(){
     this.selection.dropdown();
  }

}



$.fn.form.settings.rules.uniqueDoctorName = function(param) {
  let names = ComponentMap.selDoctor.children('option')
  .map((i, e)=>{return e.innerText.toLowerCase().split(".")[1].trim() }).get(); //console.log(names)
  // console.log(names.indexOf(ComponentMap.txtDoc.val().trim().toLowerCase()) == -1)
  return names.indexOf(ComponentMap.txtDoc.val().trim().toLowerCase()) == -1;
}


class DoctorForm{

  constructor(controller){
      this.view =  ComponentMap.frmDoc;
      this.textfield = ComponentMap.txtDoc;
      this.selection = ComponentMap.selDoctor;
      this.btnDel = ComponentMap.btnDelDoc;
      this.btnAdd = ComponentMap.btnAddDoc;
      this.btnEdit = ComponentMap.btnEditDoc;
      this.selectionfield = $('.fieldDoctors');
      this.controller = controller
      this.init()
  }

  init(){
    this.add_validation = 
    {fields:{
          name: {
            identifier: 'docname',
            rules: [{type: 'uniqueDoctorName', 
                    prompt: 'Doctor name exists'},
                    {type: 'empty', 
                    prompt: 'field cannot be empty'}]
          }
      }}
      
      this.edit_validation = 
      {
        fields:{
            doctor: {
              identifier: 'doctor-edit',
              rules: [{type: 'empty', 
                      prompt: 'field cannot be empty'}]
            },
            name: {
              identifier: 'docname',
              rules: [{type: 'uniqueDoctorName', 
                      prompt: 'Doctor name exists'},
                      {type: 'empty', 
                      prompt: 'field cannot be empty'}]
            },
          }
        }
      
        this.delete_validation = 
        {
          fields:{
              doctor: {
                identifier: 'doctor-edit',
                rules: [{type: 'empty', 
                        prompt: 'field cannot be empty'}]
              }
            }
          }
  
    this.view.modal({onApprove: this.submitAddEdit.bind(this), onDeny: this.submitDelete.bind(this)})
  }

  submitAddEdit(){
    if(this.isAddForm()) this.view.form(this.add_validation)
    else this.view.form(this.edit_validation)
    console.log(this.isFormValid())
    if(this.isFormValid()){
      let data = this.parseForm(); console.log(data);
      if(this.isAddForm()) this.controller.add(data);
      else this.controller.edit(data); 
      return true;
    }
    return false;
  }

  submitDelete(){
    this.view.form(this.delete_validation)
    let data = this.parseForm()
    if(this.isFormValid()){
      this.controller.delete({_id: data._id});
      return true;
    }
    else return false;
  }

  isFormValid(){
    return this.view.form('validate form');
  }

  isAddForm(){
    return  !$('.fieldDoctors').is(":visible");
  }

  parseForm(){
    let data = this.textfield.val().trim().toUpperCase()
    let id = String(this.selection.dropdown('get value')).split("-")[0];
    return this.isAddForm() ? {name: data}: {_id: id, name: data}
  }

  clearForm(){
    console.log("++++++CLEARING FORM+++++++")
    this.view.form('clear errors')
    this.view.form('fields {}')
  }

  showAddForm(){
    console.log("++++SHOWING ADD FORM+++++");  
    this.clearForm();
    this.selectionfield.hide()
    this.btnDel.hide(); 
    this.btnEdit.hide()
    this.btnAdd.show()
    this.view.modal("show")
  }

  showEditForm(){
    console.log("++++SHOWING EDIT FORM+++++");
    this.clearForm();
    this.selectionfield.show()
    this.btnDel.show(); 
    this.btnEdit.show()
    this.btnAdd.hide()
    this.view.modal('show')
  }
}

