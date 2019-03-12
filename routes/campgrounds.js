var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");


router.get("/", function(req, res){
    console.log(req.user);
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
         res.render("campgrounds/index", {campgrounds:allCampgrounds});  
       }
    });
});
// Create new campground
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price:price, image: image, description: desc, author: author};
    // campgrounds.push(newCampground);
    //create a new campground and save to db

    Campground.create(newCampground, function(err, newlyCreated){
        if(err){ 
             console.log(err);
        }else{
            req.flash("success", "Seccessfully Created Campground!");
          res.redirect("/campgrounds");
         }
});
    
   //get datat from form and add to camp grounds array 
   // redirect to campground page
});
// SHOW FORM to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});


//  show more info about campground

router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground not found!");
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//edit the campgrounds
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
          Campground.findById(req.params.id, function(err, foundCampground) {
            res.render("campgrounds/edit", {campground: foundCampground});
        });
});


//update campground routes
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findOneAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){ console.log(err);
        res.redirect("/campgrounds");
       } else {
           req.flash("success", "Seccessfully Updated Campground!");
          res.redirect("/campgrounds/" + req.params.id); 
       }
    });
});

// destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Seccessfully Deleted Campground!");
            res.redirect("/campgrounds");
        }
    });
});






module.exports = router;