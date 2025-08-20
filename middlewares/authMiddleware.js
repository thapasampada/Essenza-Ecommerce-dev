import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';


//Protected routes token base

export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ success: false, message: "No token provided" });

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id);
    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    req.user = user; // attach full user object
    next();
  } catch (error) {
    console.error("Error in requireSignIn:", error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message || error,
      message: "Error in admin middleware",
    });
  }
};
