import { HumanMessage, isBase64ContentBlock, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../graph/llmModel.js";
import fs from "fs/promises";
import { detectCredits } from "../utils/detectCredits.js";
import { checkLimit } from "../config/rateLimit.js";

export const imageAnalyser = async (state) => {
    try {

        await checkLimit(state.userId, "image")
        const imageAnalyserLLM = await getModel("imageAnalyser");

        const imageBuffer = await fs.readFile(state.file);
        const image = imageBuffer.toString("base64");

        const messages = [
            new SystemMessage(`
                you are Zentra AI image Analyser.
Rules:

-Analyse only the uploaded image

-Analyse the user's question accurately.
-If text exist in the image, extract it.
-If charts or tables exist. Explain them.
-If something is unclear say No.
-Use Markdown when helpful
-Do not hallucinate
                `),

                new HumanMessage(
                    {
                        content : [{
                            type : "text",
                            text : state.prompt || "Analyse the Image"
                        },

                        {type : "image_url",
                            image_url : {
                                url : `data:${state.file.mimetype};base64,${image}`
                            }
                        },

                        
                    ]
                    }
                )
        ]


        const resposne = await imageAnalyserLLM.invoke(messages);

        await detectCredits(state.userId, "image")
        return {
            ...state, 
            aiResponse : resposne.content
        }
        
    } catch (error) {
        console.log("error in image Analyser: ", error.message);
        return {
            ...state,
            aiResponse : error?.data?.message || "❌Failed to analyse file"
        }
    } finally {
      await  fs.unlink(state.file.path)
    }
}