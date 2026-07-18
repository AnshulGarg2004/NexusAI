import { getModel } from "../graph/llmModel.js";

export const chat = async (state) => {
    const llm = await getModel("chat");

    const prompt = `
    You are Zentra AI. An intelligent AI assitant.

    Rules: 
    For a simple question, greetings and short queries, respond naturally in plain text.
    For techincal, educational, coding or detailed topic use clean markdown .

    Formating: 
    use # for titles and ## for sections.
    leave a blank line after heading.
    use bullets points for lists.
    use numbered list for steps
    use fenced code blocks with language tags for code.
    Keep papragraph short and readable.
    Never write heading and content in the same line.
    Never genrate large walls of text.
    `
    
    const resposne = await llm.invoke([
        {
            role : "system",
            content : prompt
        }, {
            role : "human",
            content : state.prompt
        }
    ]);

    console.log("res form chat : ", resposne);

    return {
        ...state, 
        aiResponse : resposne.content
    }
    
}