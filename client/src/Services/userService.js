import { url } from ".";

const getChannelProfile = async (channelId) => {
    try {
        const response = await fetch(`${url}/users/channel/${channelId}`, {
            method: "GET",
            credentials: "include",
        })

        if(response.status===500){
            throw new Error(res.message);
        }
        const res = await response.json();
        return res;
    } catch (error) {
        console.log("error in updateChannelDetails service", error);
        throw error;
    }
}
const updateChannelDetails = async (inputs) => {
    try {
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
    getChannelProfile,
    updateChannelDetails,
    updatePassword,
    updatePersonalDetails,
    deleteAccount,
};
