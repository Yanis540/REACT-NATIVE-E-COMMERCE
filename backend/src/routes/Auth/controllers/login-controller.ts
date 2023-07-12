import asyncHandler from "express-async-handler";
import {ZodError, z} from "zod";
import { db } from "../../../libs/db";
import {Response} from "express"
import bcrypt from "bcrypt"
import { generateAccessToken, generateAuthToken } from "../../../tokens";
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/data-proxy";
import { DefaultRequest } from "../../../types";

const loginSchema = z.object({
    email :z.string().email(), 
    password : z.string()
})

type LoginSchema = z.infer<typeof loginSchema>
interface Request extends DefaultRequest {
    body:LoginSchema
}


const login_controller = asyncHandler(async(req:Request,res:Response)=>{
    try{
        const {email,password} = loginSchema.parse(req.body); 
        const existingUser = await db.user.findFirst({
            where:{
                email
            }, 
            include:{
                favorite_products:true, 
                orders:true
            }
        }); 
        if(!existingUser) {
            res.status(404)
            throw new Error(`No user with email ${email}`, {cause:"EMAIL_NOT_FOUND"});
        }
        const passwordMatch = await bcrypt.compare(password,existingUser.hashedPassword);
        if(!passwordMatch){
            res.status(401)
            throw new Error("Invalid password",{cause:"INVALID_PASSWORD"})
        }
        // create and send tokens 
        const {accessToken,refreshToken,expiresIn} = generateAuthToken(existingUser.id);
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

export{ login_controller}