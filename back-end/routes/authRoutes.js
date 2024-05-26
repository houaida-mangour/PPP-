import express from "express";
import { signUp, login } from "../Controllers/authController.js";
import { verifyUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/SignUp", signUp);
router.post("/Login", login);

// Ajoutez ici les autres routes, comme forgot-password, reset-password, etc.

router.get("/verify", verifyUser, (req, res) => {
    return res.json({ status: true, user: req.user });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ status: true });
});

export default router;
