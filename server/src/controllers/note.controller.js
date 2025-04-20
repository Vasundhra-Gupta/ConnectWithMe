import { BAD_REQUEST, OK, SERVER_ERROR } from "../constants/errorCodes.js";
import { v4 as uuid } from "uuid";
import { Note } from "../models/Note.model.js";
import { getUser } from "../utils/functions.js";

const commonpipeline = [
    {
        $lookup: {
            from: "users",
            localField: "note_ownerId",
            foreignField: "user_id",
            as: "user",
        },
    },
    {
        $unwind: "$user",
    },
    {
        $addFields: {
            userName: "$user.user_name",
            firstName: "$user.user_firstName",
            lastName: "$user.user_lastName",
            avatar: "$user.user_avatar",
            coverImage: "$user.user_coverImage",
        },
    },
    {
        $sort: {
            note_createdAt: -1,
            note_updatedAt: -1,
        },
    },
    {
        $project: {
            user: 0,
        },
    },
];
//just a find query
const getNote = async (noteId) => {
    try {
        return await Note.findOne({
            note_id: noteId,
        });
    } catch (err) {
        throw err;
    }
};

//public
const getAllPublicNotes = async (req, res) => {
    try {
        const pipeline = [
            {
                $match: {
                    note_visibility: true,
                },
            },
            ...commonpipeline,
        ];
        const notes = await Note.aggregate(pipeline);
        if (!notes.length) {
            return res.status(BAD_REQUEST).json({
                message: "no notes found",
            });
        }
        return res.status(OK).json(notes);
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            error: error.message,
            message: "something went wrong while getting all notes",
        });
    }
};

const getPrivateNotes = async (req, res) => {
    try {
        const { ownerId } = req.params;
        //isValidUUID and data
        if (!ownerId) {
            return res
                .status(BAD_REQUEST)
                .json({ message: "owner id missing" });
        }
        const owner = await getUser(ownerId);
        if (!owner) {
            return res.status(BAD_REQUEST).json({
                message: "owner not found",
            });
        }
        const pipeline = [
            {
                $match: {
                    note_ownerId: ownerId,
                    note_visibility: false,
                },
            },
            {
                $sort: {
                    note_createdAt: -1,
                    note_updatedAt: -1,
                },
            },
            ...commonpipeline,
        ];
        const notes = await Note.aggregate(pipeline);
        if (!notes.length) {
            return res.status(OK).json({
                message: "no notes found",
            });
        }
        return res.status(OK).json(notes);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            error: err.message,
            message: "something went wrong while getting notes",
        });
    }
};

const getPublicNotes = async (req, res) => {
    try {
        const { ownerId } = req.params;
        //isValidUUID and data
        if (!ownerId) {
            return res
                .status(BAD_REQUEST)
                .json({ message: "owner id missing" });
        }
        const owner = await getUser(ownerId);
        if (!owner) {
            return res.status(BAD_REQUEST).json({
                message: "owner not found",
            });
        }
        const pipeline = [
            {
                $match: {
                    note_ownerId: ownerId,
                    note_visibility: true,
                },
            },
            {
                $sort: {
                    note_createdAt: -1,
                    note_updatedAt: -1,
                },
            },
            ...commonpipeline,
        ];
        const notes = await Note.aggregate(pipeline);
        if (!notes.length) {
            return res.status(OK).json({
                message: "no notes found",
            });
        }
        return res.status(OK).json(notes);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            error: err.message,
            message: "something went wrong while getting notes",
        });
    }
};

const getANote = async (req, res) => {
    try {
        const { noteId } = req.params;
        if (!noteId) {
            return res.status(BAD_REQUEST).json({
                message: "note id missing",
            });
        }

        const note = await getNote(noteId);

        if (!note) {
            return res.status(BAD_REQUEST).json({
                message: "note not found",
            });
        }
        return res.status(OK).json(note);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            error: err.message,
            message: "something went wrong while getting the note",
        });
    }
};

const addNote = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const data = {
            title,
            content,
            category,
        };

        if (
            Object.entries(data).some(
                ([key, value]) => !value && key != "category"
            )
        ) {
            return res.status(BAD_REQUEST).json({
                message: "missing fields",
            });
        }
        const note = await Note.create({
            note_id: uuid(),
            note_ownerId: req.user.user_id,
            note_title: title,
            note_content: content,
            note_category: category && category,
        });

        return res.status(OK).json(note);
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            error: err.message,
            message: "something went wrong while adding the category",
        });
    }
};

const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        if (!noteId) {
            return res.status(BAD_REQUEST).json({
                message: "note id missing",
            });
        }
        const note = await getNote(noteId);

        if (!note) {
            return res.status(BAD_REQUEST).json({
                message: "note not found",
            });
        }
        await Note.deleteOne({ note_id: noteId });

        return res.status(OK).json({
            message: "note deleted successfully",
        });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            error: err,
            message: "something went wrong while deleting the note",
        });
    }
};

const editNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { title, content } = req.body;
        if (!noteId) {
            return res.status(BAD_REQUEST).json({
                message: "note id missing",
            });
        }
        if (!title && !content) {
            return res.status(BAD_REQUEST).json({
                message: "missing fields",
            });
        }
        const note = await getNote(noteId);

        if (!note) {
            return res.status(BAD_REQUEST).json({
                message: "note not found",
            });
        }

        await Note.updateOne(
            { note_id: noteId },
            {
                $set: {
                    note_title: title,
                    note_content: content,
                },
            },
            { new: true }
        );
        return res.status(OK).json({
            message: "note edited successfully",
        });
    } catch (err) {
        return res.status(SERVER_ERROR).json({
            error: err.message,
            message: "something went wrong while editing notes.",
        });
    }
};

const toggleNoteVisibility = async (req, res) => {
    try {
        const { noteId } = req.params;

        const note = await getNote(noteId);
        if (!note) {
            return res.status(BAD_REQUEST).json({
                message: "note not found",
            });
        }
        await Note.updateOne(
            {
                note_id: noteId,
            },
            {
                $set: {
                    note_visibility: !note.note_visibility,
                },
            },
            { new: true }
        );
        return res.status(OK).json({
            message: "note visibility toggled successfully",
        });
    } catch (error) {
        return res.status(SERVER_ERROR).json({
            error: error.message,
            message: "something went wrong while toggling note visibility",
        });
    }
};

const pinANote = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};

export {
    addNote,
    deleteNote,
    getPublicNotes,
    getPrivateNotes,
    getANote,
    editNote,
    getAllPublicNotes,
    toggleNoteVisibility,
    pinANote,
};
