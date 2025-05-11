import bcryptjs from "bcryptjs";
import {
    OK,
    BAD_REQUEST,
    SERVER_ERROR,
    NOT_FOUND,
} from "../constants/errorCodes.js";
import { User } from "../models/User.model.js";
import {
    deleteFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { getUser } from "../utils/functions.js";

const updateChannelDetails = async (req, res) => {
    const user = req.user;
    try {
        const { userName, bio, password } = req.body;
        if (user.user_bio == bio && user.user_name == userName) {
            return res.status(BAD_REQUEST).json({
                message:
                    "Please enter new details for updating channel details",
            });
        }

        const isValid = bcryptjs.compareSync(password, user.user_password);
        if (!isValid) {
            return res.status(BAD_REQUEST).json({
                message: "wrong password",
            });
        }
        await User.updateOne(
            {
                user_id: user.user_id,
            },
            {
                $set: {
                    user_name: userName,
                    user_bio: bio,
                },
            },
            { $new: true }
        );

        return res.status(OK).json({
            message: "channel details updated successfully",
        });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            error: error.message,
            message: "something went wrong while updating channel details",
        });
    }
};

const getChannelProfile = async (req, res) => {
    try {
        const { channelId } = req.params;
        if (!channelId) {
            return res.status(NOT_FOUND).json({
                message: "channelId not found",
            });
        }
        const channel = await getUser(channelId);
        return res.status(OK).json(channel);
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            message: "something went wrong while getting channel profile.",
            errror: error.message,
        });
    }
};

const updatePersonalDetails = async (req, res) => {
    try {
        const user = req.user;
        const { firstName, lastName, email, password } = req.body;
        if (
            user.user_firstName == firstName &&
            user.lastName !== "" &&
            user.lastName == lastName &&
            user.user_email == email
        ) {
            return res.status(BAD_REQUEST).json({
                message:
                    "Please enter new details for updating personal details",
            });
        }
        const isValid = bcryptjs.compareSync(password, user.user_password);
        if (!isValid) {
            return res.status(BAD_REQUEST).json({
                message: "wrong password",
            });
        }
        await User.updateOne(
            {
                user_id: user.user_id,
            },
            {
                $set: {
                    user_email: email,
                    user_firstName: firstName,
                    user_lastName: lastName,
                },
            },
            { $new: true }
        );

        return res.status(OK).json({
            message: "personal details updated successfully",
        });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            error: error.message,
            message: "something went wrong while updating personal details",
        });
    }
};

const updatePassword = async (req, res) => {
    try {
        const user = req.user;
        const { oldPassword, newPassword } = req.body;
        const isValid = bcryptjs.compareSync(oldPassword, user.user_password);
        if (!isValid) {
            return res.status(BAD_REQUEST).json({
                message: "wrong password",
            });
        }
        if (bcryptjs.compareSync(newPassword, user.user_password)) {
            return res.status(BAD_REQUEST).json({
                message: "Please enter a new password to update old one.",
            });
        }

        const updatedUser = await User.findOne({
            user_id: user.user_id,
        });

        updatedUser.user_password = newPassword;

        await updatedUser.save(); //to use pre hook for hashing

        return res.status(OK).json({
            message: "password updated successfully",
        });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            error: error.message,
            message: "something went wrong while updating channel details",
        });
    }
};

const updateAvatar = async (req, res) => {
    try {
        const avatar = req.file.path;
        if (!avatar) {
            return res.status(BAD_REQUEST).json({ message: "missing fields" });
        }
        const avatarURL = await uploadOnCloudinary(avatar);
        await User.updateOne(
            {
                user_id: req.user?.user_id,
            },
            {
                $set: {
                    user_avatar: avatarURL,
                },
            },
            {
                $new: true,
            }
        );
        return res.status(OK).json({
            message: "avatar updated successfully",
        });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: "something went wrong while updating avatar",
            error: err.message,
        });
    }
};

const updateCoverImage = async (req, res) => {
    try {
        const coverImage = req.file.path;
        if (!coverImage) {
            return res.status(BAD_REQUEST).json({ message: "missing fields" });
        }

        const coverImageURL = await uploadOnCloudinary(coverImage);

        await User.updateOne(
            {
                user_id: req.user?.user_id,
            },
            {
                $set: {
                    user_coverImage: coverImageURL,
                },
            },
            {
                $new: true,
            }
        );
        return res.status(OK).json({
            message: "coverImage updated successfully",
        });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            message: "something went wrong while updating coverImage",
            error: err.message,
        });
    }
};


const deleteAccount = async (req, res) => {
    try {
        const user = req.user;
        const { password } = req.body;

        const isValid = bcryptjs.compareSync(password, user.user_password);
        if (!isValid) {
            return res.status(BAD_REQUEST).json({
                message: "wrong password",
            });
        }
        await deleteFromCloudinary(user?.user_avatar);
        if (user?.user_coverImage) {
            await deleteFromCloudinary(user?.user_coverImage);
        }

        await User.deleteOne({
            user_id: user.user_id,
        });

        return res.status(OK).json({
            message: "account deleted successfully",
        });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            error: error.message,
            message: "something went wrong while updating channel details",
        });
    }
};

//update avatar
//update coverimage

export {
    updateChannelDetails,
    updateAvatar,
    updateCoverImage,
    getChannelProfile,
    updatePassword,
    updatePersonalDetails,
    deleteAccount,
};
