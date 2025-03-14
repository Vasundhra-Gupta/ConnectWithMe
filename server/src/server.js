import "./config/envLoader.js";
import express from "express";
import { userRouter } from "./routes/user.route.js";
import { categoryRouter } from "./routes/category.route.js";
import { connectToDB } from "./db/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { noteRouter } from "./routes/note.route.js";

const app = express();
const port = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: false }));// for form data
app.use(cookieParser()); // to parse cookie
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);
app.use(express.json()) // to convert json object data to js object format.

app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/notes", noteRouter)
connectToDB();
app.listen(port, () => {
    console.log(`Server is listening on the port ${port}`);
    console.log("connecting to database...");
});
