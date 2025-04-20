const getCategories = async () => {
    try {
        const response = await fetch(`${url}/categories/add`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = await response.json();
        if (res.status === 500) {
            throw new Error(res.message);
        }
        return res;
    } catch (err) {
        console.log(`error in getting all categories service ${err.message}`);
        throw err;
    }
};

export {getCategories}