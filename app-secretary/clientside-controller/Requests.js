function approve(data){
    
    $.post("/requestapp", {_id: data.name, status: "approved"})
     .always((res)=>{ console.log('client recieving data'); 
                      console.log(res.responseJSON); 
                      
                      location.reload();
                /*callback(data)*/ })
     .fail((xhr, status,err)=>{ console.log(err); })

    return false;
}

function decline(data){
    $.post("/requestapp", {_id: data.name, status: "cancelled"})
    .always((res)=>{ console.log('client recieving data'); 
               console.log(res.responseJSON); 
               location.reload();
               /*callback(data)*/ })
    .fail((xhr, status,err)=>{ console.log(err); })

    return false;
}