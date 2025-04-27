const mongoose=require('mongoose')
const path=require("path")
const dotenv=require('dotenv')
dotenv.config({path:path.resolve(__dirname,'../.env')})


const MongoDB_URL=process.env.MongoDB_URL
const connectDB=async ()=>{
    try{
        await mongoose.connect(MongoDB_URL);
    }catch(error){
        console.error('Error while connecting to database:', error.message);
        process.exit(1);
    }
}
module.exports={
    connectDB
}