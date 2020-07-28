const jwt = require("jsonwebtoken");
const config = require("./authConfig.js");
const {Account} = require("../model/account");

module.exports = function(req, res, next) {
	// const token = req.header("token");
	const token = req.session.token;
	
	if(!token) {
		return res.status(401).send({ message: "No token provided." });
	}
	
	try {
		const decoded = jwt.verify(token, config.key);
		req.account = decoded.account;
		next();
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Invalid token" });
	}
};