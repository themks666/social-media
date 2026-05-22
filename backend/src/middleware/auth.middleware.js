import jwt from "jsonwebtoken";
import { UserModel } from "../models/auth.model.js";

export const userProtectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log("token is not available");
      return res
        .status(401)
        .json({ message: "Token not found", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded) {
      return res.status(400).json({ message: "invalid token", success: false });
    }
    const decodedUser = await UserModel.findById(decoded.userId, {
      password: 0,
    });
    if (!decodedUser) {
      return res
        .status(401)
        .json({ message: "User session no longer exists", success: false });
    }
    req.user = decodedUser;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
