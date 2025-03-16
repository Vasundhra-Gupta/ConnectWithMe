const getUser = async () => {
    try {
        const response = await fetch("/api/users/current-user", {
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
        const response = await fetch("/api/users/login", {
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
        const response = await fetch("/api/users/register", {
            method: "POST",
            body: formData,
        });
        const res = await response.json();
        if (res.status === 500) {
            console.log(res.message);
            throw new Error(res.message);
        }
        return res;
    } catch (err) {
        console.log(`error in logic service ${err}`);
        throw err;
    }
};

const logoutUser = async () => {
    try {
        const response = await fetch("/api/users/logout", {
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
