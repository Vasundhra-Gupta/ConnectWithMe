import express from "express";
export const userRouter = express.Router();
import {
    updateChannelDetails,
    updatePassword,
    updatePersonalDetails,
    deleteAccount,
    getChannelProfile,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/authentication.js";

userRouter.route("/channel/:channelId").get(getChannelProfile);

userRouter.use(verifyToken);

userRouter.route("/update-channel").patch(updateChannelDetails);
userRouter.route("/update-password").patch(updatePassword);
userRouter.route("/update-personal").patch(updatePersonalDetails);
userRouter.route("/delete-account").delete(deleteAccount);
