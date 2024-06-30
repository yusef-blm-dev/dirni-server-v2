import express from "express";
const router = express.Router();
import {
  login,
  register,
  refresh,
  logout,
} from "../controllers/authController.js";
import { loginLimiter } from "../middleware/loginLimiter.js";
router.post("/login", loginLimiter, login);
router.post("/register", register);
router.get("/refresh", refresh);
router.post("/logout", logout);
export default router;
