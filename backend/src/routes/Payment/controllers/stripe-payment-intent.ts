import asyncHandler from "express-async-handler";
import { Basket, DefaultRequest, ProductBasket } from "../../../types";
import { Response } from "express";
import { Category } from "@prisma/client";
import { db } from "../../../libs/db";
import {ZodError, z} from "zod"
import Stripe from "stripe";
import { calculateTotal } from "../../../utils";
import { basketSchema } from "../../../schemas";
const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET)
const payementBodySchema = z.object({
  basket:basketSchema
})
interface RequestGet extends DefaultRequest {
  body:z.infer<typeof payementBodySchema>
}

export const stripePaymentIntent = asyncHandler(async(req:RequestGet,res:Response)=>{
  try{

    // Create order 
    const {basket} = payementBodySchema.parse(req.body); 
    
    const productIds = basket.map((product)=>({id:product.id}));
    const amount = calculateTotal(basket);
    
    const customer = await stripe.customers.create(req?.user?.email?{email:req?.user?.email}:{});
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2022-11-15'}
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount:amount *100,
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    

    const order = await db.order.create({
      data:{
        id: paymentIntent.id, 
        amount:amount , 
        address : req.user?.address??"", 
        products:{
          connect:productIds
        }, 
        basket:{
          create:basket.map((basketProduct)=>({
            product:{
              connect:{
                id:basketProduct.id
              }
            }, 
            quantity: basketProduct.ordered_quantity, 
            size: basketProduct.size, 
            color: basketProduct.color, 
          }))
        },
        user:{
          connect:{
            id:(req.user?.id! as string)
          }
        }, 
        payment_status: paymentIntent.status, 
        type: paymentIntent.payment_method_types??[],
        status : "progress", 
      }, 
      include:{
        basket: {
          include:{
            product:{
              include:{
                categories:true
              }
            }
          }
        }
      }
    });
    
    res.status(200).json({
      paymentIntent_id:paymentIntent.id,
      client_secret:paymentIntent.client_secret,
      ephemeralKey_secret:ephemeralKey.secret, 
      customer_id : customer.id
    })
  }

  catch(err:any){
    console.log(err.message,"PAYMENT_INTENT")
    if(err instanceof ZodError){
      res.status(401);
      throw new Error("Invalid Schema");
    }
    res.status(500)
    throw new Error("Internal Server Error"); 
  }
})

// const try_product:ProductBasket = {
//   id: "20a0b09f-4fcb-48e7-a819-a2394638af0a", 
//   name: "Black Shirt",
//   image:"https://cdn.shopify.com/s/files/1/0752/6435/products/IMG_0166_2fea8735-d493-49c3-8b4c-8e4392dc2ce4.jpg?v=1668772433",
//   price: 10,
//   quantity: 10, 
//   color:"black",
//   categories : [
//       { name: 'T-shirts'}, 
//       { name: 'Men'}, 
//   ]
// }

