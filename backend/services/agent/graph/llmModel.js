import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from  "@langchain/google-genai"
import { ChatOpenRouter } from "@langchain/openrouter";
import dotenv from "dotenv";

dotenv.config();

const groq = new ChatGroq({
model: "openai/gpt-oss-120b",
temperature: 0
});

const codeModel = new ChatOpenRouter({

  model: "deepseek/deepseek-chat",
  temperature: 0,
  maxTokens: 2500,
});

const gemini = new ChatGoogleGenerativeAI({
    model : "gemini-2.5-flash",
    temperature : 0
});

export const getModel = async (agent) => {
    switch (agent) {
        case "chat":
            return groq;
        case "search":
            return groq;
        case "code" :
            return codeModel;
        default:
            return groq;
    }
}
