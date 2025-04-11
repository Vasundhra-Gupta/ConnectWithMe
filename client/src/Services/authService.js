import { url } from ".";
const getUser = async () => {
    try {
        // const response = await fetch("/api/users/current-user", {
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
        // const response = await fetch("/api/users/login", {
        const response = await fetch(`${url}/users/login`, {
            method: "POST",
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
    try {
        const formData = new FormData();
        Object.entries(inputs).forEach(([key, value]) => {
            formData.append(key, value);
        });
        // const response = await fetch("/api/users/register", {
        const response = await fetch(`${url}/users/register`, {
            method: "POST",
            body: formData,
        });
        const res = await response.json();
        if (res.status === 500) {
            console.log(res.message);
            throw new Error(res.message);
        }else if(res.status === 400){
            return res;
        }else{
            const data = await loginUser({
                searchInput: inputs.userName,
                password: inputs.password,
            });
            return data;
        }
    } catch (err) {
        console.log(`error in logic service ${err}`);
        throw err;
    }
};

const logoutUser = async () => {
    try {
        // const response = await fetch("/api/users/logout", {
        const response = await fetch(`${url}/users/logout`, {
            method: "POST",
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
