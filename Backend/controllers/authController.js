const express=require('express')
const router=express.Router()
const path=require('path')
const bcrypt=require('bcrypt')
const _ = require('lodash')
const validator = require('validator');
const {Users}=require("../models/User.js")
const {generateToken}=require("../middlewares/authMiddlewares.js");

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


router.post('/signup',async (req,res,next)=>{
        try{
       
        let { Name, Email, Password,Role } = req.body
        Name = _.trim(Name);
        Email = _.trim(Email);
        Role = _.trim(Role);
        if (_.isEmpty(Name) || _.isEmpty(Email) || _.isEmpty(Password) || _.isEmpty(Role)) {
            return res.status(400).json({ message: "All fields are required." });
        }
        if (!/^[A-Za-z\s]+$/.test(Name)) {
            return res.status(400).json({ message: "Name must contain only letters and spaces." });
        }
        if (!validator.isEmail(Email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }
        if (!_.isString(Password) || Password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters." });
        }
        if(Role!=="user" &&  Role!=="admin"){
            return res.status(400).json({ message: "Role should be either admin or user only" });
        }

        const isUserExist = await Users.findOne({ Email })
        if (isUserExist) {
            res.status(401).json({ message: "Looks like you have already registered. Please Login" })
            return;
        }
        const saltRounds = parseInt(process.env.SaltRounds, 10);
        if (isNaN(saltRounds)) {
            throw new Error("SaltRounds must be a valid number");
        }
        const salt = await bcrypt.genSalt(parseInt(saltRounds,10))
        const hashedpassword =await  bcrypt.hash(Password, salt);
        const user = new Users({
            Name, Email, Password: hashedpassword,Role
        })
        const result = await user.save();
        req.body.UserId=result._id;
        req.body.Role=result.Role;
      
        next()
    }catch(error){
        console.error("An error occured ",error.message);
        res.status(500).json({message:"Interal Server Error"})
    }
},generateToken)




router.post('/login',async (req,res,next)=>{
    let {Email,Password}=req.body 
    try{
        Email = _.trim(Email);
        Password = _.trim(Password);
        if (_.isEmpty(Email) || _.isEmpty(Password)) {
            return res.status(400).json({ message: "All fields are required." });
        }
        if (!validator.isEmail(Email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }
        if (!_.isString(Password) || Password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters." });
        }

        const user = await Users.findOne({ Email })
        if (!user) {
            res.status(404).json({ message: "user does not exists" })
            return;
        }
        const HashedPassword = user.Password;
        bcrypt.compare(Password, HashedPassword, (err, result) => {
            if (err) {
                res.status(403).json({ message: "error while verifying user" })
                return;
            }
            if (result) {
                req.body.UserId=user._id;
                req.body.Role=user.Role;
                req.body.Name=user.Name;
                next();
            } else {
                res.status(403).json({ message: "Invalid password" });
                return;
            }
        })
    }catch(error){
        console.error("An error occured ",error.message);
        res.status(500).json({message:"Interal Server Error"})
    }
},generateToken)

module.exports={AuthRoutes:router}
