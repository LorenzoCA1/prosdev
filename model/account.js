const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var accountSchema = new Schema({
    username: {
		type: String,
		required: true
	},
    password: {
		type: String,
		required: true
	}, 
    accountType: {
		type: String
	}
});

accountSchema.statics.addAccount = function(account, callback){
    account.save().then(callback);
};

accountSchema.statics.getAccountById = async function(accountID){
    return await this.findById(accountID);
};

accountSchema.statics.getAccountByUsername = async function(name) {
	return await this.findOne({username: name});
};

accountSchema.statics.getAllAccounts = async function(){
    return await this.find();
};

accountSchema.statics.getSecretaries = async function() {
	return await this.find({accountType: "secretary"});
};

accountSchema.statics.getPatients = async function() {
	return await this.find({accountType: "patient"});
};

accountSchema.statics.deleteAccount = async function(accountID){
    return await this.deleteOne({
        _id : accountID
    });
};

accountSchema.methods.updateAccount = async function(accountID, updated){
    return await this.updateOne({
        _id: accountID
    }, {
        username,
        password,
        accountType
    }, {
        new: true
    }); 
};

var Account = mongoose.model("account", accountSchema)

module.exports = {
    Account
}