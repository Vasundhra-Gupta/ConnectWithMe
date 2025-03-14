import express from "express";
import { getAllNotes, getNotes, getANote, addNote, deleteNote, editNote } from "../controllers/note.controller.js";
import { verifyToken } from "../middlewares/authentication.js";
export const noteRouter = express.Router();

noteRouter.route("/all").get(getAllNotes);

noteRouter.use(verifyToken);

noteRouter.route("/note/:noteId").get(getANote);
noteRouter.route("/:ownerId").get(getNotes);
noteRouter.route("/add").post(addNote);
noteRouter.route("/delete/:noteId").delete(deleteNote);
noteRouter.route("/edit/:noteId").patch(editNote)
