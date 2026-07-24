import { getModel } from "../graph/llmModel.js"
import { generatePPT } from "../utils/generatePPT.js";
import { getFromS3 } from "../utils/getfromS3.js";
import { uploadToS3 } from "../utils/uploadToS3.js";

export const ppt = async (state) => {
    try {
        
        const pptLLM = await getModel("ppt");

        const prompt = `
        You are a professional Presentation Designer.
        Return only valid JSON.

        Format:
        {
            "title" : "",
            "subtitle" : "",
            "slides": [
                {
                "title" : "",
                "points" : [
                "", "", "", "", ""
                ]
                }
            ]
        }

        Rules:

        - Generate exactly 6 slides.
        - Each slide should have 4-6 concise bullets points
        - No markdown
        - No explanation
        - No code block
        - Return only JSON

        Topic : ${state.prompt}
        `;

        const res = await pptLLM.invoke(prompt);

        console.log("res from ppt: ", res.content);

        const raw = res.content.replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        const data = JSON.parse(raw);

        const fileName = `ppt-${Date.now()}.pptx`

        const ppt = await generatePPT(data);
        const buffer = await ppt.write({
            outputType : "nodebuffer"
        });

        const pptBuffer = await uploadToS3(fileName, buffer, "application/vnd.openxmlformats-officedocument.presentationml.presentation");
        const pptUrl = await getFromS3(fileName, 24*60);

        await detectCredits(state.userId, "ppt");

        return {
            ...state,
            aiResponse: `
🎉 PPT Generated Successfully!

🖼️ **${data.title}**

📥 **Download your PPT:**
👉 [Download PPT](${pptUrl})

⏳ **Note:** This download link expires in **10 minutes**, so be sure to save your image soon.

✨ Enjoy your creation!`,
        }
        
    } catch (error) {
        console.log("error in ppt agent: ", error.message);
        return {
            ...state,
            aiResponse : "❌ Failed to Generate PPT"
        }
               
    }
}