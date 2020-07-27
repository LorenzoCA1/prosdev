
const express = require("express");
const router = express.Router();
const moment = require('moment');

//const {Account} = require("../model/account");

router.get("/auth", async function(req, res) {
    res.render('login.hbs');
});


module.exports = router;