const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const urlencoder = bodyParser.urlencoded({
    extended: true,
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

//SET GLOBAL STATIC FILES DIRECTORY
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/app-secretary/clientside-controller')));

//SET TEMPLATE ENGINE
app.set('view engine', 'hbs');

//SET VIEWS DIRECTORIES

app.use(function (req, res, next) {
    if (req.path === '/') 
        app.set('views',[path.join(__dirname, '/app-secretary/views'),path.join(__dirname, '/app-patient/views') ])
    else if(req.path === '/secretaryLogin')
        app.set('views',[path.join(__dirname, '/app-secretary/views')])
    else if(req.path === '/auth')
        app.set('views', path.join(__dirname,'/auth-account/views'));
    next()
})


//SET APP/ROUTER DIRECTORIES
app.use(require("./app-secretary/router"),
        require("./app-patient/router"),
        require("./auth-account/router")
        //app.use(require("./app-superadmin"));
       );

//docs on routers https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
//docs on regex route parameters https://stackoverflow.com/questions/51144781/route-parameters-in-express-js


app.listen(3000, function(){
    console.log("Server is running at port 3000...");
})

