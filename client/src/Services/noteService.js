import { url } from ".";

const getAllNotes = async () => {
    try {
        // const response = await fetch(`/api/notes/all`, {
        const response = await fetch(`${url}/notes/all`, {
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
        console.log(`error in get all notes service ${err.message}`);
        throw err;
    }
};

const getPublicNotes = async (ownerId) => {
    try {
        // const response = await fetch(`/api/notes/${ownerId}`, {
        const response = await fetch(`${url}/notes/public/${ownerId}`, {
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
        console.log(`error in get public notes service ${err.message}`);
        throw err;
    }
};

const getPrivateNotes = async (ownerId) => {
    try {
        // const response = await fetch(`/api/notes/${ownerId}`, {
        const response = await fetch(`${url}/notes/private/${ownerId}`, {
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
        console.log(`error in get private notes service ${err.message}`);
        throw err;
    }
};

const toggleVisibility = async (noteId) => {
    try {
        const response = await fetch(
            `${url}/notes/toggleVisibility/${noteId}`,
            {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const res = await response.json();
        console.log(res);
        if (res.status === 500) {
            throw new Error(res.message);
        }
        return res;
    } catch (error) {
        throw error;
    }
};

const addNote = async (inputs) => {
    try {
        // const response = await fetch("/api/notes/add", {
        const response = await fetch(`${url}/notes/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(inputs),
        });
        const res = await response.json();
        if (res.status === 500) {
            throw new Error(res.message);
        }
        console.log(res);
        return res;
    } catch (err) {
        console.log(`error in add note service ${err.message}`);
        throw err;
    }
};

const editNote = async (inputs, noteId) => {
    try {
        // const response = await fetch("/api/notes/add", {
        const response = await fetch(`${url}/notes/edit/${noteId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(inputs),
        });
        const res = await response.json();
        if (res.status === 500) {
            throw new Error(res.message);
        }
        console.log(res);
        return res;
    } catch (err) {
        console.log(`error in edit note service ${err.message}`);
        throw err;
    }
};

const deleteNote = async (ownerId) => {
    try {
        // const response = await fetch("/api/notes/add", {
        const response = await fetch(`${url}/notes/delete/${ownerId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        const res = await response.json();
        if (res.status === 500) {
            throw new Error(res.message);
        }
        console.log(res);
        return res;
    } catch (err) {
        console.log(`error in delete note service ${err.message}`);
        throw err;
    }
};

const pinANote = async () => {
    try {
        
    } catch (error) {
        throw err;
    }
}

export {
    getAllNotes,
    getPublicNotes,
    getPrivateNotes,
    addNote,
    editNote,
    deleteNote,
    pinANote,
    toggleVisibility,
};
