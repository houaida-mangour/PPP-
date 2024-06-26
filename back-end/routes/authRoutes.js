import express from "express";
import { signUp, login, getUsers, getUserById, logout, updateUser } from "../Controllers/authController.js";
import { verifyUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/SignUp", signUp);
router.post("/Login", login);
router.post('/logout', logout);



router.get("/verify", verifyUser, (req, res) => {
    return res.json({ status: true, user: req.user });
});


router.get('/', getUsers);
router.get('/users', getUsers);
router.get('/:id', getUserById);
router.put('/update/:id', updateUser);


export default router;
