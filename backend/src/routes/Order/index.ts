import { Router } from "express"
import { authUser } from "../../middlewares/auth";
import { get_orders } from "./controllers/orders";
import { add_order, get_order } from "./controllers/order";


const router = Router()


router.get("/",authUser, get_orders)
router.get("/:id",authUser, get_order)
router.post("/create",authUser, add_order)
export default router ; 