$.fn.form.settings.rules.uniqueSecretaryName = function(param,) {
  let names = ComponentMap.selSec.children('option')
  .map((i, e)=>{return e.innerText.toLowerCase().trim()}).get(); console.log(names)
  return names.indexOf(ComponentMap.txtSec.val().trim().toLowerCase()) === -1;
}


class SecretaryController{

   constructor(){
      this.selection = ComponentMap.selSec
      this.server = SEC_AJAX
      this.update_views();
   }
    update_views(){
        // let arr_data = this.server.fetch_PROCS()

        // this.selection.html('')
        // arr_data.forEach((data)=>{
        //     let option = `<option value= ${data._id}-${data.name}>${data.name}</option>)`;
        //     this.selection.append(option)
        // })
        this.selection.dropdown()
        
    }
    add(data){
        console.log("++++++ADDING SECRETARY++++++"); console.log(data);
        this.server.add(data);
    }
    edit(data){
        console.log("++++++EDITING SECRETARY++++++"); console.log(data);
        this.server.edit({_id: data._id, update: data.update});
        // this.update_views()
    }
    delete(data){
        console.log("++++++DELETING SECRETARY++++++"); console.log(data);
        this.server.delete(data);
        // this.update_views()
    }
  }





class SecretaryForm{
    constructor(controller){
      this.controller = controller
      this.view = ComponentMap.frmSec
      this.textfield = ComponentMap.txtSec
      this.selection= ComponentMap.selSec
      this.btnDel = ComponentMap.btnDelSec
      this.btnAdd = ComponentMap.btnAddSec
      this.btnEdit = ComponentMap.btnEditSec
     
      this.init()
    }
    isFormValid(){
        return this.view.form('validate form')
    }
    isAddForm(){
        return  !$('.fieldSecretary').is(":visible")
    }
    init(){
        this.add_validation = {
          fields:{
          name: {
            identifier: 'secname',
            rules: [{type: 'uniqueSecretaryName', prompt: 'Secretary name exists'}]
          }
        }
        }
        this.edit_validation =  {
          fields:{
            secretary: {
              identifier: 'secretary-edit',
              rules: [{type: 'empty'}]
            },
            name: {
              identifier: 'secname',
              rules: [{type: 'uniqueSecretaryName', prompt: 'Secretary name exists'}]
            }
          }
        }
        this.delete_validation =  {
          fields:{
            secretary: {
              identifier: 'secretary-edit',
              rules: [{type: 'empty'}]
            }
          }
        }
        this.view.modal({ onApprove: this.submitAddEdit.bind(this), onDeny: this.submitDelete.bind(this) })
    }

    submitAddEdit(){
      if(this.isAddForm()) this.view.form(this.add_validation)
      else this.view.form(this.edit_validation)
      if(this.isFormValid()){
        let data = this.parseForm(); 
        if(this.isAddForm()) this.controller.add(data);
        else this.controller.edit(data); return true; 
      }
      else return false;
     
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
    parseForm(){
      let data = this.textfield.val();// console.log(data)
      let id = String(this.selection.dropdown('get value')).split("-")[0];
      return this.isAddForm() ? {name: data}: {_id: id, update: {name: data}}
    }
      showAddForm(){
        console.log("++++SHOWING ADD FORM+++++");  
        this.clearForm();
        $('.fieldSecretary').hide()
        this.btnDel.hide()
        this.btnEdit.hide()
        this.btnAdd.show()
        this.view.modal("show")
      }
      clearForm(){
        console.log("++++++CLEARING FORM+++++++")
        this.view.form('clear errors')
        this.view.form('fields {}')
      }
      showEditForm(){
        console.log("++++SHOWING EDIT FORM+++++");
        this.clearForm()
        $('.fieldSecretary').show()
        this.btnDel.show()
        this.btnEdit.show()
        this.btnAdd.hide()
        this.view.modal("show")
      }
}