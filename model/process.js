const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var processSchema = new Schema({
    name:{type: String,
    required: [true, 'Name is required'],
    unique: true}
})

processSchema.statics.getAll = async function(){
    return await this.find();
}

processSchema.statics.getByID = async function(id){
    return await this.findOne({ _id: id });
};

processSchema.statics.add = async function(data){
     return await (new Process(data)).save()
};

processSchema.statics.delete = async function(data){
    return await this.findByIdAndRemove(data._id);
}

processSchema.methods.update = async function(data){
    return await this.findOneAndUpdate({_id: data._id}, {$set: data.update}, {new: true}); 
};

const Process = mongoose.model('process', processSchema)

module.exports = {
    Process
}