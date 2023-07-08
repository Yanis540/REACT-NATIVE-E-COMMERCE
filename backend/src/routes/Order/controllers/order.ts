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
    basket: basketSchema , 
    address: z.string(),
    checkout_session_id: z.string() 
})
export type BodySchema = z.infer<typeof bodySchema>
interface RequestAdd extends DefaultRequest {
    body:BodySchema
}
export const add_order = asyncHandler(async(req:RequestAdd,res:Response)=>{
    
    try{
        bodySchema.parse(req.body)
    }
    catch(err:any){
        res.status(403)
        throw new Error("Invalid schema");
    }
    const {basket,checkout_session_id, address} = bodySchema.parse(req.body); 
    const alreadyExisting = await db.order.findFirst({
        where:{
            id:checkout_session_id
        }
    })
    if(alreadyExisting){
        res.status(403)
        throw  new Error("Order already passed");
    }

    const stripeSession= await stripe.checkout.sessions.retrieve(checkout_session_id);
    if(!stripeSession?.status){
        res.status(401)
        throw new Error('Invalid Checkout Session');
    }
    const productIds = basket.map((product)=>({id:product.id}));
    const amount = calculateTotal(basket);

    const order = await db.order.create({
        data:{
            id: checkout_session_id, 
            amount:amount , 
            address : address, 
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
                    quantity: basketProduct.quantity, 
                    size: basketProduct.size, 
                    color: basketProduct.color, 

                }))
            },
            user:{
                connect:{
                    id:(req.user?.id! as string)
                }
            }, 
            checkout_url : stripeSession.url??'', 
            checkout_status: stripeSession.status, 
            payment_status: stripeSession.payment_status, 
            type: stripeSession.submit_type??'',
            status : "progress"
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

    res.status(200).json({message:"Order passed ! "})

})