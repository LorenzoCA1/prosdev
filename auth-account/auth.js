const jwt = require("jsonwebtoken");
const config = require("/authConfig.js");


module.exports = function(req, res, next) {
	const token = req.header("token");
	
	if(!token) {
		return res.status(401).send({ message: "No token provided." });
	}
	
	try {
		const decoded = jwt.verify(token, config.key);
		req.accountId = decoded.accountId;
		next();
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Invalid token" });
	}
};