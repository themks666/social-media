import { create } from "zustand";
import { axiosInstance } from "../libs/axiosInstance";
import type { PostState } from "../types/types";

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  isFetchingPosts: true,
  getPost: async () => {
    try {
      set({ isFetchingPosts: true });
      const response = await axiosInstance.get("/post/get-all-post");
      set({ posts: response.data.post });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isFetchingPosts: false });
    }
  },
  addComment:(postId, comment)=>{
    console.log(postId, comment)
  },
  addPost: ()=>{
    
  }
}));
