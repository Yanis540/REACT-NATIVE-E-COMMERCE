import asyncHandler from "express-async-handler";
import { DefaultRequest, FullProduct } from "../../../types";
import { Response } from "express";
import {ZodError, z} from "zod";
import { Category } from "@prisma/client";
import { db } from "../../../libs/db";
const categorieSchema = z.object({
    name:z.string()
})

const bodySchema =z.object({
    name: z.string().optional(), 
    categories: z.array(
        categorieSchema
    ).optional()
}) 

interface Request extends DefaultRequest {
    body:{
        categories ?: Category[], 
        name ?: string 
    }
}


export const get_products = asyncHandler(async(req:Request,res:Response)=>{
    try{
        const {categories,name} = bodySchema.parse(req.body);
        console.log(categories,name)
        const categories_names = !categories?[]:categories!.map((categorie)=>categorie.name); 
        let products: FullProduct[] = [];
        if(
            (!name || (name as string).trim()=="" ) 
            && (! categories || categories?.length==0)
        )
        
            products = await db.product.findMany({
                
                include:{
                    categories:true, 
                    _count:{
                        select:{
                            liked_by:true
                        }
                    },
                }
            })
        else 
            products = await db.product.findMany({
                where:{
                    AND:[
                        {
                            OR :[
                                {
                                    name:name?.trim().length==0?{}:{ contains : name?.trim(),mode:"insensitive"}
                                }, 
                                {
                                    categories:categories?.length == 0 ?{}:{
                                        some:{
                                            name:{in:categories_names}
                                        }
                                    }
                                }
                            ],
                        },
                        {
                            OR :[
                                {
                                    categories:categories?.length == 0 ?{}:{
                                        some:{
                                            name:{in:categories_names}
                                        }
                                    }
                                },
                                {
                                    name:name?.trim().length==0?{}:{ contains : name?.trim(),mode:"insensitive"}
                                }, 
                            ],
                        },
                    ]
                },
                include:{
                    categories:true, 
                    _count:{
                        select:{
                            liked_by:true
                        }
                    },
                }
            })
        res.status(201).json({products});

    }
    catch(err:any ){
        if(err instanceof ZodError){
            res.status(403)
            throw new Error("Type conversion error")
        }
        console.log(err.message,"ERROR_PRODUCTS"); 
        throw new Error("Internal Error Server")
    }
})

