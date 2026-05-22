import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "you haven't provided any username"],
      minLength: 3,
    },
    image:{
      type:String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "you haven't provided any email"],
    },
    password: {
      type: String,
      required: [true, "you haven't provided any password"],
      minLength: 6,
    },
    avatar: {
      type: String,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

export const UserModel = mongoose.model("User", userSchema);
