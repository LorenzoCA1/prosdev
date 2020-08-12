var mongoose = require('mongoose')
const MONGOLAB_URI = "mongodb://dbUser:dbUserPassword@cluster0-shard-00-00-sjlw8.mongodb.net:27017,cluster0-shard-00-01-sjlw8.mongodb.net:27017,cluster0-shard-00-02-sjlw8.mongodb.net:27017/Test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(MONGOLAB_URI);

const {Doctor} = require("../doctor");
const {Process} = require("../process");

describe("DOCTOR MODEL TEST", ()=>{

    beforeAll(async ()=>{
        await Doctor.deleteOne({name:"TEST"})
    });

    afterAll(async ()=>{
        await Doctor.deleteOne({name:"UPDATED TEST"})
    });

    test("Adds Doctor", async ()=>{
        const doctor = new Doctor({name:'TEST'});
        const savedDoctor = await doctor.save();
        const expected = "TEST";
        const actual = savedDoctor.name;
        expect(actual).toEqual(expected);
    });

    test("Gets Doctor", async()=>{
        const foundDoctor = await Doctor.findOne({name:"TEST"})
        const expected  = "TEST";
        const actual = foundDoctor.name;
        expect(actual).toEqual(expected);
    });

    test("Update Doctor", async()=>{
        const foundDoctor = await Doctor.findOne({name: "TEST"});
        foundDoctor.name = "UPDATED TEST"
        const updatedDoctor = await foundDoctor.save();
        const expected = "UPDATED TEST";
        const actual = updatedDoctor.name;
        expect(actual).toEqual(expected);
    });
});

describe("PROCESS MODEL TEST", ()=>{

    beforeAll(async ()=>{
        await Process.deleteOne({name:"TEST PROCESS"})
    });

    afterAll(async ()=>{
        await Process.deleteOne({name:"UPDATED TEST PROCESS"})
    });

    test("Adds Process", async ()=>{
        const process = new Process({name:'TEST PROCESS'});
        const savedprocess = await process.save();
        const expected = "TEST PROCESS";
        const actual = savedprocess.name;
        expect(actual).toEqual(expected);
    });

    test("Gets Process", async()=>{
        const foundProcess = await Process.findOne({name:"TEST PROCESS"})
        const expected  = "TEST PROCESS";
        const actual = foundProcess.name;
        expect(actual).toEqual(expected);
    });

    test("Update Process", async()=>{
        const foundProcess = await Process.findOne({name: "TEST PROCESS"});
        foundProcess.name = "UPDATED TEST PROCESS"
        const updatedProcess = await foundProcess.save();
        const expected = "UPDATED TEST PROCESS";
        const actual = updatedProcess.name;
        expect(actual).toEqual(expected);
    });
});



