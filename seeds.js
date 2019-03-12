var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
    {   
        name: "Cloud's Rest",
        image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consequat id nibh id efficitur. Etiam consectetur hendrerit bibendum. Donec vitae vestibulum turpis. Proin non fringilla nunc, sed scelerisque dui. Sed ac ex maximus, ultricies orci vitae, molestie enim. Proin vitae sem libero. Duis pretium finibus porta. Nunc tortor ligula, tincidunt sed felis non, dictum hendrerit sapien. Nunc dignissim mauris nec congue ultricies. Donec sagittis ex nec sapien vestibulum molestie."
    },
    {   
        name: "Friends Camp",
        image: "https://images.pexels.com/photos/1376960/pexels-photo-1376960.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consequat id nibh id efficitur. Etiam consectetur hendrerit bibendum. Donec vitae vestibulum turpis. Proin non fringilla nunc, sed scelerisque dui. Sed ac ex maximus, ultricies orci vitae, molestie enim. Proin vitae sem libero. Duis pretium finibus porta. Nunc tortor ligula, tincidunt sed felis non, dictum hendrerit sapien. Nunc dignissim mauris nec congue ultricies. Donec sagittis ex nec sapien vestibulum molestie."
    },
    {   
        name: "Mount Rest",
        image: "https://images.pexels.com/photos/1309584/pexels-photo-1309584.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consequat id nibh id efficitur. Etiam consectetur hendrerit bibendum. Donec vitae vestibulum turpis. Proin non fringilla nunc, sed scelerisque dui. Sed ac ex maximus, ultricies orci vitae, molestie enim. Proin vitae sem libero. Duis pretium finibus porta. Nunc tortor ligula, tincidunt sed felis non, dictum hendrerit sapien. Nunc dignissim mauris nec congue ultricies. Donec sagittis ex nec sapien vestibulum molestie."
    }
    
];


function seedDB(){
    //Remove All Campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } 
        console.log("Campground Removed");
        data.forEach(function(seed){
             Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("Added a campground");
                    // adding comment
                    Comment.create({
                        text: "this place is great but i hope for internet...",
                        author: "IronMan"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created new comment!");
                        }
                            
                    });
                }
            });
        });
    });
    // Add new campgrounds
    //add new comments
}

module.exports = seedDB;


