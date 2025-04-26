const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const path = require('path')
const mongoose = require('mongoose');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const generateToken = async (req, res) => {
    const { UserId,Role } = req.body;
    try {
        console.log(`User id=${UserId}   Role=${Role}`)
        const value = {
            UserId,Role
        }
        const token = jwt.sign(value, process.env.JWTPassword, { expiresIn: '1h' })
        res.status(200).json({
            success: true,
            message: "token is sent",
            token: token,
            Role
        })
    }
    catch (error) {
        console.log(error.message)
        res.status(404).json({ message: "error while adding user in token" })
    }
}


const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid token format' });
    }
    const tokenValue = token.split(' ')[1];
    console.log("tokenValue");
    try {
        const decoded = jwt.verify(tokenValue, process.env.JWTPassword);
        console.log(decoded);
        if (!mongoose.Types.ObjectId.isValid(decoded.UserId)) {
            return res.status(400).json({ message: 'Invalid UserId in token' });
        }

        const UserId = new mongoose.Types.ObjectId(decoded.UserId);
        req.body={...req.body,UserId,Role:decoded.Role}
        
        console.log("middleware completed")
        next();
    } catch (error) {
        console.error("An error occured",error.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
}
module.exports = {
    generateToken, verifyToken
}