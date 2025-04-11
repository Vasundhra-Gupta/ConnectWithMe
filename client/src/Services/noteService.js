import { url } from ".";

const getAllNotes = async()=>{
    try {
        // const response = await fetch(`/api/notes/all`, {
        const response = await fetch(`${url}/notes/all`, {
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
        console.log(`error in get all notes service ${err}`);
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
        console.log(`error in get notes service ${err}`);
        throw err;
    }
};

const addNote = async (inputs) => {
    try {
        // const response = await fetch("/api/notes/add", {
        const response = await fetch(`${url}/notes/add`, {
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

export { getAllNotes, getNotes , addNote};
