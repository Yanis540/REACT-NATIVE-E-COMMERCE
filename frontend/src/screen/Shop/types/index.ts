import { z } from "zod"

export const searchProductForm = z.object({
    name : z.string().optional(), 
    categorie : z.object({ name :  z.string(), 
        image : z.string().optional(),    
        products :z.array(z.any())
    }).optional()
})
export type SeacrhProductFormType = z.infer<typeof searchProductForm>