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
        let arr_data = this.server.fetch_PROCS()

        this.selection.html('')
        arr_data.forEach((data)=>{
            let option = `<option value= ${data._id}-${data.name}>${data.name}</option>)`;
            this.selection.append(option)
        })
        this.selection.dropdown()
        
    }
    add(data){
        console.log("++++++ADDING PROCESS++++++"); console.log(data);
        this.server.add_PROC(data)
        this.update_views()
    }
    edit(data){
        console.log("++++++EDITING PROCESS++++++"); console.log(data);
        this.server.edit_PROC(data)
        this.update_views()
    }
    delete(id){
        console.log("++++++DELETING PROCESS++++++"); console.log(data);
        this.server.delete_PROC(id)
        this.update_views()
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
        this.fieldvalidation =  {
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
        this.view.form(this.fieldvalidation)
        this.view.modal({ onApprove: this.submitAddEdit.bind(this), onDeny: this.submitDelete.bind(this) })
    }

    submitAddEdit(){
      if(this.isFormValid()){
        let data = this.parseForm(); console.log(data)
        if(this.isAddForm()) this.controller.add(data);
        else this.controller.edit(data); return true; 
      }
      else return false;
     
    }
    submitDelete(){
      this.controller.delete(this.parseForm()._id);
      return true;
    }
    parseForm(){
      let data = this.textfield.val(); console.log(data)
      let id = String(this.selection.dropdown('get value')).split("-")[0];
      return this.isAddForm() ? data: {_id: parseInt(is), name: data}
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