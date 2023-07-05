import  { JwtPayload as JWTPayloadType }  from "jsonwebtoken";
import {Request} from "express"
import { Product, User , Category } from "@prisma/client";

export type ErrorInstance = {
    cause ?:string 
}&TypeError 
export type DefaultRequest = {
    user ? : User
}&Request
export type JwtPayload ={
    id:string
}&JWTPayloadType
export type FullProduct = Product &{
    categories : Category[]
}