import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./authRoutes/auth_routes.js";
import messageRoutes from "./messageRoutes/message_routes.js";
import userRoutes from "./userRoutes/user_routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// app.get("/", (req, res) => {
//   // root route
//   res.send("Hello World!");
// });

app.use(express.json()); // parse from req.body
app.use(cookieParser()); // parse cookies

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
