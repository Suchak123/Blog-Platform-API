import mongoose, { Schema } from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxLength: [30, 'Usernmame cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true, 
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;