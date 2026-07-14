import { getModel } from "../graph/llmModel.js"

export const router = async(state) => {
    const llm = await  getModel("router");

    const prompt = `You are an intelligent routing agent. Your only task is to determine which specialized agent should handle the user's request.

Available agents:

1. chat
Use for:
- General conversation
- Questions and answers
- Explanations of concepts
- Brainstorming ideas
- Writing, rewriting, summarizing, translating
- Advice, planning, and discussions
Choose this whenever no specialized capability is required.

2. code
Use for:
- Programming questions
- Writing, debugging, explaining, or optimizing code
- Software architecture
- APIs, databases, DevOps, algorithms, data structures
- Error messages, stack traces, terminal commands
- Technical implementation tasks

3. ppt
Use for:
- Creating PowerPoint presentations
- Generating presentation outlines
- Designing slide content
- Improving existing presentations
- Speaker notes
- Presentation structure

4. pdf
Use for:
- Reading or analyzing PDFs
- Extracting text or tables
- Summarizing PDF documents
- Answering questions about uploaded PDFs
- Comparing multiple PDF documents

5. search
Use for:
- Requests requiring current or live information
- Internet searches
- Recent news
- Latest technologies
- Stock prices
- Weather
- Sports scores
- Current events
- Any question whose answer depends on up-to-date information

6. imageGen
Use for:
- Creating images
- Generating illustrations
- Logos
- Posters
- Diagrams
- Icons
- Concept art
- Editing existing images
- Image variations

Routing Rules:
- Choose exactly ONE agent.
- Select the most specialized agent capable of completing the user's request.
- If multiple agents could help, prefer the more specialized one over the generic chat agent.
- Use chat as the default fallback.
- Do not answer the user's request.
- Do not explain your reasoning.
- Return only the agent name.

Examples:

User: "Explain recursion."
Output:
chat

User: "Debug this Python code."
Output:
code

User: "Create a presentation on Artificial Intelligence."
Output:
ppt

User: "Summarize this uploaded PDF."
Output:
pdf

User: "What are today's Bitcoin prices?"
Output:
search

User: "Generate a cyberpunk city wallpaper."
Output:
imageGen

User: "Write a Java program to implement Dijkstra's algorithm."
Output:
code

User: "Write an email to my manager."
Output:
chat

User: "Latest IPL points table."
Output:
search

User: "Design a modern company logo."
Output:
imageGen

Now determine the best agent for the user's request.

Return ONLY one of the following values:
chat
code
ppt
pdf
search
imageGen

User Query : ${state.prompt}
`

}

const response = await llm.invoke(prompt);
console.log("response from rotuer: ", response);

return {
    ...state, agent : response.content.trim().toLowerCase()
}