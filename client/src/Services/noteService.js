const getNotes = async (ownerId) => {
    try {
        const response = await fetch(`/api/notes/${ownerId}`, {
            method: "GET",
            credentials: "include",
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
        console.log(`error in get notes service ${err}`);
        throw err;
    }
};

const addNote = async (inputs) => {
    try {
        const response = await fetch("/api/notes/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs),
        });
        const res = await response.json();
        if (res.status === 500) {
            throw new Error(res.message);
        }
        console.log(res);
        return res;
    } catch (err) {
        console.log(`error in add note service ${err}`);
        throw err;
    }
};

export { getNotes , addNote};
