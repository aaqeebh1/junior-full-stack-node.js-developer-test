import express from "express";
import connectToDatabase from "./config/database.js";
import User from "./models/user.js";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// JWT secret key
const JWT_SECRET = "eU20uBIrn0feQr1kYbHV6h8hLEvc70mS";

// Generate JWT token
const generateToken = (email) => {
  const token = jwt.sign({ email }, JWT_SECRET);
  return token;
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Register user
app.post("/api/users/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      // Create new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        password, // This will be hashed by the pre-save hook
      });

      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    }    
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

    // Generate JWT token
    const token = generateToken(email);

    // Login successful
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }

});

// Protected route example
app.get("/api/users/profile", verifyToken, async (req, res) => {
  try {
    // Access the user's email from the decoded token
    const email = req.userEmail;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

 
    res.json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting user profile", error: error.message });
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