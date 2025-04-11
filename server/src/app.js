import express from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter, categoryRouter, noteRouter, userRouter } from "./routes/index.js";

app.use(express.urlencoded({ extended: false })); // for form data
app.use(cookieParser()); // to parse cookie
app.use(
    cors({
        origin: ["http://localhost:5173", "https://connectwithme-vatb.onrender.com"],
        credentials: true,
    })
);
app.use(express.json()); // to convert json object data to js object format.
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/notes", noteRouter);
app.use("/api/users", userRouter);
