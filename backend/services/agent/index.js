import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js";
import router from "./routes/agent.route.js"

dotenv.config();

const port = process.env.PORT || 8003;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router)

app.get('/', async (req, res) => {
    return res.status(200).json({message : "assalam-wale-kum from agent"})
}) 

app.listen(port, async () => {
    await connectDB();
    console.log("agent started at: ", port);
})