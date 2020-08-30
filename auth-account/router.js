
const express = require("express");
const router = express.Router();
const moment = require('moment');

const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("./authConfig.js");
const auth = require("./auth.js");

const {Account} = require("../model/account");


const bad_request = (err, res) => {let x = ''; if(err)for(field in err.errors) x += (err.errors[field].message + '-')
                                     console.log(err); res.status(400).send(x)}
const ok_request = (data, res) => { console.log("sending back to client"); console.log(data); res.status(300).send(data) }


/*
router.get("/auth", async function(req, res) {
    
    console.log(req.body);
	res.render('login.hbs');
});
*/

router.get("/patientLogin", async function(req, res) {
	console.log(req.body);
	loginType = "patient";
	res.render('login.hbs', {loginType : loginType});
});

router.get("/secretaryLogin", async function(req, res) {
	console.log(req.body);
	loginType = "secretary";
	res.render('login.hbs', {loginType : loginType});
});

router.get("/adminLogin", async function(req, res) {
	console.log(req.body);
	loginType = "admin";
	res.render('login.hbs', {loginType : loginType});
});

router.get("/registration", async function(req, res) {
	res.render('register.hbs');
});

router.post(
	"/register", 
	[
		check("username", "Please Enter a Valid Username").not().isEmpty(),
        check("password", "Please enter a valid password (At least 6 characters)").isLength({ min: 6 })
	],
	async (req, res) => {
		console.log("Registering...");
		console.log(req.body);
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}
		
		const { username, password, accountType	} = req.body;
		
		try {
			let user = await Account.findOne({username});
			if(user) {
				return res.status(400).send({ message: "Username taken" })
			}
			
			account = new Account({
				username,
				password,
				accountType
			});
			
			const salt = await bcrypt.genSalt(10);
			account.password = await bcrypt.hash(password, salt);
			account.accountType = "patient";
			
			await account.save();
			
			const payload = {
				account: {
					id: account.id
				}
			};
			
			jwt.sign(
				payload,
				config.key, {
					expiresIn: 10000
				},
				(err, token) => {
					if (err) throw err;
					req.session.token = token;
					console.log("Session token: " + req.session.token);
					//res.status(200).json({token});
					res.redirect("/me");
				}
			);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Could not save.");
		}
});

router.post(
	"/login", 
	[
		check("username", "Please enter a valid username").not().isEmpty(),
		check("password", "Please enter a valid password").isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		
		if(!errors.isEmpty()) {
			return res.status(400).send({
				errors: errors.array()
			});
		}
		
		const { username, password, accountType } = req.body;
		
		try {
			let account = await Account.findOne({
				username
			});
			
			if(!account) {
				return res.status(400).send({ message: "Account does not exist." });
			}
			
			const isMatch = await bcrypt.compare(password, account.password);
			if(!isMatch) {
				return res.status(400).send({ message: "Incorrect password." });
			}
			
			if(account.accountType != accountType) {
				return res.status(400).send({ message: "Incorrect Role." });
			}
			
			const payload = {
				account: {
					id: account.id
				}
			};
			
			jwt.sign(
				payload,
				config.key,
				{
					expiresIn: 3600
				},
				(err, token) => {
					if(err) throw err;
					req.session.token = token;
					console.log("Session token: " + req.session.token);
					//res.status(200).json({token});
					res.redirect("/me");
				}
			);
			//console.log("Redirecting...");
		} catch (err) {
			console.error(err);
			res.status(500).send({ message: "Server error." });
		}
});

router.get("/me", loggedIn, async (req, res) => {
	try {
		//console.log("sent token: " + req.header("token"));
		console.log("/me Received token: " + req.session.token);
		const account = await Account.findById(req.account.id);
		if(account.accountType === "secretary") {
			res.redirect("/");
		} else {
			res.json(account);
		}
	} catch(e) {
		res.send({message: "Couldn't fetch user."});
	}
});

// router.get("/patient", isPatient, async (req, res) => {
	
// 	res.send({message: "WELCOME PATIENT"});
// 	/*try {
// 		// console.log("sent token: " + req.header("token"));
// 		console.log("/patient received token: " + req.session.token);
// 		const account = await Account.findById(req.account.id);
// 		console.log("Account found. Checking role...");
// 		if(account.accountType === "patient") {
// 			res.send({message: "Patient verified."});
// 		} else {
// 			res.send({message: "Access denied: Not a patient."});
// 		}
// 	} catch(e) {
// 		res.send({message: "Couldn't fetch user."});
// 	}*/
// });

router.get("/secretary", isSecretary, async (req, res) => {
	res.send({message: "WELCOME SECRETARY"});
	/*
	try {
		// console.log("sent token: " + req.header("token"));
		console.log("/secretary received token: " + req.session.token);
		const account = await Account.findById(req.account.id);
		console.log("Account found. Checking role...");
		if(account.accountType === "secretary") {
			res.send({message: "Secretary verified."});
		} else {
			res.send({message: "Access denied: Not a secretary."});
		}
	} catch(e) {
		res.send({message: "Couldn't fetch user."});
	}*/
});

router.get("/admin", isAdmin, async (req, res) => {
	res.send({message: "WELCOME ADMIN"});
	/*
	try {
		//console.log("sent token: " + req.header("token"));
		console.log("/admin received token: " + req.session.token);
		const account = await Account.findById(req.account.id);
		console.log("Account found. Checking role...");
		if(account.accountType === "admin") {
			res.send({message: "Admin verified."});
		} else {
			res.send({message: "Access denied: Not an admin."});
		}
	} catch(e) {
		res.send({message: "Couldn't fetch user."});
	}*/
});

router.get("/logout", async (req, res) => {
	try {
		req.session.token = null;
		res.redirect("/secretaryLogin");
	} catch(e) {
		res.send({ message: "Couldn't log out." });
	}

});

module.exports = router;