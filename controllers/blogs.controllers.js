import express from "express";
import Blog from "../models/blogs.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getAllBlogs = async(req,res) => {
    try {
        const {
            page = 1,
            limit= 5,
            search,
            tags,
            author,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;

        let query = {};

        if(search) {
            query.$text = { $search: search};
        }

        if(tags) {
            const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
            query.tags = { $in: tagArray };
        }

        if(author){
            query.author = author;
        }

        const sortOptions = {}
        sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const blogs = await Blog.find(query)
        .populate('author', 'username email')
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-__v');

        const total = await Blog.countDocuments(query);

        res.json({
            blogs,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalBlogs: total,
                hasNext: skip + blogs.length < total,
                hasPrev: parseInt(page) > 1
            }
        });
    } catch (error) {
        throw res.status(500).json(new ApiError(500, {error: error.message}))
    }
}

const createBlogController = async (req, res) => {
    try {

         if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json(new ApiError(400, "No blog data provided"));
        }
        
        if (!req.user || !req.user._id) {
            return res.status(401).json(new ApiError(401, "User not authenticated"));
        }

        const { title, description, tags} = req.body;

        const blogData = {
            title,
            description,
            author: req.user._id,
            tags
        };

        console.log(blogData);

        const blog = new Blog(blogData);
        await blog.save();

        const populatedBlog = await Blog.findById(blog._id).populate('author', 'username email');

        return res.status(201).json(new ApiResponse(201, "Blog created successfully", {
            blog: populatedBlog
        }))
    } catch (error) {
        console.error('Error creating blog', error);
        throw new ApiError(500, {error: error.message});
    }
}

const getSingleBlogController = async (req,res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'username email')
        .select('-__v');

        if(!blog) {
            throw new ApiError(404, "Blog not found");
        }

        blog.viewCount += 1;
        await blog.save();

        res.json(blog);
    } catch (error) {
        throw new ApiError(400, "Unable to get blog ID", error);
    }
}

const updateBlogController = async (req,res) => {
    try {

        const { id } = req.params;

        const blog = await Blog.findById(id);

        if(!blog){
            throw new ApiError(404, 'Blog not found');
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: new Date()},
            { new: true}
        ).populate('author', 'username email');

        res.json({
            message: "Blog updated successfully",
            blog: updatedBlog
        })
    } catch (error) {
        throw new ApiError(500, error.message);
    }
}

const deleteBlogController = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if(!blog){
            throw new ApiError(404, 'Blog not found', null);
        }

        if(blog.author.toString() != req.user._id.toString()){
            throw new ApiError(403, 'Access denied', null);
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.json(new ApiResponse(200, 'Blog deleted successfully', {
            deletedBlog : blog
        }))
    } catch (error) {
        throw new ApiError(500, {error: error.message}, null)
    }
}

const addCommentToBlogController = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if(!blog){
            throw new ApiError(404, 'Blog not found', null);
        }

        blog.comments.push(req.body);
        await blog.save();

        res.status(201).json({
            message: 'Comment added successfully',
            comment: blog.comments[blog.comments.length - 1]
        });
    } catch (error) {
        throw new ApiError(500, {error: error.message });
    }

}

const getBlogComments = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).select('comments');
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ comments: blog.comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default{
    createBlogController, 
    getSingleBlogController, 
    updateBlogController,
    getAllBlogs,
    deleteBlogController,
    getBlogComments,
    addCommentToBlogController
}