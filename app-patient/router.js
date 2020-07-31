
const express = require("express");
const router = express.Router();
const moment = require('moment');


router.get("/history",(req, res) => {
    console.log("adding doc")
    console.log(req.body)
    Doctor.add(req.body).catch(err =>{bad_request(err, res)})
  })
  
  router.post("/request", (req, res) => {
      console.log("deleting doc")
      //AppointmentRequest.
  })
  
  router.get("/app", (req, res) => {
      console.log(req.body)
      
  })


module.exports = router;