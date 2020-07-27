const jwt = require("jsonwebtoken");
const config = require("./authConfig");
const {Account} = ("../models/account");

verifyToken = (req, res, next) => {
	let token = req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send({ message: "No token provided!" });
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({ message: "Unauthorized!" });
		}
		req.userId = decoded.id;
		next();
	});
};

isAdmin = (req, res, next) => {
	Account.getAccountById(req.accountId).exec((err, account) {
		if(err) {
			res.status(500).send({message: err});
			return;
		}
		
		if(account.accountType === "admin") {
			next();
			return;
		}
		
		res.status(403).send({ message: "Admin role required" });
		return;
	});	
}

isSecretary = (req, res, next) => {
	Account.getAccountById(req.accountId).exec((err, account) {
		if(err) {
			res.status(500).send({message: err});
			return;
		}
		
		if(account.accountType === "secretary") {
			next();
			return;
		}
		
		res.status(403).send({ message: "Secretary role required" });
		return;
	});
}

isPatient = (req, res, next) => {
	Account.getAccountById(req.accountId).exec((err, account) {
		if(err) {
			res.status(500).send({message: err});
			return;
		}
		
		if(account.accountType === "patient") {
			next();
			return;
		}
		
		res.status(403).send({ message: "Patient role required" });
		return;
	});
}

const authJwt = {
	verifyToken,
	isAdmin,
	isSecretary,
	isPatient
};

module.exports = authJwt;