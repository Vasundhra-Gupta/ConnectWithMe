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
        { "Content-Type": "application/json" },
        JSON.stringify(inputs)
    );
};

const updatePersonalDetails = async (inputs) => {
    return tryCatch(
        "updatePersonalDetails",
        `${url}/users/update-personal`,
        "PATCH",
        "include",
        { "Content-Type": "application/json" },
        JSON.stringify(inputs)
    );
};

const updatePassword = async (inputs) => {
    return tryCatch(
        "updatePassword",
        `${url}/users/update-password`,
        "PATCH",
        "include",
        { "Content-Type": "application/json" },
        JSON.stringify(inputs)
    );
};

const deleteAccount = async (password) => {
    return tryCatch(
        "deleteAccount",
        `${url}/users/delete-account`,
        "DELETE",
        "include",
        { "Content-Type": "application/json" },
        JSON.stringify({ password })
    );
};

export {
    getChannelProfile,
    updateChannelDetails,
    updatePassword,
    updatePersonalDetails,
    deleteAccount,
};
