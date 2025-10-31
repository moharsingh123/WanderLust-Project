
const User= require('../models/user.js');

module.exports.renderSignupForm   =(req,res)=>{
    res.render('users/signup.ejs');
}

module.exports.signUp=async (req,res ,next)=>{
    try{
     let {username,email ,password}= req.body;
    let newUser= new User({username ,email});
    const registerUser= await User.register(newUser,password)
    console.log(registerUser);
    req.login(registerUser,(err)=>{
        if(err){
            return next(err);
        }
    })
    req.flash('success' , 'Welcome to WunderLust!');
    res.redirect('/listings');
    }
    catch(e){
        req.flash('error' , e.message);
        res.redirect('/signup');
    }

}

module.exports.renderLoginForm=(req,res)=>{
    res.render('users/login.ejs');
}

module.exports.login=async (req,res)=>{
    req.flash('success' , 'Welcome to Wunderlust!');
    if(!res.locals.redirectUrl) return res.redirect('/listings');
    res.redirect(res.locals.redirectUrl);
}
module.exports.logout=(req,res , next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
    req.flash('success' , 'Logged you out!');
    res.redirect('/listings');
     })
}