import express from "express";
import paymetnRouter from "./routes/payments.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1", paymetnRouter);

//to send key id to frontend
app.get("/api/v1/getkey", (req,res,next) => res.status(200).json({key_id:process.env.RAZORPAY_API_KEY}));

export default app;