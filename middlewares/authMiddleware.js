import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected routes: verify token
export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Attach the full user object without password
    const user = await userModel.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user; // now req.user contains user data without password
    next();
  } catch (error) {
    console.error("Error in requireSignIn:", error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Admin access check
export const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }
    if (req.user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    next();
  } catch (error) {
    console.error("Error in isAdmin:", error);
    res.status(500).json({
      success: false,
      error: error.message || error,
      message: "Error in admin middleware",
    });
  }
};
