import express from "express";
export const userRouter = express.Router();
import {
    updateChanneltDetails,
    updatePassword,
    updatePersonalDetails,
    deleteAccount,
} from "../controllers/user.controller.js";

userRouter.route("/update-channel").patch(updateChanneltDetails);
userRouter.route("/update-password").patch(updatePassword);
userRouter.route("/update-personal").patch(updatePersonalDetails);
userRouter.route("/delete-account").delete(deleteAccount);
