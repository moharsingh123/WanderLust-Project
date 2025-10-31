const express= require('express');
const router= express.Router({mergeParams: true});
const ExpressError=require('../utils/ExpressError.js');

const Reviews= require('../models/reviews.js')
const wrapAsyc = require('../utils/wrapAsyc.js');
const Listing= require('../models/listing.js')
const { validateReview, isLoggedIn, isReviewAuthor}= require('../middleware.js');
const reviewController= require('../controllers/reviews.js');

    // Review Routes
    //post route for adding review
    router.post('/' , isLoggedIn,validateReview , wrapAsyc(reviewController.createReview))


    // Delete Route for reviews
    router.delete('/:reviewId',isLoggedIn,isReviewAuthor  ,wrapAsyc( reviewController.destroyReview));  

    module.exports= router;