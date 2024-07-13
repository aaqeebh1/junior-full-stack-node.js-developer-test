import express from "express";
import connectToDatabase from "./config/database.js";
import User from "./models/user.js";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/api/users", (req, res) => {
  res.json({});
});

app.post("/api/users/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();
    console.log(User.id);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
});

app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Login successful
    res.json({ message: "Login successful", userId: user.id });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
