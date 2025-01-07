import jwt from "jsonwebtoken";
import { getUser } from "./functions.js";
import { BAD_REQUEST, SERVER_ERROR } from "../src/constants/errorCodes.js";
import { COOKIE_OPTIONS } from "../src/constants/cookie.js";

const generateToken = async (user) => {
    return jwt.sign({ userId: user.user_id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRY_TIME,
    });
};

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
        }else{
            return res.json({message: "kuch to gdbd hai"})
        }

        next();
    } catch (err) {
        return res
            .status(SERVER_ERROR)
            .clearCookie('token', COOKIE_OPTIONS)
            .json({
                error: err.message,
                message: "some",
            });
    }
};

export { generateToken, verifyToken };
