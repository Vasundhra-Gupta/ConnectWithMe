import fs from "fs";
import bcryptjs from "bcryptjs";
import { v4 as uuid } from "uuid";
import { User } from "../models/User.model.js";
import {
    BAD_REQUEST,
    FORBIDDEN,
    NOT_FOUND,
    OK,
    SERVER_ERROR,
} from "../constants/errorCodes.js";
import { generateToken } from "../utils/generateToken.js";
import { getUser } from "../utils/functions.js";
import { COOKIE_OPTIONS } from "../constants/cookie.js";
import {
    deleteFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { sendRegisterationMail } from "../utils/sendMail.js";
import { Verification } from "../models/Verification.model.js";

const getCurrentUser = async (req, res) => {
    return res.status(OK).json(req.user);
};

const registerUser = async (req, res) => {
    let coverImageURL, avatarURL;
    try {
        const { userName, fullName, email, password } = req.body;
        const data = {
            userName,
            fullName,
            email,
            password,
            avatar: req.files?.avatar?.[0].path,
        };
        console.log(data.avatar);

        if (Object.entries(data).some(([key, value]) => !value)) {
            if (data.avatar) {
                fs.unlinkSync(data.avatar);
            }
            return res.status(BAD_REQUEST).json({ message: "missing fields" });
        }

        const existingUserByUserName = await getUser(userName);
        const existingUserByEmail = await getUser(email);
        if (existingUserByUserName|| existingUserByEmail) {
            if (data.avatar) {
                fs.unlinkSync(data.avatar);
            }
            return res
                .status(BAD_REQUEST)
                .json({ message: "user with this email or username already exists" });
        }

        data.avatar = await uploadOnCloudinary(data.avatar);
        avatarURL = data.avatar;
        
        const user = await User.create({
            user_id: uuid(),
            user_name: userName,
            user_fullName: fullName,
            user_password: password,
            user_avatar: avatarURL,
            user_email: email,
            //token
        });
        await user.save();
        const code = sendRegisterationMail(email, userName);
        await Verification.create({
            user_email: email,
            user_code: code,
        });
        const { user_password, ...createdUser } = user.toObject();

        return res.status(OK).json(createdUser);
    } catch (err) {
        if (avatarURL) {
            await deleteFromCloudinary(avatarURL);
        }
        if (coverImageURL) {
            await deleteFromCloudinary(coverImageURL);
        }
        return res.status(SERVER_ERROR).json({
            message: "Something went wrong while registering user",
            error: err.message,
        });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body;
        if (!email || !code) {
            return res
                .status(BAD_REQUEST)
                .json({ message: "email and code are required" });
        }
        const verification = await Verification.findOne({
            user_email: email,
        });
        if (!verification) {
            return res
                .status(BAD_REQUEST)
                .json({ message: "issue in email verify" });
        }

        const user = await getUser(email);
        if (!user) {
            return res.status(NOT_FOUND).json({ message: "user not found" });
        }
        if (user?.user_isVerified) {
            return res
                .status(BAD_REQUEST)
                .json({ message: "email already verified" });
        }
        if (code !== verification?.user_code) {
            return res.status(BAD_REQUEST).json({ message: "invalid code" });
        }
        if (Date.now() > verification?.user_expiry) {
            return res.status(BAD_REQUEST).json({ message: "expired code" });
        }
        await User.updateOne(
            {
                user_email: email,
            },
            {
                $set: {
                    user_isVerified: true,
                },
            },
            { new: true }
        );
        return res.status(OK).json({ message: "email verified sucessfully" });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            message: "something went wrong while verifying email",
            error: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { searchInput, password } = req.body;
        if (!searchInput || !password) {
            return res.status(BAD_REQUEST).json({ message: "missing Fields" });
        }

        const user = await getUser(searchInput);
        if (!user) {
            return res.status(NOT_FOUND).json({
                message: "user does not exist ",
            });
        }

        const isValid = bcryptjs.compareSync(password, user.user_password);
        if (!isValid) {
            return res
                .status(BAD_REQUEST)
                .json({ message: "wrong credentials" });
        }

        if (!user.user_isVerified) {
            return res.status(FORBIDDEN).json({
                message: "please verify your email before logging in.",
            });
        }
        //token fn generates a promise so frst let it resolve
        const token = await generateToken(user);

        await User.updateOne(
            { user_id: user.user_id },
            {
                $set: {
                    user_token: token,
                },
            },
            { new: true }
        );
        const { user_token, user_password, ...loggedinUser } = user;
        return res
            .status(OK)
            .cookie("token", token, {
                ...COOKIE_OPTIONS,
                maxAge: process.env.TOKEN_MAXAGE,
            })
            .json(loggedinUser); // frst cookie will be sent!!(bcz .json(data) is the final response)
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            error: err.message,
            message: "something went wrong while logging in the user",
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        await User.updateOne(
            { user_id: req.user?.user_id },
            {
                $set: {
                    user_token: "",
                },
            },
            {
                new: true,
            }
        );

        return res
            .status(OK)
            .clearCookie("token", COOKIE_OPTIONS)
            .json({ message: "user logged out successfully" });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            error: err.message,
            message: "something went wrong while logging out the user",
        });
    }
};

export { getCurrentUser, registerUser, verifyEmail, loginUser, logoutUser };
