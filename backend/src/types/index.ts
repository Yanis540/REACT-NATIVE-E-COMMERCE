import  { JwtPayload as JWTPayloadType }  from "jsonwebtoken";
import {Request} from "express"
import { Product, User , Category } from "@prisma/client";
import {z} from "zod"
import { basketSchema, productBasketSchema } from "../schemas";
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


export type ProductBasket = z.infer<typeof productBasketSchema>  
export type Basket = z.infer<typeof basketSchema>

export type GoogleUser = {
    user: {
        id: string;
        name: string | null;
        email: string;
        photo: string | null;
        familyName: string | null;
        givenName: string | null;
      };
    scopes?: string[];
    idToken: string | null;
   
    serverAuthCode: string | null;
}