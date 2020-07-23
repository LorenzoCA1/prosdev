const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    }
},  { versionKey: false })



doctorSchema.statics.getAll = async function(){
    return await this.find();
}

doctorSchema.statics.getByID = async function(id){
    return await this.findOne({ _id: id });
};

doctorSchema.statics.add = async function(data){
     return await (new Doctor(data)).save()
};

doctorSchema.statics.delete = async function(data){
    return await this.findByIdAndRemove(data._id);
}

doctorSchema.statics.update = async function(data){
    return await this.findOneAndUpdate({_id: data._id}, {$set: data.update}, {new: true}); 
};

const Doctor = mongoose.model("doctor", doctorSchema)

module.exports = {
    Doctor
}