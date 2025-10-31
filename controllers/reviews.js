

const Listing= require('../models/listing');
const Reviews= require('../models/reviews');


module.exports.createReview=  async(req,res)=>{
        let {id}= req.params;
        console.log(id);
        let listing= await Listing.findById(id);
        let newReview= new Reviews(req.body.review);
        newReview.author= req.user._id;
        
        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
        req.flash('success' , 'Successfully added a new review!');
        console.log(newReview);
        res.redirect(`/listings/${id}`);
    }


module.exports.destroyReview=async(req,res)=>{
        let {id, reviewId}= req.params;
        await Listing.findByIdAndUpdate(id , {$pull: {reviews: reviewId } });   
        await Reviews.findByIdAndDelete(reviewId);
        req.flash('success' , 'Successfully deleted the review!');
        res.redirect(`/listings/${id}`);
    }