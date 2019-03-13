var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");


router.get("/", function(req, res){
    res.render("landing");
//   res.send("You are on the homepage!!"); 
});
// INDEX show all campgrounds


// Auth routes
router.get("/register", function(req, res){
    res.render("register");
});
//signup logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "You Are Welcome Mr. " + req.user.username + " !");
            res.redirect("/campgrounds");
        });
    });
});
// login
router.get("/login", function(req, res) {
    res.render("login");
});
//handeling login logic
router.post("/login", passport.authenticate("local", {successRedirect: "/campgrounds", failureRedirect: "/login"}), function(req, res){

    
});
//logout
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logout Succesful!");
   res.redirect("/campgrounds");
});

// router.get("/*", function(req, res) {
//     res.render("notfound");
// });

//function define

module.exports = router;