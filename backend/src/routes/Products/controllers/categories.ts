import asyncHandler from "express-async-handler";
import { DefaultRequest, FullProduct } from "../../../types";
import { Response } from "express";
import {ZodError, z} from "zod";
import { db } from "../../../libs/db";
interface Request extends DefaultRequest {
    body:{
    }, 

}


export const get_categories = asyncHandler(async(req:Request,res:Response)=>{
    const categories = await db.category.findMany({
        include:{
            products:{
                take:5
            }
        }
    })


    res.status(200).json({categories})

})