import asyncHandler from "express-async-handler";
import {  Response } from "express";
import {ZodError, z} from "zod"
import bcrypt from "bcrypt"
import { db } from "../../../libs/db";
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/data-proxy";
import { DefaultRequest } from "../../../types";
const registerSchema = z.object({
    name : z.string(), 
    email :z.string().email(), 
    password : z.string(), 
    confirmPassword: z.string()
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
})


type RegisterSchema = z.infer<typeof registerSchema>
interface Request extends DefaultRequest {
    body:RegisterSchema
}


const register_controller = asyncHandler(async(req:Request,res:Response)=>{
    try{
        const {name,email,password} = registerSchema.parse(req.body);
        const existingUser= await db.user.findFirst({where:{email}})
        
        if(existingUser){
            res.status(401);
            throw new Error("Existing User",{cause:"EXISTING_USER"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);
            
        const user = await db.user.create({
            data:{
                email,name,hashedPassword
            }
        }); 
        res.status(201).json({message:"User created!"})
    }
    catch(err:any){
        console.log(err.message,"ERROR_REGISTER")
        if(err instanceof ZodError){
            throw new Error("Invalid Input")
        }
        if(err?.cause){
            throw new Error(err.message,{cause:err.cause})
        }
        if(!(err instanceof PrismaClientKnownRequestError) && !(err instanceof PrismaClientUnknownRequestError)  )
            throw new Error("Error with databaase ")
        throw new Error("Internal server error")
    }

 
})

export{ register_controller}