import { Router } from "express";
import { authUser } from "../../middlewares/auth";
import { stripeCheckout } from "./controllers/stripe-checkout";



const router = Router();


router.post('/stripe/checkout',authUser,stripeCheckout )


export default router; 