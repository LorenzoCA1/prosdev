const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var accountSchema = new Schema({
    usernamename: String,
    password: password, 
    accountType: String
})

accountSchema.statics.addAccount = function(account, callback){
    account.save().then(callback);
};

accountSchema.statics.getAllAcounts = async function(){
    return await this.find();
}

accountSchema.statics.delete = async function(accountID){
    return await this.deleteOne({
        _id : accountID
    });
}

accountSchema.methods.updateDoctor = async function(accountID, updated){
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