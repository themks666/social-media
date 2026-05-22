import { UserModel } from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({
        message: "All fields (username, email, password) are required",
        success: false,
      });
  }
  try {
    const emailExist = await UserModel.findOne({ email });
    if (emailExist) {
      return res
        .status(400)
        .json({ message: "Email is already registered", success: false });
    }
    const usernameExist = await UserModel.findOne({ username });
    if (usernameExist) {
      return res
        .status(400)
        .json({ message: "Username is already taken", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    return res
      .status(201)
      .json({
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
    return res
      .status(400)
      .json({
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
    return res
      .status(201)
      .json({
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
   // console.log("this is the verify user : ",req.user)
   return res.json({message: "verified", user: req.user})
  } catch (error) {
    console.error("Registration Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
