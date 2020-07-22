
const express = require("express");
const router = express.Router();
const moment = require('moment');

const {Appointment} = require("../model/appointment");
const {Doctor} = require("../model/doctor");
const {Process} = require("../model/process");

router.get("/", async function(req, res) {
    let doctor = await Doctor.getAllDoctors();
    let process = await Process.getAllProcesses();
    res.render('main.hbs');
});



module.exports = router;