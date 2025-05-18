import { model, Schema } from "mongoose";

const verificationSchema = new Schema({
    user_email: {
        type: String,
        required: true,
        index: true,
        lowercase: true,
        trim: true,
        ref: "users",
    },
    user_code: {
        type: String,
    },
    user_expiry: {
        type: Date,
        default: () => Date.now() + 180000, // 3 minute
    },
});

// TTL(Time to leave) Index: document expires automatically after `user_expiry`
verificationSchema.index({user_expiry:1},{expireAfterSeconds:0})
export const Verification = model("Verification", verificationSchema);