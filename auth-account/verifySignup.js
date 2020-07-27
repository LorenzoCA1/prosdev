const {Account} = require("../model/account")

checkUsername = (req, res, next) => {
	Account.findOne({
		username: req.body.username
	}).exec((err, user) => {
		if(err) {
			res.status(500).send({message: err});
			return;
		}
	}
	
	if(user) {
		res.status(400).send({message: "Username is taken."});
		return;
	}
	
	next();
};

const verifySignup = {
	checkUsername
}

module.exports = verifySignup;