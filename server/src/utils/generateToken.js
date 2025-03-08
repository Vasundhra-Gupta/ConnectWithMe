import jwt from "jsonwebtoken";

const generateToken = async (user) => {
    return jwt.sign({ userId: user.user_id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRY_TIME,
    });
};

export {generateToken}