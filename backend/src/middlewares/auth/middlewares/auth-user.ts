import {  Response , NextFunction } from "express";
import asyncHandler from "express-async-handler";
import {AuthError} from "./types"
import jwt from "jsonwebtoken"
import { db } from "../../../libs/db";
import { DefaultRequest, JwtPayload } from "../../../types";




const authUser = asyncHandler(async(req:DefaultRequest, res:Response , next:NextFunction)=>{
    try{
        if(!req?.headers || !req?.headers?.authorization?.startsWith("Bearer") )
            throw new Error("Unauthorized",{cause:AuthError.UNAUTHORIZED_ACCESS_TOKEN,})
        const token = req.headers.authorization.split(" ")[1];
        let  decoded:string |JwtPayload;
        try{
            decoded =<JwtPayload>jwt.verify(token,process.env.ACCESS_TOKEN_SECRET!);
        }
        catch(err:any){
            res.status(403)
            throw new Error("Invalid Token",{cause:AuthError.EXPIRED_ACCESS_TOKEN});
        }
        if(!decoded?.id) {
            res.status(401);
            throw new Error("Unauthorized",{cause:AuthError.UNAUTHORIZED_ACCESS_TOKEN,});
        }
        
        const user = await db.user.findFirst({where:{id:decoded.id}});
        if(!user){
            res.status(403)
            throw new Error("Unauthorized",{cause:AuthError.EXPIRED_ACCESS_TOKEN,});
        }
        req.user= user ; 
        next();
    }
    catch(err:any){
        throw new Error(err.message,{cause:err.cause})
    }
})

export {
    authUser
}



