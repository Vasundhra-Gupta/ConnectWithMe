import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'
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
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    user_password: {
        type: String,
        required: true,
        minlength: 6,
    },
    user_avatar: {
        type: String,
    },
    user_email: {
        type: String,
    },
    user_gender: {
        type: String,
        enum: ["male", "female"],
    },
    user_token: {
        type: String,
        default: '',
    }
});

//hooks

userSchema.pre('save', async function (next){
    if(this.isModified('user_password'))
        this.user_password = await bcrypt.hash(this.user_password, 10)
    next();
})

// userSchema.post('save', (doc)=>{
//     console.log(doc, "Document saved successfully!")
// })

export const User = model("User", userSchema);
