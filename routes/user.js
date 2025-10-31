const express= require('express');
const router= express.Router();
const User= require('../models/user.js');
const wrapAsyc = require('../utils/wrapAsyc.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const usersController= require('../controllers/users.js');
const user = require('../models/user.js');


router
    .route('/signup')
    .get(usersController.renderSignupForm) // signup Get Route
    .post( wrapAsyc(usersController.signUp)) // Signup Post Route

router.route('/login')
.get(usersController.renderLoginForm)// Login Get Route
.post(  // Login Post Route
     saveRedirectUrl
    ,passport.authenticate('local' ,{failureRedirect:'/login' ,failureFlash:true}) ,
    usersController.login
);

router.get('/logout',usersController.logout);


module.exports=router;