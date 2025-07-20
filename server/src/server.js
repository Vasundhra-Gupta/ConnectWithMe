import "./config/envLoader.js";
import { app } from "./app.js";
import { connectToDB } from "./db/connectDB.js";

const port = process.env.PORT || 3000;

connectToDB();
app.listen(port, () => {
    console.log(`Server is listening on the port ${port}`);
    console.log("connecting to database...");
});
