
const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const moment = require('moment');

const config = require("./authConfig.js");
const auth = require("./auth.js");
const {Account} = require("../model/account");


router.post("/auth", async function(req, res) {
    
    console.log(req.body)
  //  res.render('login.hbs');
});

router.post(
	"/register", 
	[
		check("username", "Please Enter a Valid Username").not().isEmpty(),
        check("password", "Please enter a valid password (At least 6 characters)").isLength({ min: 6 }),
		check("accountType", "Please enter a valid account type").not().isEmpty()
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
		
		const {
			username,
			password,
			accountType
		} = req.body;
		
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
			account.accountType = accountType;
			
			await account.save();
			
			const payload = {
				user: {
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
					res.status(200).json({token});
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
		
		const { username, password } = req.body;
		
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
					res.status(200).json({token});
				}
			);
		} catch (err) {
			console.error(err);
			res.status(500).send({ message: "Server error." });
		}
});

router.get("/me", auth, async (req, res) => {
	try {
		console.log("sent token: " + req.header("token"));
		console.log("")
		const account = await Account.findById(req.account.id);
		res.json(account);
	} catch(e) {
		res.send({message: "Couldn't fetch user."});
	}
});

router.get("/admin", async (req, res) => {


});

router.get("/logout", async (req, res) => {


});

module.exports = router;