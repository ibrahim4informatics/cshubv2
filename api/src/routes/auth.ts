import { Router } from "express";

const router = Router();

router.post("/login",(req,res):any=>{
    return res.status(200).json({message:"auth route"});
});
export default router;