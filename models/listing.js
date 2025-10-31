const { fileLoader } = require('ejs');
const mongoose= require('mongoose');
const Review = require('./reviews');

// main().then(()=>{
//     console.log(" Connected to Mongodb")
// }).catch((err)=>{
//     console.log(err);
// })

// async function main() {
//    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
// }

const Schema=mongoose.Schema;
const listingSchema= new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
image: {
        url: String,
        filename: String,
},
    price:Number,
    location:String,
    country:String,
    reviews:[
      {
      type:Schema.Types.ObjectId,
      ref:'Review',
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:'User',
  },
});

// Mongoose Middleware to delete all reviews associated with a listing when the listing is deleted
listingSchema.post('findOneAndDelete', async (listing)=>{
  if(listing){
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

  

const Listing= mongoose.model("Listing" ,listingSchema)
module.exports=Listing;

