class DoctorController{

  constructor(){
    this.server = DOC_AJAX;
    this.selection = ComponentMap.selDoctor
    this.update_views()
  }

  delete(id){
    this.server.delete(id)
    this.update_views()
  }

  edit(data){
    console.log("++++++EDITING DOCTOR++++++"); console.log(data);
    this.server.edit_DOC(data)
    this.update_views()
  }

  add(data){
    this.server.add_DOC(data)
    this.update_views()
  }

  update_views(){
      let arr_data = this.server.fetch_DOCS()
      this.selection.html('')
      arr_data.forEach( (data)=>{ 
         const option = `<option value= ${data._id}-${data.name}>Dr. ${data.name}</option>)`
         this.selection.append(option)
     })
     this.selection.dropdown();
  }

}



$.fn.form.settings.rules.uniqueDoctorName = function(param) {
  let names = ComponentMap.selDoctor.children('option')
  .map((i, e)=>{return e.innerText.toLowerCase().split(".")[1].trim() }).get(); console.log(names)
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
    this.field_validation = 
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
    this.view.form(this.field_validation)
    this.view.modal({onApprove: this.submitAddEdit.bind(this), onDeny: this.submitDelete.bind(this)})
  }

  submitAddEdit(){
    if(this.isFormValid()){
      let data = this.parseForm()
      if(this.isAddForm()) this.controller.add(data);
      else this.controller.edit(data); 
      return true;
    }
    return false;
  }

  submitDelete(){
    this.controller.delete(parseInt(String(this.selection.dropdown('get value'))));
    return false;
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
    return this.isAddForm() ? data: {_id: parseInt(id), name: data}
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

