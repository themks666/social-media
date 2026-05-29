import express from "express";
import {  } from "../controller/auth.controller.js";
import { userProtectedRoute } from "../middleware/auth.middleware.js";
import { createPost, deletePosts, getAllPosts, updatePosts } from "../controller/post.contoller.js";
const router = express.Router();
router.post("/create-post", userProtectedRoute, createPost)
router.get("/get-all-post",getAllPosts)
router.delete("/post/:id",userProtectedRoute,deletePosts)
router.put("/post/:id",userProtectedRoute,updatePosts)
export default router