const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var appointmentSchema = new Schema({
    firstname: String,
    lastname: String,
    patientcontact: String,
    process: [{
        type: Schema.Types.ObjectId,
        ref: "Process"
    }],
    notes: String,
    time: String,
    date: String,
    doctor: [{
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    }]
})

appointmentSchema.statics.addAppointment = function(appointment, callback){
    appointment.save().then(callback);
};

appointmentSchema.statics.getAll = async function(){
    return await this.find();
}

appointmentSchema.statics.getAppointmentsByID = async function(appointmentID){
    return await this.findOne({
        _id: appointmentID
    });
};

appointmentSchema.statics.getAppointmentsByDateandTime = async function(date, time){
    return await this.find({
        time, time,
        date: date,
    });
};

appointmentSchema.statics.getAppByDoctorandDateandTime = async function(doctorID, date, time){
    return await this.find({
        time, time,
        date: date,
        doctor:{
            "$in": [doctorID]
        }
    });
};

appointmentSchema.statics.getDoctorAppointment = async function(doctorID){
    return await this.find({
        doctor:{
            "$in": [doctorID]
        }        
    });
};

appointmentSchema.statics.delete = async function(appointmentID){
    return await this.deleteOne({
        _id : appointmentID
    });
}

appointmentSchema.methods.updateAppointment = async function(appointmentID, updated){
    return await this.updateOne({
        _id: appointmentID
    }, {
        firstname,
        lastname,
        patientcontact,
        process,
        notes,
        time,
        date,
        doctor
    }, {
        new: true
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