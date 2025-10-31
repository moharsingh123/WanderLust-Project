if(process.env.NODE_ENV !== "production"){   // load environment variables from .env file in development mode
    require('dotenv').config();
}
const express= require('express');
const app= express();
const mongoose= require('mongoose');
app.use(express.json());
const methodOverride=require('method-override'); // to use put and delete methods
const ejsMate= require('ejs-mate');   // for ejs layouts
const ExpressError=require('./utils/ExpressError.js');          // custom error class
const session= require('express-session');             // for session management
const MongoStore = require('connect-mongo');   // to store session in mongodb
const flash= require('connect-flash'); // for flash messages
const passport= require('passport');    // for authentication
const localStrategy= require('passport-local');   // local strategy for authentication
const User= require('./models/user.js');  // User model

 const  reviewsRouter =require('./routes/review.js')    // reviews routes
 const listingsRouter= require('./routes/listing.js');  // listings routes
 const userRouter= require('./routes/user.js'); // user routes

 const dbUrl= process.env.ATLASDB_URL;

main().then(()=>{
    console.log(" Connected to Mongodb")
}).catch((err)=>{
    console.log(err);
})

async function main() {
   await mongoose.connect(dbUrl);
}


const Reviews= require('./models/reviews.js')


const path=require('path');

app.set("view engine" ,"ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method')); // to use put and delete methods
app.engine('ejs', ejsMate); // use ejs-mate for ejs templates
app.use(express.static(path.join(__dirname,"/public")));


 const store= MongoStore.create({ 
    mongoUrl: dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 24*60*60 // time period in seconds
 })

 store.on("error" , function(e){
    console.log("Session store error", e);
 });


 // define session config
 const sessionOptions={
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now() + 1000*60*60*24*7, // 1 week
        maxAge: 1000*60*60*24*7
    }
 }





// use session and  flash middleware 
 app.use(session(sessionOptions));
 app.use(flash());

 // passport configuration
 app.use(passport.initialize());  // initialize passport
 app.use(passport.session());    // use passport session
passport.use(new localStrategy(User.authenticate()));  // use local strategy for authentication the user
passport.serializeUser(User.serializeUser());     // to store user in session   serializeUser
passport.deserializeUser(User.deserializeUser());   //to get user from session   deserializeUser




// flash middleware
app.use((req,res,next)=>{
    res.locals.success= req.flash('success');
    res.locals.error= req.flash('error');
    res.locals.currUser= req.user;
    
    // console.log(res.locals.success);
    next();
});


// Demo route to create a user ;just for testing purpose


// app.get('/demouser' , async(req,res)=>{
//     let fakeUser= new User({
//         email:"student@gmail.com",
//         username:"student123"
//     });

//     // User.register will hash the password and store it in the database
//     let registerUser= await User.register(fakeUser ,"mypassword" )
//     console.log(registerUser);
//     res.send(registerUser);
// });


// Handle routes
app.use('/listings', listingsRouter);
app.use('/listings/:id/reviews' , reviewsRouter);
app.use('/', userRouter);


// 404 handler
    
app.all(/.*/ , (req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});
// generic error handler
app.use((err, req,res,next)=>{
    let{statusCode= 404, message="Something went wrong" }= err;
    res.status(statusCode).render("error.ejs" ,{message});
    // res.status(statusCode).send(message);
   
})
// start the server
app.listen(3000,()=>{
    console.log('Server is listening to port 3000');
})