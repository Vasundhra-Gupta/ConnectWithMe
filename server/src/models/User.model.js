import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        index: true,
    },
    user_name: {
        type: String,
        required: true,
    },
    user_firstName: {
        type: String,
        required: true,
    },
    user_lastName: {
        type: String,
    },
    user_password: {
        type: String,
        required: true,
        minlength: 6,
    },
    user_avatar: {
        type: String,
        required: true,
    },
    user_coverImage: {
        type: String,
    },
    user_email: {
        type: String,
        required: true,
    },
    user_contact: {
        type: String,
    },
    user_token: {
        type: String,
        default: "",
    },
    user_bio: {
        type: String,
        default: "",
    },
    user_createdAt: {
        type: Date,
        default: now(),
    },
    user_updatedAt: {
        type: Date,
        default: now(),
    }
});

//hooks

userSchema.pre("save", async function (next) {
    if (this.isModified("user_password"))
        this.user_password = await bcrypt.hash(this.user_password, 10);
    next();
});

// userSchema.post('save', (doc)=>{
//     console.log(doc, "Document saved successfully!")
// })

export const User = model("User", userSchema);
