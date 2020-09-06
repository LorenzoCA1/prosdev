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

router.get("/admin", isAdmin, async function(req, res) {

});

router.post("/addsec", (req, res) {
	
});

router.post("/addpatient", (req, res) {
	
});