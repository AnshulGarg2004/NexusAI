import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy";
import cors from "cors"
import cookieParser from "cookie-parser";
import protect from "./middleware/auth.middleware.js";
import getCurrentUser from "./controller/user.controller.js";
import proxyWithUrl from "./utils/proxyWithHeader.util.js";


dotenv.config();

const port = process.env.PORT || 9000;

const app = express();

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))

app.use(cookieParser());

console.log({
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
  CHAT_SERVICE_URL: process.env.CHAT_SERVICE_URL,
  AGENT_SERVICE_URL: process.env.AGENT_SERVICE_URL,
});

app.use(express.json());


app.use('/api/auth', proxy(process.env.AUTH_SERVICE_URL) )
app.use('/api/chat',protect, proxyWithUrl(process.env.CHAT_SERVICE_URL));
app.use('/api/agent',protect, proxy(process.env.AGENT_SERVICE_URL));

app.get('/api/me', protect, getCurrentUser);

app.get('/', async (req, res) => {
    return res.status(200).json({message : "setup gateway complete"})
}) 

app.listen(port, async () => {

    console.log("gateway started at: ", port);
     
})