import asyncHandler from "express-async-handler";
import { DefaultRequest } from "../../../types";
import { Response } from "express";
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


export const add_favorite_product = asyncHandler(async(req:Request,res:Response)=>{
    const {id} = req.params; 
    const productExists = await db.product.findFirst({
        where:{id}
    })
    if(!productExists){
        res.status(404);
        throw new Error("Product Not found");
    }
    const user_updated = await db.user.update({
        where:{
            id:req.user!.id
        },
        data:{
            favorite_products:{
                connect:{
                    id:id 
                }
            }
        }, 
        include:{
            favorite_products:true, 
            
        }
    })


    res.status(200).json({message:"Added to favorite",user:{...user_updated,hashedPassword:undefined}})

 
})
export const delete_favorite_product = asyncHandler(async(req:Request,res:Response)=>{
    const {id} = req.params; 
    const product = await db.product.findFirst({
        where:{id}, 
        include:{
            categories:true 
        }
    })
    if(!product){
        res.status(404)
        throw new Error("Product Not found");
    }
    const user_updated = await db.user.update({
        where:{
            id:req.user!.id
        },
        data:{
            favorite_products:{
                disconnect:{
                    id:id 
                }
            }
        }, 
        include:{
            favorite_products:true, 
            
        }
    })


    res.status(200).json({message:"Removed from favorite",user:{...user_updated,hashedPassword:undefined}})
 
})
