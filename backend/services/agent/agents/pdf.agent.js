import { getModel } from "../graph/llmModel.js";
import { generatePDF } from "../utils/generatePdf.js";
import { getFromS3 } from "../utils/getfromS3.js";
import { uploadToS3 } from "../utils/uploadToS3.js";

export const pdf = async (state) => {
    try {

        const pdfLLM = await getModel("pdf");
        const prompt = `
You are an expert technical writer, professional content strategist, and document designer.

Your task is to generate a well-structured, visually organized document that can be directly rendered into a beautiful, professional PDF.

Return ONLY valid JSON.

Do NOT return Markdown.

Do NOT return explanations, comments, code fences, or any text outside the JSON.

Use this exact schema:

{
  "title": "",
  "subtitle": "",
  "sections": [
    {
      "heading": "",
      "intro": "",
      "points": [
        ""
      ]
    }
  ]
}

Requirements:

- Create a compelling, professional title.
- Create an informative subtitle (1 sentence).
- Generate between 5 and 8 sections.
- Arrange sections in a logical flow from introduction to conclusion.
- Every section must include:
  - A clear heading
  - A short introductory paragraph (1–3 sentences)
  - 4–7 concise bullet points
- Bullet points should be informative, practical, and easy to read.
- Avoid repeating ideas.
- Keep paragraphs concise.
- Maintain a consistent professional tone.
- Make the document suitable for a modern PDF report.
- Use clear hierarchy and natural progression.
- Include actionable insights, best practices, examples, and key takeaways whenever appropriate.
- End with a conclusion section containing practical recommendations or a summary.
- Ensure the content is comprehensive, engaging, and polished.
- Write in fluent English.
- Do not use placeholder text.
- Do not invent citations or references.
- Escape all JSON strings correctly.
- The output must be valid JSON that can be parsed directly with JSON.parse().

Topic:
${state.prompt}
`;

        const res = await pdfLLM.invoke(prompt);

        console.log("resposne from pdf agent: ", res);
        const raw = res.content.replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        const data = JSON.parse(raw);

        console.log("data from pdf agent: ", data);

        const pdfBuffer = await generatePDF(data);
        const fileName = `pdf-${Date.now()}.pdf`

        await uploadToS3(fileName, pdfBuffer, "applicarion/pdf");

        const pdfUrl = await getFromS3(pdfBuffer, 24 * 60);
        await detectCredits(state.userId, "pdf");

        return {
            ...state,
            aiResponse: `
🎉 PDF Generated Successfully!

🖼️ **Your PDF is ready!**

![Generated PDF](${pdfUrl})

📥 **Download your PDF:**
👉 [Download PDF](${pdfUrl})

⏳ **Note:** This download link expires in **10 minutes**, so be sure to save your image soon.

✨ Enjoy your creation!`,

        }


    } catch (error) {
        console.log("error in geenrating pdf");

        return {
            ...state,
            aiResponse: "❌Failed to generate pdf"
        }

    }
}