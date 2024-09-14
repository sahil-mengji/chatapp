import express from "express";
import {
	getUserInfo,
	Login,
	Logout,
	Signup,
} from "../controllers/auth.controllers.js";
import Auth from "../middleware/AuthMiddleware.js";

const authRouter = express.Router();

authRouter.post("/login", Login);
authRouter.post("/signup", Signup);
authRouter.post("/logout", Logout);
authRouter.get("/userinfo", Auth, getUserInfo);
export default authRouter;
