import express from "express";
import { getUser, getAllUser, Register, Login, Logout, Update, Delete } from "../controllers/userLevel.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get('/user/:id', getUser);
router.get('/users', getAllUser);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout/:id', Logout);
router.delete('/delete/:id', Delete);
router.patch('/update/:id', Update);

export default router;