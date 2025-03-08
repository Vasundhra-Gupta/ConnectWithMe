import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    category_id: {
        type: String,
        required: true,
        index: true,
    },
    category_name: {
        type: String,
        index: true,
        default: "General",
    },
});

export const Category = model("Category", categorySchema);
