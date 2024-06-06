import express from "express";
const router= express.Router();
import { register,login,logout,getPost,getPosts} from "../controller/login.js";
router.post("/register",register)
router.post("/login",login)
router.get("/post",getPost)
router.post("/logout",logout)
router.get("/posts/:id" ,getPosts)

export default router;


    
    
    



        
        
        
        
        
        