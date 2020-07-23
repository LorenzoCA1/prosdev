
const express = require("express");
const router = express.Router();
const moment = require('moment');

const {Appointment} = require("../model/appointment");
const {Doctor} = require("../model/doctor");
const {Process} = require("../model/process");

const bad_request = (err, res) => {let x = ''; if(err)for(field in err.errors) x += (err.errors[field].message + '-')
                                     console.log(err); res.status(400).send(x)}
const ok_request = (data, res) => {  res.status(300).send(data) }

const refresh = (req, res) => {
    const doctors =  Doctor.getAll();
    const processes = Process.getAll()
    res.render('main.hbs', {doctor: doctors, process: processes});
}

router.get("/", async function(req, res) {
    let doctors =   await Doctor.getAll();
    let processes = await Process.getAll()
    res.render('main.hbs', {doctor: doctors, process: processes});
});


router.post("/adddoc",(req, res) => {
  Doctor.add(req.body).catch(err =>{bad_request(err, res)})
})

router.post("/deletedoc", (req, res) => {
    console.log(req.body)
    Doctor.delete(req.body).catch(err => bad_request(err, res))
})

router.post("/editdoc", (req, res) => {
    console.log(req.body)
    Doctor.update(req.body).catch(err => bad_request(err, res))
})

router.get("/getprocs", async function(req, res) {
    res.send(Process.getAll())
})
router.post("/addproc",(req, res) => {
  Process.add(req.body)
         .then(result =>  res.redirect('/'))
         .catch(err => bad_request(err, res))
})

router.post("/deleteproc", (req, res) => {
    Process.delete(req.body)
           .then(result =>  res.redirect('/'))
           .catch(err => bad_request(err, res))
})

router.post("/editproc", (req, res) => {
   Process.update(req.body)
          .then(result =>  res.redirect('/'))
          .catch(err => bad_request(err, res))
})

router.post("/addapp", (req, res) => {
    console.log(req.body)
    Process.update(req.body)
           .then(result => ok_request(err,res))
           .catch(err => bad_request(err, res))
 })

 router.post("/editapp", (req, res) => {
    Process.update(req.body)
           .then(result =>  ok_request(err,res))
           .catch(err => bad_request(err, res))
 })
 router.post("/deleteapp", (req, res) => {
    Process.update(req.body)
           .then(result =>  ok_request(err,res))
           .catch(err => bad_request(err, res))
 })

module.exports = router;































    // let doctor = await Doctor.getAllDoctors();
    // let process = await Process.getAllProcesses();