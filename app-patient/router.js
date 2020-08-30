
const express = require("express");
const router = express.Router();
const moment = require('moment');
const hbs = require('hbs');


hbs.registerHelper('ifeq', function (v1,v2,options) {  if(v1 === v2) {
  return options.fn(this);
}
return options.inverse(this); });
  
const {Appointment} = require("../model/appointment");
const {Doctor} = require("../model/doctor");
const {Process} = require("../model/process");

const bad_request = (err, res) => {let x = ''; if(err)for(field in err.errors) x += (err.errors[field].message + '-')
                                     console.log(err); res.status(400).send(x)}
const ok_request = (data, res) => { console.log("sending back to client"); console.log(data); res.status(300).send(data) }

router.get("/", isPatient, async function(req, res) {
    let doctors =   await Doctor.getAll();
    let processes = await Process.getAll();
    res.redirect("/appointments");
});

  router.get("/history",(req, res) => {
    res.render('patient-history.hbs');
  })

  router.get("/request", async(req,res)=>{
    let doctors =   await Doctor.getAll(); let processes = await Process.getAll();
    res.render('patient-request.hbs',  {doctor: doctors, process: processes});
  })

  router.get("/appointments", isPatient, async(req, res) => {
    let appointments = await Appointment.find({patient: "1"})
          .populate('doctor')
          .populate('process')
          .exec()
          res.render('patient-appointment.hbs', {appointment: appointments})
 
  })
  
  router.post("/request", (req, res) => {
      console.log(req.body)
      req.body.patient = "1"
      req.body.status = "pending"
      Appointment.add(req.body)
      .then(result =>{
      Appointment.findById(result._id).populate('doctor').populate('process')
      .exec((err, app)=>{ if(!err) res.redirect("/request")} )
    
    })
      .catch(err => bad_request(err, res))
  })
  






module.exports = router;