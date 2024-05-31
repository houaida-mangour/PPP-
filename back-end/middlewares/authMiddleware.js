import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyUser = async (req, res, next) => {
    
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "No token found" });
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token expired" });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token" });
        } else {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
};