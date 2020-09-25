const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const {Doctor} = require("./doctor");
const {Process} = require("./process");
const {Account} = require("./account");


var appointmentSchema = new Schema({
    firstname: String,
    lastname: String,
    process: [{type: Schema.Types.ObjectId,ref:Process}],
    notes: String,
    time: String,
    date: String,
    datetime: Date,
    doctor: [{type: Schema.Types.ObjectId,ref: Doctor}],
    patient: {type: Schema.Types.ObjectId, ref: Account},
    status: String,  //approved, cancelled, pending
    notes: String,

})

appointmentSchema.statics.getAll = async function(callback){
    return await this.find({status: "approved"})
    .populate('doctor').populate('process')
    .exec((err, data)=>{callback(data) })
}
appointmentSchema.statics.get = function(data){
    return this.findById(data._id).populate('doctor').populate('process')
};

appointmentSchema.statics.getByID = function(id){
    return this.findOne({ _id: id });
};


appointmentSchema.statics.add = async function(data){
     return await (new Appointment(data)).save()
};

appointmentSchema.statics.delete = async function(data){
   return await this.findByIdAndRemove(data._id);
}


appointmentSchema.statics.update = async function(data){
    return await this.findOneAndUpdate({_id: data._id}, {$set: data.update}, {new: true}); 
};


appointmentSchema.statics.getAppointmentsByID = async function(appointmentID){
    return await this.findOne({
        _id: appointmentID
    });
};

appointmentSchema.statics.getDoctorAppointment = async function(doctorID){
    return await this.find({
        doctor:{
            "$in": [doctorID]
        }        
    });
};


appointmentSchema.methods.populateDoctor = async function(){
    return await Appointment.findOne({
        _id: this._id
    }).populate("doctor");
};

appointmentSchema.methods.populateProcess = async function(){
    return await Appointment.findOne({
        _id: this._id
    }).populate("process");
};

var Appointment = mongoose.model("appointment",appointmentSchema)

module.exports = {
    Appointment
}