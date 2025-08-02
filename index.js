import express from "express";
import  dotenv  from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(morgan("combined"));


app.get("/", (req,res) => {
    res.send("<h1>Welcome to node server of the Blog Site</h1>")
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});