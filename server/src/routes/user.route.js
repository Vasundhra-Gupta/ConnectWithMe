import express from "express";
export const userRouter = express.Router();
import {
    updateChannelDetails,
    updatePassword,
    updatePersonalDetails,
    deleteAccount,
    getChannelProfile,
    updateAvatar,
    updateCoverImage,
} from "../controllers/user.controller.js";
import {
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser,
    verifyEmail,
} from "../controllers/auth.controller.js";
import {
    verifyToken,
    optionalVerifyToken,
} from "../middlewares/authentication.js";
import { uploads } from "../middlewares/multer.js";

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
userRouter.route("/verify-email").post(verifyEmail);

userRouter.route("/login").post(loginUser);

userRouter
    .route("/channel/:channelId")
    .get(optionalVerifyToken, getChannelProfile);

userRouter.use(verifyToken);
userRouter.route("/current-user").get(getCurrentUser);
userRouter.route("/logout").post(logoutUser);
userRouter.route("/update-channel").patch(updateChannelDetails);
userRouter.route("/update-password").patch(updatePassword);
userRouter.route("/update-personal").patch(updatePersonalDetails);
userRouter.route("/delete-account").delete(deleteAccount);
userRouter
    .route("/update-avatar")
    .patch(uploads.single("avatar"), updateAvatar);
userRouter
    .route("/update-coverImage")
    .patch(uploads.single("coverImage"), updateCoverImage);
