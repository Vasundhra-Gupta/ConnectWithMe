import {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    SERVER_ERROR,
} from "../constants/errorCodes.js";
import { User } from "../models/User.model.js";
import { getUser } from "../utils/functions.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { v4 as uuid } from "uuid";
import { COOKIE_OPTIONS } from "../constants/cookie.js";

const registerUser = async (req, res) => {
    try {
        const {
            userName,
            firstName,
            lastName,
            email,
            password,
            coverImage,
            avatar,
            contact,
        } = req.body;

        const data = {
            userName,
            firstName,
            lastName,
            email,
            password,
            coverImage,
            avatar,
            contact,
        };

        const allowedEmptyFields = ["lastName", "coverImage", "contact"];
        if (
            Object.entries(data).some(
                ([key, value]) =>
                    !value &&
                    !allowedEmptyFields.includes(key)
            )
        ) {
            return res.status(BAD_REQUEST).json({ message: "missing fields" });
        }

        const existingUser = await getUser(userName);
        if (existingUser) {
            return res
                .status(BAD_REQUEST)
                .json({ message: "user already exists" });
        }

        // const avatar = process.env.AVATAR_COMMON_URL;
        // const userAvatar =
        //     gender.toLowerCase() === "male"
        //         ? avatar + `boy?${userName}`
        //         : gender.toLowerCase() === "female"
        //           ? avatar + `girl?${userName}`
        //           : "";

        //image handling
        const user = await User.create({
            user_id: uuid(),
            user_name: userName,
            user_firstName: firstName,
            user_lastName: lastName,
            user_password: password,
            user_avatar: avatar,
            user_email: email,
            user_contact: contact,
            user_coverImage: coverImage,
            //token
        });
        await user.save();

        const { user_password, ...createdUser } = user.toObject();

        return res.status(OK).json(createdUser);
    } catch (err) {
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

        const isValid = bcrypt.compareSync(password, user.user_password);
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

export { registerUser, loginUser, logoutUser };
