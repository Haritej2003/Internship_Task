const express=require('express')
const dotenv=require('dotenv')
const CORS=require('cors')
const app=express()
const {connectDB}=require("./config/db.js")
const {AuthRoutes}=require("./controllers/authController.js")
const {UserRoutes}=require("./controllers/User.js")
const {AdminRoutes}=require("./controllers/Admin.js")
const Admin = require('./controllers/Admin.js')
app.use(CORS())
app.use(express.json())
const PORT=process.env.PORT || 5000
connectDB();
app.use("/auth",AuthRoutes)
app.use("/user",UserRoutes)
app.use("/admin",AdminRoutes)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' });
});
app.listen(PORT,()=>{
    console.log(`connected to PORT=${PORT}`)
})
