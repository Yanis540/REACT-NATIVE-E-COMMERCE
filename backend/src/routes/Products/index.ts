import { Router } from "express"
import { get_products } from "./controllers/get-products";
import { authUser } from "../../middlewares/auth";
import { get_product } from "./controllers/get-product";
import { add_favorite_product, delete_favorite_product } from "./controllers/favorite-product";


const router = Router()



router.post('/',get_products);
router.get('/:id',get_product); 
router.post('/favorite/:id',authUser,add_favorite_product)
router.delete('/favorite/:id',authUser,delete_favorite_product)

export default router ; 