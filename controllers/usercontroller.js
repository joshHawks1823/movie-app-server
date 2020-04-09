var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var User = sequelize.import("../models/user");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

router.post("/createuser", function(req, res) {
  //   var userName = "fake@fake.com";
  //   var password = "ThisIsAPassword";

  var userName = req.body.user.username;
  var password = req.body.user.password;
  var newEmail= req.body.user.newEmail;
  var userType = 1;

  User.create({
    username: userName,
    passwordhash: bcrypt.hashSync(password, 10),
    newEmail: newEmail,
    userType: userType
  }).then(
    function createSuccess(user) {
      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });
      res.json({
        user: user,
        message: "created",
        sessionToken: token
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
    
  );
});

// SIGNING IN A USER
router.post("/signin", function(req,res){
    let username = req.body.user.username
    let password = req.body.user.password

    User.findOne({
        where:{username: username }
    }).then(user => {


        user ? comparePasswords(user) :res.send("User not found in our database")

        function comparePasswords(user){
            bcrypt.compare(password, user.passwordhash, function (err, matches){
                matches ? generateToken(user) : res.json({error: "Incorrect Password"})
            })
        }

        function generateToken(user){

            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 240
              });
              res.json({
                user: user,
                message: "signed in",
                sessionToken: token
              });

        }
        
    })

})

router.get('/adminportal', function(req,res) {

  User.findAll({}
  ).then(users => {

      res.send(users)
  })
})

router.delete("/delete/:user", function(req, res) {
  // var user = req.body.user.username

  var user = req.params.user;

  // var matchOwner = req.user.id;

  User.destroy({
      where: { username: user }
    })
    .then(data => {
      return data > 0 ? res.json(data) : res.send("Nothing deleted");
    }),
    err => res.send(500, err.message);
});

module.exports = router;