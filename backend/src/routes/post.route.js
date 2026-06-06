import express from "express";
import {  } from "../controller/auth.controller.js";
import { userProtectedRoute } from "../middleware/auth.middleware.js";
import { createPost, deletePosts, getAllPosts, updatePosts,getUserPosts } from "../controller/post.contoller.js";
const router = express.Router();
router.post("/create-post", userProtectedRoute, createPost)
router.get("/get-all-post",getAllPosts)
router.delete("/:id",userProtectedRoute,deletePosts)
router.put("/:id",userProtectedRoute,updatePosts)
router.get("/user-posts",userProtectedRoute,getUserPosts)
export default router