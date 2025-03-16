import express from "express";
import {
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/authentication.js";
import { uploads } from "../middlewares/multer.js";
export const userRouter = express.Router();

userRouter.route("/register").post(
    uploads.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        },
    ]),
    registerUser
);

userRouter.route("/login").post(loginUser);

userRouter.use(verifyToken);
userRouter.route("/current-user").get(getCurrentUser);
userRouter.route("/logout").post(logoutUser);
