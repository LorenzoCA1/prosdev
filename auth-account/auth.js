const jwt = require("jsonwebtoken");
const config = require("./authConfig.js");
const {Account} = require("../model/account");

loggedIn = async (req, res, next) => {
	const token = req.session.token;
	
	if(!token) {
		// return res.status(401).send({ message: "No token provided." });
		res.redirect("/");
	}
	
	try {
		const decoded = jwt.verify(token, config.key);
		req.account = decoded.account;
		next();
	} catch (err) {
		console.error(err);
		// res.status(500).send({ message: "Invalid token" });
		res.redirect("/");
	}
}

isPatient = async (req, res, next) => {
	const token = req.session.token;
	
	if(!token) {
		// return res.status(401).send({ message: "No token provided." });
		res.redirect("/patientLogin");
	}
	
	try {
		const decoded = jwt.verify(token, config.key);
		req.account = decoded.account;
		const account = await Account.findById(decoded.account.id);
		if(account.accountType === "patient") {
			console.log("Patient verified.");
		} else {
			console.log("Access denied: Not a patient.")
			res.redirect("/patientLogin");
		}
		next();
	} catch (err) {
		console.error(err);
		// res.status(500).send({ message: "Invalid token" });
		res.redirect("/patientLogin");
	}
}

isSecretary = async (req, res, next) => {
	const token = req.session.token;
	
	if(!token) {
		// return res.status(401).send({ message: "No token provided." });
		res.redirect("/secretaryLogin");
	}
	
	try {
		const decoded = jwt.verify(token, config.key);
		req.account = decoded.account;
		const account = await Account.findById(decoded.account.id);
		if(account.accountType === "secretary") {
			console.log("Secretary verified.");
		} else {
			console.log("Access denied: Not a secretary.")
			res.redirect("/secretaryLogin");
		}
		next();
	} catch (err) {
		console.error(err);
		// res.status(500).send({ message: "Invalid token" });
		res.redirect("/secretaryLogin");
	}
}

isAdmin = async (req, res, next) => {
	const token = req.session.token;
	
	if(!token) {
		// return res.status(401).send({ message: "No token provided." });
		res.redirect("/adminLogin");
	}
	
	try {
		const decoded = jwt.verify(token, config.key);
		req.account = decoded.account;
		const account = await Account.findById(decoded.account.id);
		if(account.accountType === "admin") {
			console.log("Admin verified.");
		} else {
			console.log("Access denied: Not an admin.")
			res.redirect("/adminLogin");
		}
		next();
	} catch (err) {
		console.error(err);
		// res.status(500).send({ message: "Invalid token" });
		res.redirect("/adminLogin");
	}
}

const auth = {
	loggedIn,
	isPatient,
	isSecretary,
	isAdmin
}

/*
module.exports = function(req, res, next) {
	// const token = req.header("token");
	
};
*/