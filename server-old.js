const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const urlencoder = bodyParser.urlencoded({
    extended: false,
    useUnifiedTopology: true,
}) 

const session = require("express-session");
const path = require("path");
var app = new express();

mongoose.Promise = global.Promise

const MONGOLAB_URI = "mongodb://dbUser:dbUserPassword@cluster0-shard-00-00-sjlw8.mongodb.net:27017,cluster0-shard-00-01-sjlw8.mongodb.net:27017,cluster0-shard-00-02-sjlw8.mongodb.net:27017/Test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(MONGOLAB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch(err => console.log(err))

app.use(urlencoder);
app.use(session({
    resave: true,
    name: "appointment-system",
    saveUninitialized: true, 
    secret: "secretpass"
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app-secretary/clientside-controller')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, '/app-secretary/views'));

app.use(require("./app-secretary/serverside-router"));

app.listen(3000, function(){
    console.log("Server is running at port 3000...");
})

