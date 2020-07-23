//change functions with AJAX calls to Server
const APP_AJAX = {  
    add:(data)=>{
        console.log("AJAX"); console.log(data)
        $.post("/addapp", data,(data)=>{ console.log(data); return data._id } )
        .fail((xhr, status,err)=>{ return false })
    },
    edit:(data)=>{
      console.log("AJAX"); console.log(data)
        $.post("/editapp", data).done((data)=>{console.log(data); return data })
                                 .fail((xhr, status,err)=>{ return false })
        return new_data;
    },
    delete:(id)=>{
      data = {_id: id}
      $.post("/deleteappc", data).done((data)=>{ console.log(data); return true })
                                .fail((xhr, status,err)=>{ console.log(xhr); return false })
    },
    fetch:()=>{
        $.get("/getapps").done((data)=>{ console.log(data); return data})
                         .fail((xhr, status,err)=>{ console.log(xhr); return [] })
    }
}


const DOC_AJAX = {
    add:(data)=>{
        $.post("/adddoc", data).fail((xhr, status,err)=>{ return false })
        DOC_AJAX.fetch()
    },
    edit:(data)=>{
        $.post("/editdoc", data).fail((xhr, status,err)=>{ return false })
        DOC_AJAX.fetch()
    },
    delete:(data)=>{
      $.post("/deletedoc", data).fail((xhr, status,err)=>{ console.log(xhr); return false })
      DOC_AJAX.fetch()
    },
    fetch:()=>{
      location.reload()
    }
  }


 //AJAX CALLS to SERVER
const PROC_AJAX = {
  add:(data)=>{
    $.post("/addproc", data).then( data => PROC_AJAX.fetch()).fail((xhr, status,err)=>{ return false })
    PROC_AJAX.fetch()
  },
  edit:(data)=>{
    $.post("/editproc", data).fail((xhr, status,err)=>{ return false })
    PROC_AJAX.fetch()
  },
  delete:(data)=>{
    $.post("/deleteproc", data).fail((xhr, status,err)=>{ console.log(xhr); return false })
    PROC_AJAX.fetch()
  },
    fetch:()=>{
      location.reload()
    }
  }