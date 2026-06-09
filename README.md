🌍 WanderLust - Travel Stay Marketplace

WanderLust is a full-stack travel accommodation platform inspired by Airbnb, where users can explore unique stays, list their own properties, and share travel experiences through ratings and reviews. The platform provides a seamless experience for both travelers and property owners with secure authentication, interactive maps, and responsive design. It follows the MVC architecture to ensure scalability and maintainability.

✨ Features
🔐 User Authentication & Authorization
Secure Sign Up, Login, and Logout
Session-based authentication using Passport.js
Only property owners can edit or delete their listings
🏡 Property Listings
Create, update, view, and delete listings
Add property details, images, pricing, and location
Browse accommodations from different destinations
📷 Image Upload
Cloudinary integration for secure image storage
Multer for handling file uploads
🗺️ Interactive Maps
Mapbox integration for displaying property locations
Easy navigation and location discovery
⭐ Reviews & Ratings
Users can leave reviews and ratings
Listing owners cannot manipulate user reviews
✅ Data Validation
Client-side and server-side validation
Joi schema validation for secure data handling
📱 Responsive Design
Mobile-friendly UI built with Bootstrap
Optimized for desktop, tablet, and mobile devices
⚡ Flash Messages & Error Handling
User-friendly notifications
Centralized error handling for better UX

🛠 Tech Stack
Frontend
EJS
HTML5
CSS3
Bootstrap 5
JavaScript
Backend
Node.js
Express.js
Database
MongoDB
Mongoose
Authentication
Passport.js
Express Session
Cloud Services
Cloudinary
Mapbox
Additional Tools
Multer
Joi
Connect Flash
Method Override
Dotenv

📂 Project Structure
WanderLust/
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── utils/
├── init/
├── app.js
├── middleware.js
├── cloudConfig.js
├── schema.js
└── package.json
