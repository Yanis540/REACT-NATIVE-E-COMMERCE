import {z} from "zod"
export const registerSchema = z.object({
    name : z.string(), 
    email :z.string().email(), 
    password : z.string(), 
    confirmPassword: z.string()
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
})


export type RegisterSchema = z.infer<typeof registerSchema>