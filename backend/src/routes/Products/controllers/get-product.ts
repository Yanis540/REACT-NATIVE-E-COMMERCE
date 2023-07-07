import asyncHandler from "express-async-handler";
import { DefaultRequest, FullProduct } from "../../../types";
import { Response } from "express";
import {ZodError, z} from "zod";
import { Category } from "@prisma/client";
import { db } from "../../../libs/db";
interface Request extends DefaultRequest {
    body:{
        categories ?: Category[], 
        name ?: string 
    }, 
    params:{
        id : string 
    }
}


export const get_product = asyncHandler(async(req:Request,res:Response)=>{
    const {id} = req.params; 
    const product = await db.product.findFirst({
        where:{id},
        include:{
            categories:true, 
            _count:{
                select:{
                    liked_by:true
                }
            }, 
           
        }
    })
    if(!product){
        res.status(404)
        throw new Error("Product Not found");
    }

    res.status(200).json({product})

 
})
