import express from "express";
import { followUser, getAllUsers, login, register, updateProfile, userProfile, verify } from "../controller/auth.controller.js";
import { userProtectedRoute } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get('/verify', userProtectedRoute, verify)
router.get('/profile/:username', userProtectedRoute, userProfile)
router.get('/users', userProtectedRoute,getAllUsers)
router.put('/follow/:id', userProtectedRoute, followUser)
router.put('/update-profile', userProtectedRoute, updateProfile)
export default router