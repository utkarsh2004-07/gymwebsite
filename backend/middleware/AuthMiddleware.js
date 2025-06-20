import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import UserSchema from "../Schema/User.Schema.js";
const { ObjectId } = mongoose.Types;

// import CustomError from "../utils/CustomeError.js";

// import UserSchema from './models/UserSchema'; // Ensure you have the correct path to your User schema

export const auth = async (req, res, next) => {
    try {
        // Retrieve token from cookies or Authorization header
        const token =
            req.cookies?.token || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));

        if (!token) {
            return res.status(401).json({
                message: "Token is missing"
            });
        }

        try {
            // Verify the token and decode the payload
            const decoded = jwt.verify(token, "utkarsh");  // Use environment variable for the secret key
            console.log("Decoded JWT token:", decoded);  // Log the decoded token
            req.user = { id: decoded.id };
            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            console.error("Token verification error:", error);
            return res.status(401).json({
                message: "Token is invalid"
            });
        }
    } catch (error) {
        console.error("Authentication middleware error:", error);
        return res.status(500).json({
            message: "Something went wrong during authentication"
        });
    }
};






export const isAdmin = async (req, res, next) => {
    try {
        const user = await UserSchema.findById(new ObjectId(req.user.id));

        console.log("User fetched from DB:", user); // Log the user object

        if (user?.isAdmin !== true) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin only route."
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
