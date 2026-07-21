import { getModel } from "../graph/llmModel.js"

export const code = async (state) => {
    const intentLLM = await getModel("intent");
    const codeLLM = await getModel("code");

    const intentRes = await intentLLM.invoke(
        `
        You are an intent classifier.
        Return only one of the values:
        Code_Generation
        Code_Review
        Code_Explanation
        Debugging
        Optimization
        Converstion
        Documentation

        User Request: ${state.prompt}
        `
    )

    const intent = intentRes.content;

    console.log("intent: ", intent);

    if (intent === "Code_Generation") {

        const prompt = `
        Default stack 
        -HTML
        - CSS 
        -JAVASCRIPT

        use React / Next.js / Vue only if explicitly requested

        Rules:
        - Responsive
        - Animated
        - Morden UI
        - Nice Color Gradients
        - CSS Variables
        - Flexbox/ Grid
        - Smooth Scroll
        - Hover Effects
        - Shadow Effects
        - Beautiful Spacing
        - Single page unless user asks otherwise

        IMAGES:
        =====================
        Always use real unsplash images

        Never use placeholders


        Return only valid JSON

        Schema : 
        {
            "files": [
                {
                "name": "index.html",
                "content": "..."
                },
                {
                "name": "style.css",
                "content": "..."
                },
                {
                "name": "script.js",
                "content": "..."
                }
            ]
        }
            
        Rules :
        
        - Output must start with {
        - Output must end with }
        - No Markdown
        -No explanation
        - No extra text
        - No \`\`\
        - Never mention intent

        User Request: ${state.prompt}

        `
        const res = await codeLLM.invoke(prompt);

        console.log("ress from code agent: ", res.content);

        const raw = res.content.replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

            const data = JSON.parse(raw);

            console.log("data from code gen json wala: ", data);
            
        return {
            ...state, aiResponse: "code Generated Successfully",
            artifacts: [
                {
                    id: Date.now(),
                    type: "Project",
                    files: data.files || [],
                    title : state.prompt
                }
            ]


        }
    }

    const res = await codeLLM.invoke(
        `
        The User's Request is ${intent}

        Return Markdown Only

        Never generate projet files

        use heading like:

        #Overview

        ## Explanation

        ## Problems


        ## Improvements

        ## Best Practices

        ## Optimized code (if needed)

        User Request: ${state.prompt}

        `
    )

    const data = res.content;
    console.log("data from other code gen: ", data);
    return {
        ...state,
        aiResponse: data,
        artifacts: []
    }


}