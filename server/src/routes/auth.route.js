import express from "express";
import {
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/authentication.js";
import { uploads } from "../middlewares/multer.js";
export const authRouter = express.Router();

authRouter.route("/register").post(
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

authRouter.route("/login").post(loginUser);

authRouter.use(verifyToken);
authRouter.route("/current-user").get(getCurrentUser);
authRouter.route("/logout").post(logoutUser);
