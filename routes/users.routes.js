import { Router } from "express";
import UserController from "../controllers/users.controllers.js";

const router = Router();

router.post("/register", UserController.registerController);
router.put("/login", UserController.loginController);
router.get("/get-user", UserController.getUsersController);
// router.get("/get-one")
// router.delete("/delete-user");

export default router;