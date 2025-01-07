import {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    SERVER_ERROR,
} from "../constants/errorCodes.js";
import { User } from "../models/User.model.js";
import { getUser } from "../../utils/functions.js";
import { generateToken } from "../../utils/authentication.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { COOKIE_OPTIONS } from "../constants/cookie.js";

const registerUser = async (req, res) => {
    try {
        const { userName, firstName, lastName, password, gender, email } =
            req.body;

        //empty field checks //pending optimised
        if (!userName || !lastName || !gender || !email || !password) {
            return res.status(BAD_REQUEST).json({ message: "missing fields" });
        }

        const existingUser = await getUser(userName);
        if (existingUser) {
            return res
                .status(BAD_REQUEST)
                .json({ message: "user already exists" });
        }

        const avatar = process.env.AVATAR_COMMON_URL;
        const userAvatar =
            gender.toLowerCase() === "male"
                ? avatar + `boy?${userName}`
                : gender.toLowerCase() === "female"
                  ? avatar + `girl?${userName}`
                  : "";

        const user = await User.create({
            user_id: uuid(),
            user_name: userName,
            first_name: firstName,
            last_name: lastName,
            user_password: password,
            user_avatar: userAvatar,
            user_gender: gender,
            user_email: email,
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
        const { searchinput, password } = req.body;
        if (!searchinput || !password) {
            return res.status(BAD_REQUEST).json({ message: "missing Fields" });
        }

        const user = await getUser(searchinput);
        if (!user) {
            return res.status(NOT_FOUND).json({
                message: "user with this email or username does not exist ",
            });
        }

        const isValid = await bcrypt.compareSync(password, user.user_password);
        if (!isValid) {
            return res
                .status(BAD_REQUEST)
                .json({ message: "wrong Credentials" });
        }
        //token fn generates a promise so frst let it resolve
        const token = await generateToken(user);

        await User.updateOne(
            { user_id: user.user_id },
            {
                $set: {
                    user_token: token,
                },
            }
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

const getAUser = async (req, res) => {
    try {
        const { searchinput } = req.body;
        if (!searchinput) {
            return res.status(BAD_REQUEST).json({ message: "missing fileds" });
        }
        const user = await getUser(searchinput);
        if (!user) {
            return res.status(NOT_FOUND).json({ message: "User not found" });
        }
        return res.status(OK).json(user);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            error: err.message,
            message: "something went wrong while getting the user",
        });
    }
};

export { registerUser, loginUser, logoutUser, getAUser };
