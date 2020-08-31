
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

  router.get("/history", isPatient, (req, res) => {
    res.render('patient-history.hbs');
  })

  router.get("/request", isPatient, loggedIn, async(req,res)=>{
    let doctors =   await Doctor.getAll(); let processes = await Process.getAll();
	accountId = req.account.id;
	console.log("Account ID: " + accountId);
    res.render('patient-request.hbs',  {doctor: doctors, process: processes});
  })

  router.get("/appointments", isPatient, async(req, res) => {
    let appointments = await Appointment.find({patient: req.account.id})
          .populate('doctor')
          .populate('process')
          .exec()
    console.log(appointments)
    res.render('patient-appointment.hbs', {appointment: appointments})
 
  })
  
  router.post("/request", isPatient, (req, res) => {
      console.log(req.body)
      req.body.patient = 	req.account.id;
      req.body.status = "pending"

      Appointment.add(req.body)
      .then(result =>{
      Appointment.findById(result._id).populate('doctor').populate('process')
      .exec((err, app)=>{ if(!err) res.redirect("/request")} )
    
    })
      .catch(err => bad_request(err, res))
  })
  
  router.post("/cancelapp", async(req,res)=>{
    console.log(req.body)
    Appointment.findOneAndUpdate(
        { _id: req.body._id },
        { $set: { status: req.body.status} }, 
        { new: true }, 
         function(err, result) {
               if (err) bad_request(err,res);
               else ok_request(result, res)
        }
    );
})






module.exports = router;