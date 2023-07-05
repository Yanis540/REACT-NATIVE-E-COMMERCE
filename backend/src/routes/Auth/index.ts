import express from "express"; 
import { login_controller } from "./controllers/login-controller";
import { register_controller } from "./controllers/register-controller";


const router = express.Router();


router.post("/login",login_controller)
router.post("/register",register_controller)



export default router; 