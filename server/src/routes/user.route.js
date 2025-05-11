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
import { verifyToken } from "../middlewares/authentication.js";
import { uploads } from "../middlewares/multer.js";

userRouter.route("/channel/:channelId").get(getChannelProfile);

userRouter.use(verifyToken);

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
