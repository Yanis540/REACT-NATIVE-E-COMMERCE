import { Router } from "express"
import { get_products } from "./controllers/get-products";
import { authUser } from "../../middlewares/auth";
import { get_product } from "./controllers/get-product";
import { add_favorite_product, delete_favorite_product, get_favorite_products } from "./controllers/favorite-product";
import { get_categories } from "./controllers/categories";


const router = Router()



router.get('/favorites',get_favorite_products);
router.post('/',get_products);
router.post('/favorite/:id',authUser,add_favorite_product)
router.delete('/favorite/:id',authUser,delete_favorite_product)
router.get('/categories',get_categories); 
router.get('/:id',get_product); 

export default router ; 