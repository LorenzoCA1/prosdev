

const calendarEl = document.getElementById('timetable');
let timegrid = new TimeGridView(calendarEl, api_options);
Appointment.add(timegrid, sampledata.app[0])
timegrid.update();

Doctor.init_views()