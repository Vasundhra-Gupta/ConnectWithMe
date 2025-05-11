import { url } from ".";
import { tryCatch } from "../utils/tryCatchWrap";
const getUser = async () => {
    try {
        const response = await fetch(`${url}/users/current-user`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = await response.json(); //JSON to js
        console.log(res);
        if (res.status === 500) {
            throw new Error(res.message);
        }
        return res;
    } catch (err) {
        console.log(`error in get current user service ${err}`);
        throw err;
    }
};

const loginUser = async (loginInputs) => {
    try {
        const response = await fetch(`${url}/users/login`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginInputs),
        });
        const res = await response.json();
        if (res.status === 500) {
            throw new Error(res.message);
        }
        return res;
    } catch (err) {
        console.log(`error in logic service ${err}`);
        throw err;
    }
};

const registerUser = async (inputs) => {
    const formData = new FormData();
    Object.entries(inputs).forEach(([key, value]) => {
        formData.append(key, value);
    });
    return tryCatch(
        "registerUser",
        `${url}/users/register`,
        "POST",
        "include",
        {},
        formData
    );
};

const logoutUser = async () => {
    try {
        const response = await fetch(`${url}/users/logout`, {
            method: "POST",
            credentials: "include",
        });
        const res = response.json();
        console.log(res);
        if (!response.ok) {
            throw new Error(res.message);
        }

        return res;
    } catch (error) {
        console.log(`error in logout service . ${error.message}`);
    }
};

export { getUser, loginUser, logoutUser, registerUser };
