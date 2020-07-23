$.fn.form.settings.rules.uniqueProcedureName = function(param,) {
  let names = ComponentMap.selProcess.children('option')
  .map((i, e)=>{return e.innerText.toLowerCase().trim()}).get(); console.log(names)
  return names.indexOf(ComponentMap.txtProc.val().trim().toLowerCase()) === -1;
}


class ProcessController{

   constructor(){
      this.selection = ComponentMap.selProcess
      this.server = PROC_AJAX
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
        console.log("++++++ADDING PROCESS++++++"); console.log(data);
        this.server.add(data)
    }
    edit(data){
        console.log("++++++EDITING PROCESS++++++"); console.log(data);
        let update = {name: data.name}
        this.server.edit({_id: data._id, update: update})
        // this.update_views()
    }
    delete(data){
        console.log("++++++DELETING PROCESS++++++"); console.log(data);
        this.server.delete(data)
        // this.update_views()
    }
  }





class ProcessForm{
    constructor(controller){
      this.controller = controller
      this.view = ComponentMap.frmProc
      this.textfield = ComponentMap.txtProc
      this.selection= ComponentMap.selProcess
      this.btnDel = ComponentMap.btnDelProc
      this.btnAdd = ComponentMap.btnAddProc
      this.btnEdit = ComponentMap.btnEditProc
     
      this.init()
    }
    isFormValid(){
        return this.view.form('validate form')
    }
    isAddForm(){
        return  !$('.fieldProcedures').is(":visible")
    }
    init(){
        this.add_validation = {
          fields:{
          name: {
            identifier: 'procname',
            rules: [{type: 'uniqueProcedureName', prompt: 'Procedure name exists'}]
          }
        }
        }
        this.edit_validation =  {
          fields:{
            process: {
              identifier: 'process-edit',
              rules: [{type: 'empty'}]
            },
            name: {
              identifier: 'procname',
              rules: [{type: 'uniqueProcedureName', prompt: 'Procedure name exists'}]
            }
          }
        }
        this.delete_validation =  {
          fields:{
            process: {
              identifier: 'process-edit',
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
      return this.isAddForm() ? data: {_id: id, name: data}
    }
      showAddForm(){
        console.log("++++SHOWING ADD FORM+++++");  
        this.clearForm();
        $('.fieldProcedures').hide()
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
        $('.fieldProcedures').show()
        this.btnDel.show()
        this.btnEdit.show()
        this.btnAdd.hide()
        this.view.modal("show")
      }
}