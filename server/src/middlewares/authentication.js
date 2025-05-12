import jwt from "jsonwebtoken";
import { getUser } from "../utils/functions.js";
import {
    BAD_REQUEST,
    SERVER_ERROR,
} from "../constants/errorCodes.js";
import { COOKIE_OPTIONS } from "../constants/cookie.js";

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(BAD_REQUEST).json({ message: "token missing" });
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!decodedToken) {
            return res.status(BAD_REQUEST).json({ message: "token invalid" });
        }

        const user = await getUser(decodedToken.userId);
        if (user) {
            req.user = user;
        } else {
            return res.json({
                message: "user with this decoded token id not found",
            });
        }

        next();
    } catch (err) {
        return res
            .status(SERVER_ERROR)
            .clearCookie("token", COOKIE_OPTIONS)
            .json({
                error: err.message,
                message: "something went wrong while verifying the token.",
            });
    }
};

const optionalVerifyToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return next(); // here return is important so that it doesnt execute furthur and return here only, next() at end might not need return, as nothing to execute furthur.
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!decodedToken) {
            return res.status(BAD_REQUEST).json({ message: "token invalid" });
        }

        const user = await getUser(decodedToken?.userId);

        if (user) {
            req.user = user;
        } else {
            return res.json({
                message: "user with this decoded token id not found",
            });
        }
        next();
    } catch (error) {
        return res
            .status(SERVER_ERROR)
            .clearCookie("token", COOKIE_OPTIONS)
            .json({
                error: error.message,
                message: "something went wrong while optionally verifying the token.",
            });
    }
};

export { verifyToken, optionalVerifyToken };
