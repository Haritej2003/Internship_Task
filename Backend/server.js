const express=require('express')
const CORS=require('cors')
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const {connectDB}=require("./config/db.js")
const {AuthRoutes}=require("./controllers/authController.js")
const {UserRoutes}=require("./controllers/User.js")
const {AdminRoutes}=require("./controllers/Admin.js")
const { errorHandler } = require('./middlewares/errorHandler.js'); 
const path=require('path')
const PORT=process.env.PORT || 9000
const app=express()

app.use(CORS({
    origin: 'http://localhost:5174', 
    credentials: true
  }));
app.use(express.json())
app.use(helmet());

connectDB();

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many login attempts. Please try again later.",
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Documentation.html'));
  });
app.use("/auth",AuthRoutes)
app.use("/user",UserRoutes)
app.use("/admin",AdminRoutes)

app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

app.use(errorHandler);

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server running on PORT=${PORT}`)
})
