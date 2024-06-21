import express from "express";
const router= express.Router();
import { register,login,logout,getPost,getPosts,deletePost,addPost,newPost} from "../controller/login.js";
router.post("/register",register)
router.post("/login",login)
router.get("/post",getPost)
router.post("/logout",logout)
router.get("/posts/:id" ,getPosts)
router.delete("/posts/:id" ,deletePost)
router.post("/posts",addPost)
router.put("/posts/:id",newPost)

export default router;


    
    
    



        
        
        
        
        
        