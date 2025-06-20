import express from "express";
import UserSchema from "../Schema/User.Schema.js";
import { isAdmin } from "../middleware/AuthMiddleware.js";
import { auth } from "../middleware/AuthMiddleware.js";
const router = express.Router();

// Fetch all users
router.get('/users', auth, isAdmin, async (req, res) => {
  try {
    const users = await UserSchema.find({}).select('-password -confirmPassword'); // Exclude password and confirmPassword
    res.status(200).json({
        users: users
    });
  } catch (error) {
    res.status(404).json({
        message: "No users found"
    });
  }
});

// Fetch a specific user's details
router.get('/user/:id', auth, isAdmin, async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id).select('-password -confirmPassword'); // Exclude password and confirmPassword
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
        user: user
    });
  } catch (error) {
    res.status(500).json({
        message: "Error fetching user details"
    });
  }
});

export default router;
