import express from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/authentication.js";
export const userRouter = express.Router();

// userRouter.route("/").get(async (req, res) => {
//     res.send("Hello");
// });
userRouter.route("/register").post(registerUser);

userRouter.route("/login").post(loginUser);

userRouter.use(verifyToken);
userRouter.route("/current-user").get(getCurrentUser)
userRouter.route("/logout").post(logoutUser);
