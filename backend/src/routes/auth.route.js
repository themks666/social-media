import express from "express";
import { login, register, userProfile, verify } from "../controller/auth.controller.js";
import { userProtectedRoute } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get('/verify', userProtectedRoute, verify)
router.get('/profile/:username', userProtectedRoute, userProfile)
export default router