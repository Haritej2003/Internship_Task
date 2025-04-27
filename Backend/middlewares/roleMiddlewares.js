const dotenv=require('dotenv')
const path=require('path')
dotenv.config({path:path.resolve(__dirname,'../.env')});

const checkRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.body.Role) {
            return res.status(400).json({ message: 'Role is required' });
        }

        if (req.body.Role !== requiredRole) {
            return res.status(403).json({ message: `Access denied. ${requiredRole.charAt(0).toUpperCase() + requiredRole.slice(1)}s only.` });
        }

        next();
    };
}
const userRole = checkRole('user');
const adminRole = checkRole('admin');

module.exports={userRole,adminRole}