var express     = require("express"),
 app            = express(),
 bodyParser     = require("body-parser"),
 mongoose       = require("mongoose"),
 flash          = require("connect-flash"),
 passport       = require("passport"),
 LocalStrategy  = require("passport-local"),
 methodOverride = require("method-override"),
 Campground     = require("./models/campground"),
 Comment        = require("./models/comment"),
 User           = require("./models/user"),
 SeedDB         = require("./seeds");
 
 var commentRoutes  = require("./routes/comments"),
 campgroundRoutes   = require("./routes/campgrounds"),
 indexRoutes        = require("./routes/index");
 
 var dbURL = '"mongodb://localhost:27017/yelp_camp_v3", { useNewUrlParser: true }';
 
 var url = process.env.DATABASEURL || dbURL
 mongoose.connect(url);
 
// mongoose.connect();
// mongodb+srv://jay123:<password>@yccluster-oyz3a.mongodb.net/test?retryWrites=true
// mongoose.connect("mongodb+srv://jay123:jayesh1234@yccluster-oyz3a.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });
// mongoose.connect("mongodb://localhost:27017/yelp_camp_v3", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// SeedDB(); seed the data base

//Passport config
//schema setup

app.use(require("express-session")({
    secret: "Jerry is very active and cute!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser  = req.user;
    res.locals.error        = req.flash("error");
    res.locals.success      = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started!!!");
});