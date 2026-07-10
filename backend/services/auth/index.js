import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js";
import router from "./routes/auth.routes.js";

dotenv.config();

const port = process.env.PORT || 9000;

const app = express();

app.use(express.json());

app.use('/', router)

app.get('/', async (req, res) => {
    return res.status(200).json({message : "setup auth service complete"})
})

app.listen(port, async () => {
    await connectDB();
    console.log("auth service started at: ", port);
    
})