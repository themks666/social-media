import { UserModel } from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  console.log("request incomming....");
  console.log(req.body);

  const { username, password, email } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields (username, email, password) are required",
      success: false,
    });
  }
  try {
    const emailExist = await UserModel.findOne({ email });
    console.log("User already exist");
    if (emailExist) {
      return res
        .status(400)
        .json({ message: "Email is already registered", success: false });
    }
    console.log("user has been registered");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();
    return res.status(201).json({
      message: "User has been registered successfully",
      success: true,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const login = async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields (email, password) are required",
      success: false,
    });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User do not exist", success: false });
    }
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    const result = generateToken(res, user._id);
    const { UserPassword = null, ...userWithoutPassword } = user._doc;
    return res.status(201).json({
      message: "User has been logged in successfully",
      success: true,
      userWithoutPassword,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const verify = async (req, res) => {
  try {
    return res.json({ message: "verified", user: req.user });
  } catch (error) {
    console.error("Registration Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const userProfile = async (req, res) => {
  try {
    console.log("data is loading");
    console.log(req.params);

    const { username } = req.params;
    console.log("this is username : ", username);
    if (!username) {
      return res
        .status(400)
        .json({ message: "User was not found", success: false });
    }
    const user = await UserModel.findOne({ username }).select("-password");
    console.log(user);

    if (!user) {
      return res
        .status(400)
        .json({ message: "User was not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "user profile has been loaded", user });
  } catch (error) {
    console.error("Registration Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password -followings");
    if (!users) {
      return res.status(400).json({ message: "No User is found " });
    }
    return res
      .status(200)
      .json({ message: "user profile has been loaded", users });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const followUser = (req, res) => {
  try {

    const currentUseraId = String(req.user._id);
    
    const targetUserId = req.params.id
    console.log(currentUseraId, targetUserId);
    
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
