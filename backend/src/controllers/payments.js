import instance from "../server.js";
import crypto from "crypto"
import Payment from "../models/payment.js";


export const checkout = async(req, res, next) => {
   try {
    const options = {
        amount: Number(req.body.amount*100),
        currency: "INR"
    };

    const order = await instance.orders.create(options);

    return res.status(201).json({
        success: true,
        order
    });
    
   } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
   }
}


export const paymentVerification = async(req, res, next) => {
   try {
        const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const generated_signature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET).update(body.toString()).digest("hex");        
        
        if (generated_signature == razorpay_signature) {
            //store in database
            const paymentDetails = {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            };

            await Payment.create(paymentDetails);

            res.redirect(`http://localhost:5173/paymentsuccessful?reference=${razorpay_payment_id}`);
        }
        else{
            return res.status(400).json({
                success: false,
            });
        }
 
   } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
   }
}