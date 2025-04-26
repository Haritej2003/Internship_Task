const mongoose = require("mongoose")
const {isAlpha}=require('validator')

const TaskSchema=new mongoose.Schema({
    UserId:{
        
            type:mongoose.Schema.Types.ObjectId,
            ref:'Users'
        
    },
    Title:{type:String,required:true,
        validate:{
            validator:function(Title){
                return isAlpha(Title)
            }
        }
    },
    Description:{type:String,required:true},   
    CreatedAt: {
        type: Date,
        default:Date.now,
        
      },
      Status: {
        type: String,
        required: [true, 'Status is required'],
        enum: {
          values: ['Completed', 'Pending'],
          message: 'Status must be either "Completed" or "Pending"'
        }
      }

   
})
const Task=mongoose.model('Task',TaskSchema)
module.exports= {Task}
