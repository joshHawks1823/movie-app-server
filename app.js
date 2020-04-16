require("dotenv").config();
var express = require("express");
var app = express();
//var authTest = require("./controllers/authtestcontroller.js")
// var test = require("./controllers/testcontroller");
var sequelize = require("./db");
var bodyParser = require("body-parser");

var user = require("./controllers/usercontroller");
var profiles =require("./controllers/profilecontroller")
var saved =require("./controllers/savedcontroller")

sequelize.sync();
app.use(bodyParser.json());


//test endpoint--before auth key
// app.get("/api/about-me2", function (req, res){//
//   res.send('hey hey hey hey')
// })
app.use(require('./middleware/header')) 

app.use("/user", user);

app.use(require('./middleware/validate-session'))




//Comment
app.use("/myprofile", profiles)


app.use("/saved", saved)

app.listen(process.env.PORT, function() {
  console.log(`app is listening on ${process.env.PORT} and hello world`);
});