
 $(".dropdown").dropdown()
 
function tryParseJSON (jsonString){
    try { let o = JSON.parse(jsonString);
            if (o && typeof o === "object") 
                return o;
        }catch (e) { }
    return null;
}
function decodeJSON(obj) {
    obj = decodeURI(obj);
    console.log(obj);
    return tryParseJSON(obj);
};


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

$(".form").form(appoinment_field_rules)

function cancel(){
    $.post("/requestapp", {_id: data.name, status: "cancelled"})
    .always((res)=>{ console.log('client recieving data'); 
               console.log(res.responseJSON); 
               window.location.reload(true);
               /*callback(data)*/ })
    .fail((xhr, status,err)=>{ console.log(err); })

    return false;
}

