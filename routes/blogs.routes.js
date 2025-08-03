import { Router } from "express";
import BlogController from "../controllers/blogs.controllers.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { BlogValidation, validate } from "../middlewares/validation.js";


const router = Router();

router.get('/', BlogController.getAllBlogs);

router.post("/create-blog", requireSignIn, validate(BlogValidation.create), BlogController.createBlogController);

router.put("/edit-blog", requireSignIn, validate(BlogValidation.update), BlogController.updateBlogController);

//get blog by ID
router.get("/:id",requireSignIn, BlogController.getSingleBlogController)

//delete blog by ID
router.delete("/delete-blog/:id", requireSignIn, BlogController.deleteBlogController);


router.post("/:id/comments", validate(BlogValidation.comment), BlogController.addCommentToBlogController);

router.get("/:id/comments",requireSignIn, BlogController.getAllBlogs)

export default router;