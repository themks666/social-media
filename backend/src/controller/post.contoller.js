import { PostModel } from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    const { imagePreview: image, captionText: caption } = req.body;
    const userId = req.user._id;
    if (!caption) {
      return res.status(400).json({ message: "Incomplete", success: false });
    }
    let extractedTags = [];
    if (caption) {
      const hashRegex = /#(\w+)/g;
      const matches = caption.match(hashRegex);
      if (matches) {
        extractedTags = matches.map((tag) =>
          tag.replace("#", "").toLowerCase().trim(),
        );
      }
    }
    const post = new PostModel({
      caption: caption,
      image: image,
      tags: extractedTags,
      author: userId,
    });
    await post.save();
    return res
      .status(200)
      .json({ message: "user profile has been loaded", post });
  } catch (error) {
    console.error("Error in creating the post", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await PostModel.find()
      .sort({ createdAt: -1 })
      .populate("author", "username profilePic")
      .lean();
    if (!allPosts) {
      return res
        .status(200)
        .json({ message: "No post available", success: true });
    }
    return res.status(200).json({
      message: "user profile has been loaded",
      post: allPosts,
      success: true,
    });
  } catch (error) {
    console.error("Error in creating the post", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const deletePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await PostModel.findByIdAndDelete(id);
    console.log("Post has been deleted");
    return res
      .status(200)
      .json({ message: "Post has been deleted", success: true });
  } catch (error) {
    console.error("Error in creating the post", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const updatePosts = async (req, res) => {
  try {
    return res.status(200).json({ message: "", success: true });
  } catch (error) {
    console.error("Error in creating the post", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const getUserPosts = async (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  console.log("requested route...");
  const posts = await PostModel.find({ author: userId })
    .populate("author", "profilePic username followers")
    .sort({ createdAt: -1 })
    .lean();
  if (!posts) {
    return res
      .status(200)
      .json({ message: "No post available", success: true });
  }
  console.log(posts);
  
  return res.status(200).json({
    message: "user posts has been loaded",
    posts,
    success: true,
  });

  try {
    return res.status(200).json({ message: "", success: true });
  } catch (error) {
    console.error("Error in creating the post", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
