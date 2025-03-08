import "./config/envLoader.js";
import express from "express";
import { userRouter } from "./routes/user.route.js";
import { connectToDB } from "./db/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(express.json())
app.use("/api/users", userRouter);
connectToDB();
app.listen(port, () => {
    console.log(`Server is listening on the port ${port}`);
    console.log("connecting to database...");
});
