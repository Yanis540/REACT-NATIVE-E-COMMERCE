import asyncHandler from "express-async-handler";
import { DefaultRequest, ProductBasket } from "../../../types";
import { Response } from "express";
import { db } from "../../../libs/db";
import {z} from "zod"
import Stripe from "stripe";

import { calculateTotal } from "../../../utils";
import { basketSchema } from "../../../schemas";
const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET)
interface RequestGet extends DefaultRequest {
    params:{
        id:string
    }
}



export const get_order = asyncHandler(async(req:RequestGet,res:Response)=>{
    const {id} = req.params ; 
    const existingOrder = await db.order.findFirst({
        where:{
            id:id , 
            user:{
                id:req.user?.id
            }
        }, 
        include:{
            products:true,
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
    })
    if(!existingOrder){
        res.status(404);
        throw new Error("Order Not found");
    }
    res.status(200).json({order:existingOrder})
})


export const bodySchema = z.object({
    paymentIntent_id: z.string()
})
export type BodySchema = z.infer<typeof bodySchema>
interface RequestAdd extends DefaultRequest {
    body:BodySchema
}
export const confirm_order = asyncHandler(async(req:RequestAdd,res:Response)=>{
    
    try{
        bodySchema.parse(req.body)
    }
    catch(err:any){
        res.status(403)
        throw new Error("Invalid schema");
    }
    const {paymentIntent_id} = bodySchema.parse(req.body); 
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntent_id); 
    if(!paymentIntent){
        res.status(404);
        throw new Error(`No transaction with number ${paymentIntent} `)
    }
    const existing = await db.order.findFirst({
        where:{
            id:paymentIntent_id,
            user:{
                id:req.user!?.id
            }
        }
    })
    if(!existing){
        res.status(404)
        throw  new Error(`No order with id ${paymentIntent_id} passed`);
    }
    if(existing.payment_status=="succeeded"){
        res.status(401); 
    }
    const updatedOrder = await db.order.update({
        where:{id:paymentIntent_id}, 
        data:{
            status:"progress",
            payment_status:paymentIntent.status
        }
    })
    

    res.status(200).json({message:"Order passed ! "})

})