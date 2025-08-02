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
            return res.send({ message: "Name is required "});
        }
        if(!email){
            return res.send({ message: "Email is required "});
        }
        if(!password){
            return res.send({ message: "Password is required" });
        }
        const existingUser = await User.findOne({
            $or: [{email}, {username}]
        });
        if(existingUser) {
            throw new ApiError(400, "User already exists")
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({ username, email, password: hashedPassword})
        await user.save();

        const resUser = await User.findOne({_id: user.id }).select("-password")

        res.json(new ApiResponse(201, "User created", resUser))
    } catch (error) {
        console.log(`Error creating user. ${error}`)
    }
}

const loginController = async (req,res) => {
    try {
        const { email, password} = req.body;
        if(!email || !password) {
            throw new ApiError(404, "Invalid email or password")
        }

        const user = await User.findOne({ email });
        if(!user){
            throw new ApiError(401, "Email is not registered")
        }

        const match = await comparePassword(password, user.password);
        if(!match) {
            throw new ApiError(403, "Invalid email or password")
        }

        const token = JWT.sign({ _id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        return res.json(new ApiResponse(200, "Login Successful", {
            user: {
            _id: user._id,
            username: user.username,
            email: user.email
            },
            }
        )
        )

    } catch (error) {
        return res.json(new ApiResponse(500, "Error in user login", error));
    }
}

export const getUsersController = async (req, res) => {
  try {
    const users = await User.find({ username });

    res.json(new ApiResponse(200,users))
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.json(new ApiResponse(500, "Internal Server Error"))
  }
};

export default {
    registerController,
    loginController,
    getUsersController
}