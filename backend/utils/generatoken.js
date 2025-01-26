import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 1000, //ms
    httpOnly: true, // prevent xss site, cross site attacks
    sameSite: "strict", // csrf attacks cross site request forgery
    secure: process.env.NODE_ENV === "production" ? true : false, // https
  });
};

export default generateToken;
