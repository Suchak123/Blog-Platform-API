import express from "express";
import Blog from "../models/blogs.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


const createBlogController = async (req, res) => {
    try {
        const blogData = {
            ...req.body,
            author: req.user._id
        };

        const blog = new Blog(blogData);
        await blog.save();

        const populatedBlog = await Blog.findByID(blog._id).populate('author', 'username email');

        res.json(new ApiResponse(201, "Blog created successfully", {
            blog: populatedBlog
        }))
    } catch (error) {
        throw new ApiError(500, {error: error.message});
    }
}

const getSingleBlogController = async (req,res) => {
    try {
        const blog = await Blog.findByID(req.params.id).populate('author', 'username email')
        .select('-__v');

        if(!blog) {
            throw new ApiError(404, "Blog not found");
        }

        res.json(blog);
    } catch (error) {
        throw new ApiError(400, "Unable to get blog ID", error);
    }
}

const updateBlogController = async (req,res) => {
    try {
        const blog = await Blog.findByID(req.params.id);

        if(!blog){
            throw new ApiError(404, 'Blog not found');
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: new Date()},
        ).populate('author', 'username email');

        res.json({
            message: "Blog updated successfully",
            blog: updatedBlog
        })
    } catch (error) {
        throw new ApiError(500, error.message);
    }
}

export default{
    createBlogController, 
    getSingleBlogController, 
    updateBlogController
}