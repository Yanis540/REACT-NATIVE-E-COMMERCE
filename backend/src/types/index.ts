import  { JwtPayload as JWTPayloadType }  from "jsonwebtoken";
import {Request} from "express"
import { User } from "@prisma/client";

export type ErrorInstance = {
    cause ?:string 
}&TypeError
export type DefaultRequest = {
    user ? : User
}&Request
export type JwtPayload ={
    id:string
}&JWTPayloadType