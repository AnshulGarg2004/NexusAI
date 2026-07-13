import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js";
import router from "./routes/chat.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use('/', router)

const port = process.env.PORT || 8002;

app.get('/', async (req, res) => {
    console.log("welcome to chat service");
    return res.status(200).json({message : "assalam-wale-kum from chat"})
})

app.listen(port, async() => {
    await connectDB();
    console.log("server started at: ", port);
})