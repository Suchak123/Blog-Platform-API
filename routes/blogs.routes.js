import { Router } from "express";
import BlogController from "../controllers/blogs.controllers.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";


const router = Router();

router.post("/create-blog", requireSignIn, BlogController.createBlogController);
router.put("/edit-blog", requireSignIn, BlogController.updateBlogController);
// router.get("/all-blogs", );
router.get("/:id", requireSignIn, BlogController.getSingleBlogController)
// router.delete("/delete-blog");

export default router;