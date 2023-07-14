import { Router } from "express"
import { authUser } from "../../middlewares/auth";
import { get_orders } from "./controllers/orders";
import { confirm_order, get_order } from "./controllers/order";


const router = Router()


router.get("/",authUser, get_orders)
router.get("/:id",authUser, get_order)
router.put("/confirm",authUser, confirm_order)
export default router ; 