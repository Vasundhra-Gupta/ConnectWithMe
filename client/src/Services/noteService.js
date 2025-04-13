import { url } from ".";

const getAllNotes = async()=>{
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
}

const getNotes = async (ownerId) => {
    try {
        // const response = await fetch(`/api/notes/${ownerId}`, {
        const response = await fetch(`${url}/notes/${ownerId}`, {
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
        console.log(`error in get notes service ${err.message}`);
        throw err;
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

export { getAllNotes, getNotes , addNote, editNote, deleteNote};
