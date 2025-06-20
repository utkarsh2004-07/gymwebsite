import express from "express";
import otpgenerate from "otp-generator"
import bcrypt from "bcrypt"
import User from "../Schema/User.Schema.js";
import { sendMail } from '../utils/mailsender.js';
import donenv from "dotenv"
import jwt from 'jsonwebtoken';
import CustomError from "../utils/CustomeError.js";
import UserSchema from "../Schema/User.Schema.js";

donenv.config()

export const Signup = async (req, res) => {
    const { email, name, password, confirmPassword, contactNumber, role } = req.body;
    if (!email || !password || !name || !confirmPassword || !contactNumber) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "confirm password doent match" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }


        //first method
        // const otp = Math.floor(100000 + Math.random() * 900000).toString();
        //second one
        const otp = otpgenerate.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
        const otpExpiry = Date.now() + 2 * 60 * 1000;

        const newUser = new User({ name, email, password, otp, otpExpiry, confirmPassword, contactNumber, role });


        const emailSubject = "OTP Verification";
        const emailText = `Hello ${name},\n\nYour OTP for verification is ${otp}. It is valid for 2 minutes.\n\nBest regards,\nGym Team`;

        await sendMail(email, emailSubject, emailText);
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully. Please verify your email.', userId: newUser._id, name, email, contactNumber });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const verifyOtp = async (req, res) => {
    const { userId, otp } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
        user.verify = true
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        // const token = jwt.sign({ userId: user._id }, "utkarshsingh", { expiresIn: '1h' });
        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new CustomError("Please provide all fields", 400);
        }

        const user = await UserSchema.findOne({ email });
        if (!user) {
            throw new CustomError("User doesn't exist", 400);
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ email, id: user._id, role: user.role }, "utkarsh", {
                expiresIn: "2h",
            });

            // res.cookie("token", token, {
            //     httpOnly: true,
            //     secure: false, // Ensure secure is set to false for development (true for production with HTTPS)
            //     sameSite: "Strict", // Helps with CSRF protection
            //     maxAge: 2 * 60 * 60 * 1000, // Set cookie expiry time to 2 hours
            // });
            // console.log("Setting token cookie:", token);
            res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None", 
   
});


            res.status(200).json({
                message: "Login Successful",
                token,
                user,
                userId: user._id,
                joindate: user.joinDate
            });
        } else {
            return res.status(401).json({
                message: "username or password was incorrect "
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};


export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        // const token = res.cookie(null)
        res.status(200).json({
            message: "logout Successfull"
        })

    } catch (error) {
        res.status(400).json({
            message: "Something went wrong"
        })
    }
}

