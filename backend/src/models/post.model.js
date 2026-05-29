import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    tags: [{ type: String, lowercase: true, trim: true }],
    image: {
      type: String,
      default: "",
    },
    isVerified:{
      type: Boolean,
      default:false
    },
    caption: {
      type: String,
      required: [true, "Captions are needed"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    
  },
  { timestamps: true },
);

postSchema.index({ createdAt: -1 });
export const PostModel = mongoose.model("Post", postSchema);
