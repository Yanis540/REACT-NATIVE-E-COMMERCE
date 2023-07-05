import {z} from "zod"
export const productBasketSchema = z.object({
    id: z.string(),
    name: z.string(),
    image : z.string().url(),
    quantity:z.number(),// 
    size : z.enum(["L","M","S"]).optional(),
    color:z.enum(["blue","green","red","white","black"]),
    price: z.number(),
    categories:z.array(z.object({
      name:z.string()
    }))
  })
export const basketSchema = z.array(productBasketSchema);
