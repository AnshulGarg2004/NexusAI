import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js";
import router from "./routes/billing.route.js";

dotenv.config();

const app = express();

app.use('/', router)
app.use(express.json());

const port = process.env.PORT || 8004;

app.get('/', async (req, res) => {
    res.status(200).json({message : "assalam-wale-kum payment sir card or cash"});
})

app.listen(port, async () => {
    await connectDB();
    console.log("server started at: ", port);
    
})