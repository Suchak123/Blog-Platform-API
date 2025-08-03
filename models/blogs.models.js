import mongoose, { Schema } from "mongoose";
import { type } from "os";

const commentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxLength: [200, 'Title cannot exceed 200 characters']
        
    },
    description: {
        type: String,
        required: [ true, 'Description is required'],
        trim: true,
        maxLength: [500, 'Description cannot exceed 500 characters']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    comments: [commentSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    viewCount: {
        type: Number,
        default: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

blogSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

const Blog =  mongoose.model("Blog", blogSchema);
export default Blog;