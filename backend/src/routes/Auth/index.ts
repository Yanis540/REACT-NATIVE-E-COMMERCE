import express from "express"; 
import { login_controller } from "./controllers/login-controller";
import { register_controller } from "./controllers/register-controller";
import { authGoogle } from "../../middlewares/auth";
import { login_google_controller } from "./controllers/login-google";


const router = express.Router();

router.post("/login",login_controller)
router.post("/login/provider/google",authGoogle,login_google_controller)
router.post("/register",register_controller)



export default router; 