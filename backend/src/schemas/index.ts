import {z} from "zod"
export const productBasketSchema = z.object({
  id: z.string(),
  name: z.string(),
  image : z.string().url(),
  ordered_quantity:z.number(),
  quantity:z.number(),// 
  size : z.enum(["L","M","S"]).optional(),
  color:z.enum(["blue","green","red","white","black"]),
  price: z.number(),
})
export const basketSchema = z.array(productBasketSchema);
