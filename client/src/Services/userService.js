import { url } from ".";
import { tryCatch } from "../utils/tryCatchWrap";

const getChannelProfile = async (channelId) => {
    return tryCatch(
        "getChannelProfile",
        `${url}/users/channel/${channelId}`,
        "GET",
        "include"
    );
};

const updateChannelDetails = async (inputs) => {
    return tryCatch(
        "updateChannelDetails",
        `${url}/users/update-channel`,
        "PATCH",
        "include",
        {},
        inputs
    );
};

const updatePersonalDetails = async (inputs) => {
    return tryCatch(
        "updatePersonalDetails",
        `${url}/users/update-personal`,
        "PATCH",
        "include",
        {},
        inputs
    );
};

const updatePassword = async (inputs) => {
    return tryCatch(
        "updatePassword",
        `${url}/users/update-password`,
        "PATCH",
        "include",
        {},
        inputs
    );
};

const deleteAccount = async (password) => {
    return tryCatch(
        "deleteAccount",
        `${url}/users/delete-account`,
        "DELETE",
        "include",
        {},
        { password }
    );
};

const updateAvatar = async (avatar) => {
    const formdata = new FormData();
    formdata.append("avatar", avatar);
    return tryCatch(
        "updateAvatar",
        `${url}/users/update-avatar`,
        "PATCH",
        "include",
        {},
        formdata
    );
};

const updateCoverImage = async (coverImage) => {
    const formdata = new FormData();
    formdata.append("coverImage", coverImage);
    return tryCatch(
        "updateCoverImage",
        `${url}/users/update-coverImage`,
        "PATCH",
        "include",
        {},
        formdata
    );
};

export {
    getChannelProfile,
    updateChannelDetails,
    updatePassword,
    updatePersonalDetails,
    updateAvatar,
    updateCoverImage,
    deleteAccount,
};
