import {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    SERVER_ERROR,
} from "../constants/errorCodes.js";
import { User } from "../models/User.model.js";
import fs from "fs"
import { getUser } from "../utils/functions.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { v4 as uuid } from "uuid";
import { COOKIE_OPTIONS } from "../constants/cookie.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

const getCurrentUser = async (req, res) => {
    return res.status(OK).json(req.user);
};

const registerUser = async (req, res) => {
    let coverImageURL, avatarURL;
    try {
        const { userName, firstName, lastName, email, password, contact } =
            req.body;
        const data = {
            userName,
            firstName,
            lastName,
            email,
            password,
            coverImage: req.files?.coverImage?.[0].path,
            avatar: req.files?.avatar?.[0].path,
            contact,
        };

        const allowedEmptyFields = ["lastName", "coverImage", "contact"];
        if (
            Object.entries(data).some(
                ([key, value]) => !value && !allowedEmptyFields.includes(key)
            )
        ) {
            if(data.avatar){
                fs.unlinkSync(data.avatar)
            }
            if(data.coverImage){
                fs.unlinkSync(data.coverImage);
            }
            return res.status(BAD_REQUEST).json({ message: "missing fields" });
        }

        const existingUser = await getUser(userName);
        if (existingUser) {
            if(data.avatar){
                fs.unlinkSync(data.avatar)
            }
            if(data.coverImage){
                fs.unlinkSync(data.coverImage);
            }
            return res
                .status(BAD_REQUEST)
                .json({ message: "user already exists" });
        }

        data.avatar = await uploadOnCloudinary(data.avatar);
        avatarURL = data.avatar;
        if(data.coverImage){
            data.coverImage = await uploadOnCloudinary(data.coverImage);
            coverImageURL = data.coverImage;
        }
        const user = await User.create({
            user_id: uuid(),
            user_name: userName,
            user_firstName: firstName,
            user_lastName: lastName,
            user_password: password,
            user_avatar: avatarURL,
            user_email: email,
            user_contact: contact,
            user_coverImage: coverImageURL,
            //token
        });
        await user.save();

        const { user_password, ...createdUser } = user.toObject();

        return res.status(OK).json(createdUser);
    } catch (err) {
        if(avatarURL){
            await deleteFromCloudinary(avatarURL)
        }
        if(coverImageURL){
            await deleteFromCloudinary(coverImageURL)
        }
        return res.status(SERVER_ERROR).json({
            message: "Something went wrong while registering user",
            error: err.message,
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

export { getCurrentUser, registerUser, loginUser, logoutUser };
