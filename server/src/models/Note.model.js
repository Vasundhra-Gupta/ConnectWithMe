import { model, Schema } from "mongoose";

const notesSchema = new Schema({
    note_id : {
        type: String,
        required: true,
        index: true 
    },
    note_ownerId: {
        type: String,
        ref: "User"
    },
    note_title: {
        type: String,
        default: "Untitled",
        index: true,
    },
    note_content: {
        type: String,
    },
    note_visibility: {
        type: Boolean,
        default: false,
    },
    note_category: {
        type: String,
        ref: "Category",
    },
    note_createdAt: {
        type: Date,
        default: now(),
    },
    note_updatedAt: {
        type: Date,
        default: now(),
    },
})

export const Note = model("Note", notesSchema);