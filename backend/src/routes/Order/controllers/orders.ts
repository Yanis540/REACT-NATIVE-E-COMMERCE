import asyncHandler from "express-async-handler";
import { DefaultRequest } from "../../../types";
import { Response } from "express";
import { Category } from "@prisma/client";
import { db } from "../../../libs/db";
interface Request extends DefaultRequest {
   
}


export const get_orders = asyncHandler(async(req:Request,res:Response)=>{
    console.log("HERE")
    const orders= await db.order.findMany({
        where:{
            user:{
                id:req.user?.id! as string
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


    res.status(200).json({orders})

 
})