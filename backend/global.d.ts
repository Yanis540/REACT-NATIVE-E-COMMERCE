import { PrismaClient, User } from "@prisma/client"
import { JwtPayload as DefaultJWTPayload } from "jsonwebtoken"

declare global {
    var prisma : PrismaClient
}
