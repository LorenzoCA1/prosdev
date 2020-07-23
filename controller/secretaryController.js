const express = require("express");
const router = express.Router();
const moment = require('moment');
const fs = require('fs');
const bodyparser = require("body-parser");
const urlencoder = bodyparser.urlencoded({
    extended : false
});

// router.get("/", (req, res) => {
//     res.render("addappointment.hbs");
// })
// External files imports

const {Appointment} = require("../model/appointment");
const {Doctor} = require("../model/doctor");
const {Process} = require("../model/process");

/* 
    Ty Added :)
*/

router.get("/", async function(req, res) {
    let doctor = await Doctor.getAllDoctors();
    let process = await Process.getAllProcesses();
    res.render('page_templates/secretary_view.hbs', {
        doctor: doctor,
        process: process
    });
});

/*
    Getting templates for filtering 
*/

router.post("/day_all", urlencoder, async function (request, result){
    
    // Get the date from sent data
    let date = request.body.date;

    // Load up the html template
    let all_week = fs.readFileSync('./views/module_templates/secretary_day_all.hbs', 'utf-8');

    // Array for iterating time slots
    let timeSlotsArray = ["8:00 AM", "8:30 AM",
        "9:00 AM", "9:30 AM",
        "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM",
        "1:00 PM", "1:30 PM",
        "12:00 PM", "12:30 PM",
        "1:00 PM", "1:30 PM",
        "2:00 PM", "2:30 PM",
        "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM",
        "5:00 PM", "5:30 PM",
        "6:00 PM"];

    let dataArray = [];
    for (var i = 0; i < timeSlotsArray.length; i++){
        let timeSlot = timeSlotsArray[i];
        // get all appointments in this date and time slot
        let appointmentlist = await Appointment.getAppointmentsByDateandTime(date, timeSlot);
        let appointments = [];
        for (var k = 0; k < appointmentlist.length; k++){
            let appointment = appointmentlist[i];
            //populate necessary info
            appointment = await appointment.populateDoctor();
            appointment = await appointment.populateProcess();
            appointments.push(appointment);
        }

        let data = {
            slot: timeSlot,
            appointments: appointments
        };

        dataArray.push(data);
    }

    let final = {
        data: dataArray
    }

    result.send({
        htmlData: all_week,
        data: final
    });
});


router.post("/check_valid_appointment", urlencoder, async function (request, result){
    // Get the date from sent data
    let date = request.body.date;
    let time = request.body.time;
    let doctors = request.body.doctors;
    console.log(date);
    console.log(time);
    console.log(doctors);

    

    result.send("Something");
});
/*
    End of Templates
*/

/*
    Temporary doctor adding routes for testing purposes, remove when done
*/

router.get("/adddoc", (req, res) => {
    // let doctor = new Doctor({
    //     firstname: "Jiminey",
    //     lastname: "Cricket"
    // });
    // Doctor.addDoctor(doctor, function(doctor){
    //     res.send(doctor);
    // }, (error)=>{
    //     res.send(error);
    // })
})

router.get("/addproc", (req, res) => {
    // let process = new Process({
    //     processname: "Tartar Removal"
    // });
    // Process.addProcess(process, function(process){
    //     res.send(process);
    // }, (error)=>{
    //     res.send(error);
    // })
})

/*
    End of Temp
*/

router.get("/appointmentlist", (req, res) => {
    Appointment.find({}, (err, docs)=>{
        if(err){
            res.send(err)
        }
        else{
            res.render("admin.hbs",{
                appointments: docs
            })
        }
    })
})
//Get available doctors by getting the appointment dates and if 
//wala siyang appointment on the time slot, it will mean available
router.post("/create", (req, res) => {

    console.log(req.body)

    let appointment = new Appointment({
        'lastname': req.body.lastname,
        'firstname': req.body.firstname,
        'date': req.body.dateInput,
        'process': req.body.procedures,
        'time': req.body.timeInput,
        'doctor': req.body.doctors,
        'notes': req.body.note,
    })

    Appointment.addAppointment(appointment, function(appointment){

            res.redirect("/secretary");
        
    }, (error)=>{
        res.send(error);
    })
})

router.get("/edit", (req, res)=>{
    //just find the user given the id
    console.log("GET /edit" + req.query.id)
    Appointment.findOne({
        _id: req.query.id

    }, (err, doc)=>{
        if(err){
            res.send(err)
        }else{
            console.log(doc)
            //send all the details of the user to edit.hbs
            res.render("edit.hbs", {
                appointment: doc
            })
        }
    })
})


router.post("/update", (req, res) => {
    Appointment.update({
        _id: req.body.id
    }, {
        patientname:  req.body.pn,
        patientcontact: req.body.pc,
        process: req.body.pp,
        notes: req.body.note,
        time: req.body.time,
        date: req.body.date,
        doctor: req.body.doc
    }, (err, doc)=>{
       if(err){
           res.send(err)
       }else{
           res.redirect("/")
       }
    })
})

router.post("/delete", (req, res) => {
    Appointment.deleteOne({
        _id: req.body.id
    }, (err, doc)=>{
       if(err){
           res.send(err)
       }else{
           //res.redirect("/users")
           res.send(doc)
       }
    })
})

module.exports = router;