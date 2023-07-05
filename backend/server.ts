import {config} from "dotenv";
config()


import express,{Request, Response} from "express"; 
import { errorMiddleware } from "./src/middlewares/error";
import authRouter from "./src/routes/Auth"
import productsRouter from "./src/routes/Products"
import orderRouter from "./src/routes/Order"
import paymentRouter from "./src/routes/Payment"
import { authUser } from "./src/middlewares/auth";



const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));


const PORT = process.env.PORT || 5000; 


app.get('/',authUser,(req:Request, res:Response)=>{

    res.json({message:"Hello"})
})

app.use("/auth",authRouter)
app.use("/products",productsRouter)
app.use("/orders",orderRouter)
app.use("/payment",paymentRouter)


app.use(errorMiddleware)


app.listen(PORT,()=>console.log(`Server Running on PORT ${PORT}`))










