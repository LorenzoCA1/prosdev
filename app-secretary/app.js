
const express = require("express");
const router = express.Router();
const moment = require('moment');


router.get("/", async function(req, res) {
    let doctor = await Doctor.getAllDoctors();
    let process = await Process.getAllProcesses();
    res.render('page_templates/secretary_view.hbs', {
        doctor: doctor,
        process: process
    });
});

module.exports = router;