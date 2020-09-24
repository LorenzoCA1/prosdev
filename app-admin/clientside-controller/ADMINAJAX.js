//change functions with AJAX calls to Server
  
const SEC_AJAX = {
  add:(data)=>{
    $.post("/addsec", data).then( data => SEC_AJAX.fetch()).fail((xhr, status,err)=>{ return false })
    SEC_AJAX.fetch()
  },
  edit:(data)=>{
    $.post("/editsec", data).fail((xhr, status,err)=>{console.log(xhr)})
    SEC_AJAX.fetch()
  },
  delete:(data)=>{
    $.post("/deletesec", data).fail((xhr, status,err)=>{ console.log(xhr); return false })
    SEC_AJAX.fetch()
  },
    fetch:()=>{
      location.reload()
    }
  }