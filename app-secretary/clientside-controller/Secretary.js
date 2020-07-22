
const calendarEl = document.getElementById('timetable');
const timegrid = new TimeGridView(calendarEl, api_options);
ComponentMap.timegrid = timegrid;

let db = sample_database;
let data = sampledata;
data.doc.forEach((e)=>{db.doctors.push(e)})
data.process.forEach((e)=>{db.process.push(e)})
data.app.forEach((e)=>{db.appointment.push(e)})

let app = new AppointmentController();
let appform = new AppointmentForm(app)

let doc = new DoctorController();
let docform = new DoctorForm(doc)

let proc = new ProcessController()
let procform = new ProcessForm(proc)

timegrid.setShowAddForm(appform)
timegrid.setShowEditForm(appform)