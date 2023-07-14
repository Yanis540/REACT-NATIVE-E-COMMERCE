import { Router } from "express";
import { authUser } from "../../middlewares/auth";
import { stripeCheckout } from "./controllers/stripe-checkout";
import { stripePaymentIntent } from "./controllers/stripe-payment-intent";



const router = Router();


router.post('/stripe/checkout',authUser,stripeCheckout )
router.post("/stripe/payment-intent",authUser,stripePaymentIntent)


export default router; 