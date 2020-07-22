// const express = require("express");
// const router = express.Router();
// const moment = require('moment');
// const fs = require('fs');
// const bodyparser = require("body-parser");
// const urlencoder = bodyparser.urlencoded({
//     extended : false
// });


// const {Appointment} = require("../model/appointment");
// const {Doctor} = require("../model/doctor");
// const {Process} = require("../model/process");


// router.get("/", async function(req, res) {
//     let doctor = await Doctor.getAllDoctors();
//     let process = await Process.getAllProcesses();
//     res.render('page_templates/secretary_view.hbs', {
//         doctor: doctor,
//         process: process
//     });
// });


// router.get("/appointmentlist", (req, res) => {
//     Appointment.find({}, (err, docs)=>{
//         if(err){
//             res.send(err)
//         }
//         else{
//             res.render("admin.hbs",{
//                 appointments: docs
//             })
//         }
//     })
// })
// //Get available doctors by getting the appointment dates and if 
// //wala siyang appointment on the time slot, it will mean available
// router.post("/create", (req, res) => {

//     console.log(req.body)

//     let appointment = new Appointment({
//         'lastname': req.body.lastname,
//         'firstname': req.body.firstname,
//         'date': req.body.dateInput,
//         'process': req.body.procedures,
//         'time': req.body.timeInput,
//         'doctor': req.body.doctors,
//         'notes': req.body.note,
//     })

//     Appointment.addAppointment(appointment, function(appointment){

//             res.redirect("/secretary");
        
//     }, (error)=>{
//         res.send(error);
//     })
// })

// router.get("/edit", (req, res)=>{
//     //just find the user given the id
//     console.log("GET /edit" + req.query.id)
//     Appointment.findOne({
//         _id: req.query.id

//     }, (err, doc)=>{
//         if(err){
//             res.send(err)
//         }else{
//             console.log(doc)
//             //send all the details of the user to edit.hbs
//             res.render("edit.hbs", {
//                 appointment: doc
//             })
//         }
//     })
// })


// router.post("/update", (req, res) => {
//     Appointment.update({
//         _id: req.body.id
//     }, {
//         patientname:  req.body.pn,
//         patientcontact: req.body.pc,
//         process: req.body.pp,
//         notes: req.body.note,
//         time: req.body.time,
//         date: req.body.date,
//         doctor: req.body.doc
//     }, (err, doc)=>{
//        if(err){
//            res.send(err)
//        }else{
//            res.redirect("/")
//        }
//     })
// })

// router.post("/delete", (req, res) => {
//     Appointment.deleteOne({
//         _id: req.body.id
//     }, (err, doc)=>{
//        if(err){
//            res.send(err)
//        }else{
//            //res.redirect("/users")
//            res.send(doc)
//        }
//     })
// })

// module.exports = router;