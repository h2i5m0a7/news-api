import express from "express";
const router= express.Router();
import { register,login,post} from "../controller/login.js";
router.post("/register",register)
router.post("/login",login)
router.post("/post",post)
export default router;


    
    
    



        
        
        
        
        
        