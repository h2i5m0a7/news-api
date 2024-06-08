import express from "express";
const router= express.Router();
import { register,login,logout,getPost,getPosts,deletePost} from "../controller/login.js";
router.post("/register",register)
router.post("/login",login)
router.get("/post",getPost)
router.post("/logout",logout)
router.get("/posts/:id" ,getPosts)
router.delete("/posts/:id" ,deletePost)

export default router;


    
    
    



        
        
        
        
        
        