import app from "./app.js";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import connectDB from "./db/connectDB.js";

if(process.env.NODE_ENV !== "production"){
    dotenv.config({path: "config.env"});
}

//database
connectDB();

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

export default instance;
