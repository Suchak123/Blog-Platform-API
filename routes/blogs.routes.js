import { Router } from "express";
import BlogController from "../controllers/blogs.controllers.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { BlogValidation, validate } from "../middlewares/validation.js";


const router = Router();

//get all with pagination
router.get('/', BlogController.getAllBlogs);

//create blog
router.post("/create-blog", requireSignIn, validate(BlogValidation.create), BlogController.createBlogController);

//update blogs by id
router.put("/edit-blog/:id", requireSignIn, validate(BlogValidation.update), BlogController.updateBlogController);

//get blog by ID
router.get("/:id",requireSignIn, BlogController.getSingleBlogController)

//delete blog by ID
router.delete("/delete-blog/:id", requireSignIn, BlogController.deleteBlogController);

//post comment 
router.post("/:id/comments", validate(BlogValidation.comment), BlogController.addCommentToBlogController);

//get all comments in post
router.get("/:id/comments",requireSignIn, BlogController.getAllBlogs)

export default router;