const loginUser = async (loginInputs) => {
    try {
        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginInputs),
        });
        const res = await response.json();
        if (res.status===500) {
            throw new Error(res.message);
        }
        console.log(res);
        return res;
    } catch (err) {
        console.log(`error in logic service ${err}`);
        throw err;
    }
};

const registerUser = async (loginInputs) => {
    try {
        const response = await fetch("/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginInputs),
        });
        const res = await response.json();
        if (res.status===500) {
            throw new Error(res.message);
        }
        console.log(res);
        return res;
    } catch (err) {
        console.log(`error in logic service ${err}`);
        throw err;
    }
};

export { loginUser, registerUser };
