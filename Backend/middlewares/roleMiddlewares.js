const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const path=require('path')
dotenv.config({path:path.resolve(__dirname,'../.env')});

const userRole=async (req,res,next)=>{
    console.log("user role",req.body.Role)
    if (!req.body.Role || req.body.Role !== 'user') {
        return res.status(403).json({ message: 'Access denied. Users only.' });
    }
    next();
}
const adminRole=async (req,res,next)=>{
    console.log(req.body.Role)
    if (!req.body.Role || req.body.Role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
}
module.exports={userRole,adminRole}