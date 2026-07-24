import axios from "axios";
import { PLANS } from "../config/plans.js";
import stripe from "../config/stripe.js";
import Payment from "../models/payment.model.js";

export const createOrder = async (req, res) => {
    try {
        const { plan } = req.body;
        const userId = req.headers["x-user-id"];

        if (!plan || !PLANS[plan]) {
            return res.status(400).json({ message: "invalid plan requested" });
        }

        const selectedPlan = PLANS[plan];
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: `Zentra AI ${selectedPlan.name} Plan`
                        },
                        unit_amount: selectedPlan.amount * 100
                    },
                    quantity: 1
                }
            ],

            // succ url and cancel ur
            metadata: {
                userId: userId || "unknown",
                credits: String(selectedPlan.credits),
                plan: selectedPlan.id
            }
        });

        await Payment.create({
            userId,
            orderId: session.id,
            amount: selectedPlan.amount,
            currency: "inr",
            credits: selectedPlan.credits,
            plan: selectedPlan.id,
            status: "created"
        });

        return res.status(200).json({
            message: "checkout session created",
            sessionId: session.id,
            url: session.url,
            session
        });
    } catch (error) {
        console.error("err in create order bill control: ", error.message);
        return res.status(500).json({ message: "failed to create checkout session" });
    }
};

export const verifyPayment = async () => {
    try {
        const {stripeId, stripePaymentId, stripeSignature} = req.body;


        const generateSecret = crypto.createHmac("sha256", process.env.STRIPE_SECRET_KEY).update(`${stripeId}|${stripePaymentId}`).digest("hex");

        if(generateSecret !== stripeSignature) {
            return res.status(400).json({message : "payment verification failed"});
        }

        const payment = await Payment.findOne({orderId : stripeId});
        if(!payment) {
            return res.status(404).json({message : "payment not found"});
        }

        payment.status = "paid";
        payment.paymentId = stripePaymentId; 
        await payment.save();

        await axios.post(`${process.env.AUTH_SERVICE_URL}/update-plan`, {userId : payment.userId, plan : payment.plan, credits : payment.credits })

        return res.status(200).json({message : "payment verified"});
    } catch (error) {
        console.log("er in vrify url: ", error.message);
        return res.status(500).json({message : "error in verifu url controller"});
    }
}