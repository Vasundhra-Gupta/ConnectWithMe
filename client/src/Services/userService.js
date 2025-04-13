import { url } from ".";

const updateChannelDetails = async (inputs) => {
    try {
        // const res = await fetch(`/api/users/update-channel`, {
        const res = await fetch(`${url}/users/update-channel`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
        });
        if (res.status === 500) {
            throw new Error(res.message);
        }
        const response = res.json();
        return response;
    } catch (error) {
        console.log("error in updateChannelDetails service", error);
        throw error;
    }
};

const updatePersonalDetails = async (inputs) => {
    try {
        // const res = await fetch(`/api/users/update-personal`, {
        const res = await fetch(`${url}/users/update-personal`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
        });
        if (res.status === 500) {
            throw new Error(res.message);
        }
        const response = res.json();
        return response;
    } catch (error) {
        console.log("error in updatePersonalDetails service", error);
        throw error;
    }
};

const updatePassword = async (inputs) => {
    try {
        // const res = await fetch(`/api/users/update-password`, {
        const res = await fetch(`${url}/users/update-password`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
        });
        console.log(res);
        if (res.status === 500) {
            throw new Error(res.message);
        }
        const response = res.json();
        return response;
    } catch (error) {
        console.log("error in updatePassword service", error);
        throw error;
    }
};

const deleteAccount = async (password) => {
    try {
        // const res = await fetch("/api/users/delete-account", {
        const res = await fetch(`${url}/users/delete-account`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
        });
        if (res.status === 500) {
            throw new Error(res.message);
        }
        const response = res.json();
        return response;
    } catch (error) {
        console.log("error in deleteAccount service", error);
        throw error;
    }
};

export {
    updateChannelDetails,
    updatePassword,
    updatePersonalDetails,
    deleteAccount,
};
