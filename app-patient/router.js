
const express = require("express");
const router = express.Router();
const moment = require('moment');

  
const {Appointment} = require("../model/appointment");
const {Doctor} = require("../model/doctor");
const {Process} = require("../model/process");

const bad_request = (err, res) => {let x = ''; if(err)for(field in err.errors) x += (err.errors[field].message + '-')
                                     console.log(err); res.status(400).send(x)}
const ok_request = (data, res) => { console.log("sending back to client"); console.log(data); res.status(300).send(data) }


  router.get("/history",(req, res) => {
    res.render('patient-history.hbs');
  })

  router.get("/request", async(req,res)=>{
    let doctors =   await Doctor.getAll(); let processes = await Process.getAll();
    res.render('patient-request.hbs',  {doctor: doctors, process: processes});
  })

  router.get("/appointments", (req, res) => {
    res.render('patient-appointment.hbs');
      
  })
  
  router.post("/request", (req, res) => {
      
  })
  






module.exports = router;