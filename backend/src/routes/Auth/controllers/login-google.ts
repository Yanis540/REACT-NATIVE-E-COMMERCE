import asyncHandler from "express-async-handler";
import {ZodError, z} from "zod";
import { db } from "../../../libs/db";
import {Response} from "express"
import {  generateAuthToken } from "../../../tokens";
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/data-proxy";
import { DefaultRequest } from "../../../types";

const loginBody = z.object({
    userInfo: z.object({
        user:z.object({
            id:z.string(), 
            email:z.string(), 
            name:z.string().nullable().optional(), 
            photo:z.string().nullable().optional(), 
            familyName:z.string().nullable().optional(), 
            givenName:z.string().nullable().optional(), 
        }) , 
        scopes : z.array(z.string()).optional(), 
        idToken: z.string().nullable().optional(), 
        serverAuthCode: z.string().nullable().optional()
        
    })
})

type LoginBody = z.infer<typeof loginBody>
interface Request extends DefaultRequest {
    body:LoginBody
}


const login_google_controller = asyncHandler(async(req:Request,res:Response)=>{
    try{
        const {userInfo} = loginBody.parse(req.body); 
        const existingUser = await db.user.findFirst({
            where:{
                email : userInfo.user.email
            }, 
            include:{
                favorite_products:true, 
                orders:true
            }
        }); 
        let createdUser ; 
        if(!existingUser) {
            createdUser =  await db.user.create({
                data:{
                    email: userInfo.user.email,
                    id: userInfo.user.id,
                    image: userInfo.user.id,
                    name: userInfo.user.name??`${userInfo.user.familyName??""} ${userInfo.user.givenName??""}`
                }, 
                include:{
                    favorite_products:true, 
                    orders:true
                }
            })
        }
       
        // create and send tokens 
        const {accessToken,refreshToken,expiresIn} = generateAuthToken(existingUser?existingUser.id: createdUser!.id);
        res.status(201).json({
            user : {
                ...existingUser,
                hashedPassword:undefined ,
            },
            tokens:{
                access:{
                    token:accessToken, expiresIn 
                }, 
                refresh:{
                    token:refreshToken
                }
            } 
        })
    }
    catch(err:any){
        console.log(err.message,"LOGIN")
        if(err instanceof ZodError){
            throw new Error("Invalid Input")
        }
        if(err.cause){
            throw new Error(err.message,{cause:err.cause})
        }
        if(!(err instanceof PrismaClientKnownRequestError) && !(err instanceof PrismaClientUnknownRequestError)  ){
            res.status(400)
            throw new Error("Error with databaase ")
        }
        throw new Error("Internal server error")

    }

        // const {}
})

export{ login_google_controller}