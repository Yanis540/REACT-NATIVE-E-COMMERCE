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

export const get_favorite_products = asyncHandler(async(req:DefaultRequest, res:Response)=>{
    const user = await db.user.findFirst({
        where:{id:req?.user!?.id}, 
        include:{
            favorite_products:{
                include:{
                    categories:true, 
                    _count:{
                        select:{
                            liked_by:true
                        }
                    }, 
                }
           
            }
        }
    }); 
    if(!user){
        res.status(404)
        throw new Error("User Not found", {cause:"USER_NOT_FOUND"}) 
    }
    res.status(201).json({favorite_products: user.favorite_products})
})

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
    }); 



    res.status(200).json({message:"Added to favorite",favorite_products:user_updated.favorite_products})

 
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


    res.status(200).json({message:"Removed from favorite",favorite_products:user_updated.favorite_products})
 
})
