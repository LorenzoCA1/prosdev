//change functions with AJAX calls to Server
const APP_AJAX = {  
    add_APP:(data)=>{
        data._id = sample_database.appointment.length + 1;
        sample_database.appointment.push(data) //console.log(db);// console.log(data)
        return data._id;
    },
    edit_APP:(data)=>{
        let db = sample_database.appointment
        index = db.findIndex(el => el._id == data._id)
        db[index] = data; console.log(data)
        return data;
    },
    delete_APP:(id)=>{
      let db = sample_database.appointment
      let index = db.findIndex(element => element._id == id)
      db.splice(index, 1)
      return index != -1 
    },
    fetch_APPS:()=>{
        return sample_database.appointment;
    }
}

const DOC_AJAX = {
    add_DOC:(data)=>{
        let id = sample_database.doctors.length + 1;
        sample_database.doctors.push({_id: id, name: data}); console.log(db);// console.log(data)
        return id;
    },
    edit_DOC:(data)=>{
        let db = sample_database.doctors
        index = db.findIndex(el => el._id == data._id)
        db[index] = data; console.log(db)
        return data;
    },
    delete_DOC:(id)=>{
      let db = sample_database.doctors
      let index = db.findIndex(element => element._id == id)
      db.splice(index, 1)
      return index != -1
    },
    fetch_DOCS:()=>{
        return sample_database.doctors;
    }
  }



 //AJAX CALLS to SERVER
const PROC_AJAX = {
    //ADD
    add_PROC:(data)=>{
      let id = sample_database.process.length + 1;
      sample_database.process.push({_id: id, name: data})
    },
    //EDIT
    edit_PROC:(data)=>{
        let db = sample_database.process
        index = db.findIndex(el => el._id == data._id)
        db[index] = data
        return data;
    },
    //DELETE
    delete_PROC:(id)=>{
      let db = sample_database.process
      let index = db.findIndex(element => element._id == id)
      db.splice(index, 1)
    },
    fetch_PROCS:()=>{
        return sample_database.process;
    }
  }