const express=require('express')
const {Users}=require('../models/User.js')
const {Task}=require('../models/Task.js')
const {verifyToken}=require('../middlewares/authMiddlewares.js')
const {adminRole}=require('../middlewares/roleMiddlewares.js');
const mongoose=require('mongoose')
const router=express.Router()

router.get('/get-users',verifyToken,adminRole,async (req,res)=>{
    try{
        const users=await Users.find().select('-Password');
        console.log("users obtained",users);
        res.status(200).json({success:true,message:"Users list obtained",count:users.length,Users:users});
    }catch(error){
        console.error("An error occurred ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
})
router.get('/get-user',verifyToken,adminRole,async (req,res)=>{
    try{
        const userId=req.query.userId;
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid UserId format' });
          }
        const user=await Users.findById(userId).select('-Password');
        console.log("user obtained",user);
        res.status(200).json({success:true,message:"User obtained",User:user});
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
        const deletedTasks = await Task.deleteMany({ UserId: userId });
        console.log("User deleted successfully");
        res.status(200).json({
            success: true,
            message: "User and related tasks deleted successfully",
            Deleted_User: user,
            Deleted_Tasks_Count: deletedTasks.deletedCount
        });

    }catch(error){
        console.error("An error occurred ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
})

module.exports={AdminRoutes:router}