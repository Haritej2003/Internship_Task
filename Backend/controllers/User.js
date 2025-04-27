const express=require('express')
const _ =require('lodash')
const mongoose=require('mongoose')
const {Task}=require('../models/Task.js')
const {verifyToken}=require('../middlewares/authMiddlewares.js')
const {userRole}=require('../middlewares/roleMiddlewares.js');
const router=express.Router()

router.post('/create-task',verifyToken,userRole,async (req,res)=>{
    
    try{
        let {Title,Description,Status}=req.body;
        Title = _.trim(Title);
        Description = _.trim(Description);
        Status =  _.trim(Status);
         if (_.isEmpty(Title) || _.isEmpty(Description) || _.isEmpty(Status)) {
            return res.status(400).json({ message: "All fields are required." });
        }
        if(Status!=='Pending' &&  Status!=='Completed'){
            return res.status(400).json({ message: "Status should be either Pending or Completed only" });
        }
        const UserId=req.body.UserId;
        const task=new Task({Title,Description,Status,UserId})
        await task.save();
        res.status(200).json({message:"Task created successfully",Created_Task:task});
    }catch(error){
        console.error("An error occurred",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
})
router.get('/get-tasks',verifyToken,userRole,async (req,res)=>{
    
    try{
        const UserId=req.body.UserId;
        if (!UserId || !mongoose.Types.ObjectId.isValid(UserId)) {
            return res.status(400).json({ message: 'Invalid UserId format' });
          }
        const task=await Task.find({UserId});
        res.status(200).json({message:"Tasks Sent Successfully",Tasks:task});
    }catch(error){
        console.error("An error occurred",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
})
router.get('/get-task',verifyToken,userRole,async (req,res)=>{
    
    try{
        const { UserId } = req.body;
        const TaskId=req.query.taskId;
        if (!UserId || !mongoose.Types.ObjectId.isValid(UserId)) {
            return res.status(400).json({ message: 'Invalid UserId format' });
        }
        if (!TaskId || !mongoose.Types.ObjectId.isValid(TaskId)) {
            return res.status(400).json({ message: 'Invalid TaskId format' });
        }
        const task = await Task.findOne({ _id: TaskId, UserId });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: "Task Sent Successfully", Task: task });
    }catch(error){
        console.error("An error occurred",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
})

router.put('/update-task',verifyToken,userRole,async (req,res)=>{
    try{
        
        const taskId=req.query.taskId;
        if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ message: 'Invalid Task Id format' });
        }
        let {Title,Description,Status}=req.body;
        Title = _.trim(Title);
        Description = _.trim(Description);
        Status = _.trim(Status);
         if (_.isEmpty(Title) || _.isEmpty(Description) || _.isEmpty(Status)) {
            return res.status(400).json({ message: "All fields are required." });
        }
        if(Status!=='Pending' && Status!=='Completed'){
            return res.status(400).json({ message: "Status should be either Pending or Completed only" });
        }

        const updatedTask=await Task.findByIdAndUpdate(taskId,{Title, Description,Status},{new:true})
        if(!updatedTask){
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ success: true,message: 'Task Updated Successfully' , Updated_Task: updatedTask });
    }catch(error){
        console.error("An error occurred",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
})

router.delete('/delete-task',verifyToken,userRole,async (req,res)=>{
    try{
        const taskId=req.query.taskId;
        if (!taskId || !mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ message: 'Invalid Task Id format' });
        }
        const existingTask=await Task.findByIdAndDelete(taskId);
        if(!existingTask){
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ success: true,message: 'Task deleted successfully', Deleted_Task: existingTask });
    }catch(error){
        console.error("An error occurred",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
})
module.exports={UserRoutes:router}
