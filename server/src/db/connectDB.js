import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(
            `${process.env.MONGO_DB_URL}${process.env.MONGO_DB_DATABASE}`
        );
        console.log(`Connected to database successfully 😊 ☑. ${conn.connection.host}`);
    } catch (err) {
        return console.log("Didn't connected to database 😑\n", err.message);
    }
};
