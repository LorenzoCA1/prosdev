const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var appointmentSchema = new Schema({
    firstname: String,
    lastname: String,
    process: [{type: Schema.Types.ObjectId,ref: "Process"}],
    notes: String,
    time: String,
    date: String,
    doctor: [{type: Schema.Types.ObjectId,ref: "Doctor"}]
})

appointmentSchema.statics.getAll = async function(){
    return await this.find();
}

appointmentSchema.statics.getByID = async function(id){
    return await this.findOne({ _id: id });
};

appointmentSchema.statics.add = async function(data){
     return await (new Appointment(data)).save()
};

appointmentSchema.statics.delete = async function(id){
    return await this.deleteOne({ _id : id });
}


appointmentSchema.statics.update = async function(data){
    return await this.findByIdandUpdate(data.id, {$set: data.update}, {new: true}); 
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