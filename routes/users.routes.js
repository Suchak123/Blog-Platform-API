import { Router } from "express";
import UserController from "../controllers/users.controllers.js";
import { validate, UserValidation, BlogValidation} from '../middlewares/validation.js'
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = Router();

//register user
router.post("/register",validate(UserValidation.register), UserController.registerController);

//login user
router.post("/login", validate(UserValidation.login), UserController.loginController);

//get user
router.get("/get-user", requireSignIn, UserController.getUserController);

export default router;