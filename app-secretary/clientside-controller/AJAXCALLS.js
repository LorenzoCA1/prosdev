//change functions with AJAX calls to Server
const APP_AJAX = {  
    add:(data,callback)=>{
      console.log("AJAX"); console.log(data)
      $.post("/addapp",  data.db).always((res)=>{console.log('client recieving data');
                                              data.api.id = res.responseJSON._id
                                callback(data)})
                               .fail((xhr, status,err)=>{ console.log(err);})

    },
    edit:(data, callback)=>{
       console.log("AJAX"); console.log(data)
        $.post("/editapp", data.db).always((res)=>{ console.log('client recieving data'); 
                                                    console.log(res.responseJSON); 
                                    callback(data) })
                                   .fail((xhr, status,err)=>{ console.log(err); })
    },
    delete:(data,callback)=>{
      console.log("AJAX"); console.log(data)
      $.post("/deleteapp", data).always((res)=>{ console.log('client recieving data'); 

                                                  console.log(res.responseJSON); 
                              
                                 callback(data) })
                                .fail((xhr, status,err)=>{ console.log(err); })
    },
    fetch:(callback)=>{
        $.get("/getapps").always((res)=>{console.log('client recieving data');
                                         console.log(res.responseJSON);

                                         let data = res.responseJSON;
                          if(Object.keys(res.responseJSON).length != 0 )
                          callback(data)})
                         .fail((xhr, status,err)=>{ console.log(xhr);})
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
    $.post("/editproc", data).fail((xhr, status,err)=>{console.log(xhr)})
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