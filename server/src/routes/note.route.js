import express from "express";
import { getNotes, getANote, addNote, deleteNote, editNote } from "../controllers/note.controller.js";
import { verifyToken } from "../middlewares/authentication.js";
export const noteRouter = express.Router();

noteRouter.route("/:ownerId").get(getNotes);
noteRouter.route("/note/:noteId").get(getANote);

noteRouter.use(verifyToken);

noteRouter.route("/add").post(addNote);
noteRouter.route("/delete/:noteId").delete(deleteNote);
noteRouter.route("/edit/:noteId").patch(editNote)
