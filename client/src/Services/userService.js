const updateChannelDetails = async (inputs) => {
    try {
        const res = await fetch("/api/users/update-channel", {
            method: "PATCH",
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
        const res = await fetch("/api/users/update-personal", {
            method: "PATCH",
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
        const res = await fetch("/api/users/update-password", {
            method: "PATCH",
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
        const res = await fetch("/api/users/delete-account", {
            method: "DELETE",
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
