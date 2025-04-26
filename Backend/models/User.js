const mongoose = require("mongoose")
const { isEmail,isAlpha}=require('validator')

const UserSchema=new mongoose.Schema({
    Name:{type:String,required:true,
        validate:{
            validator:function(Name){
                return isAlpha(Name)
            }
        }
    },
    Email:{type:String,required:true,
        validate:{
            validator:function(Email){
                return isEmail(Email)
            },
            message:props=>`${props.value} is not a valid email! `
        }
    },
   
    Password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
          validator: function (v) {
            return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?!.*\s).{8,}$/.test(v);
          },
          message: props => 'Password must be at least 8 characters long, include 1 uppercase letter, 1 number, 1 special character, and have no spaces.'
        }
      },
      Role: {
        type: String,
        required: [true, 'Role is required'],
        enum: {
          values: ['admin', 'user'],
          message: 'Role must be either "admin" or "user"'
        }
      }

   
})
const Users=mongoose.model('Users',UserSchema)
module.exports= {Users}
