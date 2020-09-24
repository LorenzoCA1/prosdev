
const calendarEl = document.getElementById('timetable');
const timegrid = new TimeGridView(calendarEl, api_options);
ComponentMap.timegrid = timegrid;

// let db = sample_database;
// let data = sampledata;
// data.doc.forEach((e)=>{db.doctors.push(e)})
// data.process.forEach((e)=>{db.process.push(e)})
// data.app.forEach((e)=>{db.appointment.push(e)})

let app = new AppointmentController();
let appform = new AppointmentForm(app)

let doc = new DoctorController();
let docform = new DoctorForm(doc)

let proc = new ProcessController()
let procform = new ProcessForm(proc)

let sec = new SecretaryController()
let secform = new SecretaryForm(sec)

timegrid.setShowAddForm(appform)
timegrid.setShowEditForm(appform)



//tests

// DOC_AJAX.add({ name: 'HOY' })
// DOC_AJAX.add({ name: 'BRANDY' })
// DOC_AJAX.add({ name: 'ANDY' })
// DOC_AJAX.fetch()
//DOC_AJAX.edit( { _id: "5f18e57ae6970e3f248298a8", update: {name: 'RANDY-edit'} })
// DOC_AJAX.add( {})
//DOC_AJAX.delete("5f18e57ae6970e3f248298a8")


//5f18a0e3685544049c8cf18d