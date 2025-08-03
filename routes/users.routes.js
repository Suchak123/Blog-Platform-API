import { Router } from "express";
import UserController from "../controllers/users.controllers.js";
import { validate, UserValidation, BlogValidation} from '../middlewares/validation.js'
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register",validate(UserValidation.register), UserController.registerController);

router.post("/login", validate(UserValidation.login), UserController.loginController);

router.get("/get-user", requireSignIn, UserController.getUserController);
// router.get("/get-one")
// router.delete("/delete-user");

export default router;