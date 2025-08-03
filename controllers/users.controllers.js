import express from "express";
import User from "../models/users.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";


const registerController = async (req,res) => {
    try {
        const { username, email, password } = req.body;

        if(!username){
            throw new ApiError(400, "Username is required");

        }
        if(!email){
            throw new ApiError(400, "Username is required");

        }
        if(!password){
            throw new ApiError(400, "Username is required");

        }
        const existingUser = await User.findOne({
            $or: [{email: email.toLowerCase()}, {username: username.toLowerCase() }]
        });

        if (existingUser) {
            if (existingUser.email === email.toLowerCase()) {
                throw new ApiError(409, "Email is already registered");
            }
            if (existingUser.username === username.toLowerCase()) {
                throw new ApiError(409, "Username is already taken");
            }
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({ username: username, email: email, password: hashedPassword})

        const resUser = await User.findOne({_id: user.id }).select("-password")

        return res.status(201).json(new ApiResponse(201, "User created", {user: resUser}))
    } catch (error) {
        console.log(`Error creating user. ${error}`)
    }
}

const loginController = async (req,res) => {
    try {
        const { email, password} = req.body;
        if(!email || !password) {
            throw new ApiError(400, "Email and password are required");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ApiError(400, "Please provide a valid email address");
        }

        const user = await User.findOne({ email });
        if(!user){
            throw new ApiError(401, "Invalid email or password");
        }

        const match = await comparePassword(password, user.password);

        if(!match) {
            throw new ApiError(401, "Invalid email or password")
        }

        const token = JWT.sign({ _id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        return res.status(200).json(new ApiResponse(200, "Login Successful", {
            user: {
            _id: user._id,
            username: user.username,
            email: user.email
            },
            token: token}
        )
        );

    } catch (error) {

        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal server error";
        return res.status(statusCode).json(new ApiResponse(statusCode, message, null));
    }
};

export const getUserController = async (req, res) => {
  res.json(new ApiResponse(200, "Logged in User Detail", {
    user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
    }
  } ))
};

export default {
    registerController,
    loginController,
    getUserController
}