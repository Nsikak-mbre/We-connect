import jwt from "jsonwebtoken";
import User from "../models/user_model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    // console.log('all cookies:', token);
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - no Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('Decoded:', decoded.userId);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    // console.log('Queried user:', user);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized - No user found" });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
