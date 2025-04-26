const mongoose = require("mongoose")
const {isAlphanumeric}=require('validator')

const TaskSchema=new mongoose.Schema({
    UserId:{
        
            type:mongoose.Schema.Types.ObjectId,
            ref:'Users',
            required:true
    },
    Title:{
      type:String,
      required:true,
        validate:{
            validator:function(Title){
                return isAlphanumeric(Title.replace(/\s+/g, ''))
            }
        },
        message: 'Title can only contain letters, numbers, and spaces.'
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
TaskSchema.index({ UserId: 1 });
const Task=mongoose.model('Task',TaskSchema)
module.exports= {Task}
