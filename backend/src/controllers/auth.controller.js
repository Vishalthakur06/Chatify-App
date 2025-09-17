import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).json({ messsage: "All feilds are required" });
    }
    if (password.length < 6) {
      res
        .status(400)
        .json({ messsage: "Password must be at least 6 characters" });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ messsage: "Invalid Email Format" });
    }

    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ messsage: "Email already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
        message: "User Created Successfully",
      });
    } else {
      res.status(400).json({ messsage: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ messsage: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  res.send("login Endpoint");
};
export const logout = async (req, res) => {
  res.send("logout Endpoint");
};
