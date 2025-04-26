const express=require('express')
const {Users}=require('../models/User.js')
const {verifyToken}=require('../middlewares/authMiddlewares.js')
const {adminRole}=require('../middlewares/roleMiddlewares.js');
const mongoose=require('mongoose')
const router=express.Router()

router.get('/get-users',verifyToken,adminRole,async (req,res)=>{
    try{
        const users=await Users.find();
        console.log("users obtaines",users);
        res.status(200).json({success:true,message:"Users list obtained",Users:users});
    }catch(error){
        console.error("An error occurred ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
})

router.delete('/delete-user',verifyToken,adminRole,async (req,res)=>{
    try{
        const userId=req.query.userId;
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid UserId format' });
          }
        const user=await Users.findByIdAndDelete(userId);
        console.log(user)
        if(!user){
            res.status(404).json({message:"User not found"});
            return;
        }
        console.log("User deleted successfully");
        res.status(200).json({success:true,message:"User deleted Successfully",Deleted_User:user});
    }catch(error){
        console.error("An error occurred ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
})

module.exports={AdminRoutes:router}