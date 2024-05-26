import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ status: false, message: "no token" });
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.json(err);
    }
};
