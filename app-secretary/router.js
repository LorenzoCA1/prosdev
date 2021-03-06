
const express = require("express");
const router = express.Router();
const moment = require('moment');
const auth = require("../auth-account/auth.js");

const {Appointment} = require("../model/appointment");
const {Doctor} = require("../model/doctor");
const {Process} = require("../model/process");

const bad_request = (err, res) => {let x = ''; if(err)for(field in err.errors) x += (err.errors[field].message + '-')
                                     console.log(err); res.status(400).send(x)}
const ok_request = (data, res) => { console.log("sending back to client"); console.log(data); res.status(300).send(data) }

router.get("/secretary", isSecretary, async function(req, res) {
    let doctors =   await Doctor.getAll();
    let processes = await Process.getAll();
    res.render('main.hbs', {doctor: doctors, process: processes});
});

router.post("/adddoc",(req, res) => {
  console.log("adding doc")
  console.log(req.body)
  Doctor.add(req.body).catch(err =>{bad_request(err, res)})
})

router.post("/deletedoc", (req, res) => {
    console.log("deleting doc")
    console.log(req.body)
    Doctor.delete(req.body).catch(err => bad_request(err, res))
})

router.post("/editdoc", (req, res) => {
    console.log("editing doc")
    console.log(req.body)
    Doctor.update(req.body)
          .catch(err => bad_request(err, res))
})

router.get("/getprocs", async function(req, res) {
    res.send(Process.getAll())
})
router.post("/addproc",(req, res) => {
    console.log("adding proc")
    console.log(req.body)
    Process.add(req.body)
           .catch(err => bad_request(err, res))
})

router.post("/deleteproc", (req, res) => {
    console.log("editing proc")
    console.log(req.body)
    Process.delete(req.body)
           .catch(err => bad_request(err, res))
})

router.post("/editproc", (req, res) => {
    console.log("editing proc")
    console.log(req.body)
    Process.update(req.body)
           .catch(err => bad_request(err, res))
})

router.get("/getapps",(req, res) => {
        console.log("======getting all apps====")
        const callback = (data) => { console.log(data); ok_request(data,res)} 
        Appointment.getAll(callback)
})

router.post("/addapp", (req, res) => {
    console.log("adding app")
   
    req.body.status = "approved"
    req.body.time = moment(req.body.time, ["h:mm A"]).format("HH:mm") + ':00'
    req.body.datetime = req.body.date
    console.log(req.body)
    Appointment.add(req.body)
               .then(result =>{
    Appointment.findById(result._id).populate('doctor').populate('process')
               .exec((err, app)=>{ if(!err)ok_request(app, res)} )})
               .catch(err => bad_request(err, res))
 })

 router.post("/editapp", (req, res) => {
    console.log("updating app")
    console.log(req.body)
    Appointment.update(req.body)
               .then(result =>  ok_request(result,res))
               .catch(err => bad_request(err, res))
 })
router.post("/deleteapp", (req, res) => {
    console.log("deleting app")
    console.log(req.body)
    Appointment.delete(req.body)
               .then(result =>  ok_request(result,res))
               .catch(err => bad_request(err, res))
})

router.get("/requestapp", async(req,res)=>{
    let appointments = await Appointment.find({status: "pending"})
    .populate('doctor')
    .populate('process')
    .exec()
    console.log("Get all requests: ", appointments)
    res.render('requests.hbs', {appointment: appointments})
})
router.post("/requestapp", async(req,res)=>{
    console.log(req.body)
    console.log("approving or rejecting requests: ", req.body)
    
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


