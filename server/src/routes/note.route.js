import express from "express";
import {
    getAllPublicNotes,
    getPublicNotes,
    getPrivateNotes,
    getANote,
    addNote,
    deleteNote,
    editNote,
    toggleNoteVisibility,
} from "../controllers/note.controller.js";
import { verifyToken } from "../middlewares/authentication.js";
export const noteRouter = express.Router();

noteRouter.route("/all").get(getAllPublicNotes);

noteRouter.use(verifyToken);

noteRouter.route("/note/:noteId").get(getANote);
noteRouter.route("/public/:ownerId").get(getPublicNotes); //getNotes
noteRouter.route("/private/:ownerId").get(getPrivateNotes); //getNotes
noteRouter.route("/add").post(addNote);
noteRouter.route("/delete/:noteId").delete(deleteNote);
noteRouter.route("/edit/:noteId").patch(editNote);
noteRouter.route("/toggleVisibility/:noteId").patch(toggleNoteVisibility);
