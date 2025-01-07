import mongoose from "mongoose";

export const connectToDB = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`Connected to database. ${conn.connection.host}`);
    } catch (err) {
        return console.log("Didn't connected to database\n", err.message)
    }
};
