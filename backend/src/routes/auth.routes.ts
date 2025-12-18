import express from "express";
const router = express.Router();
import {
  register,
  login,
  getCurrentUser,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

router.post("/register", register);
router.post("/login", login);

router.get('/me', authMiddleware, getCurrentUser)

export default router