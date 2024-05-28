import express from "express";
import { signUp, login, getUsers, getUserById } from "../Controllers/authController.js";
import { verifyUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/SignUp", signUp);
router.post("/Login", login);


router.get("/verify", verifyUser, (req, res) => {
    return res.json({ status: true, user: req.user });
});

router.get('/users', getUsers);
router.get('/:id', getUserById);

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ status: true });
});


export default router;
