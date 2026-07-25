import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "../agents/router.agent.js";
import { chat } from "../agents/chat.agent.js";
import { pdf } from "../agents/pdf.agent.js";
import { ppt } from "../agents/ppt.agent.js";
import { imageGen } from "../agents/imageGen.agent.js";
import { search } from "../agents/search.agent.js";
import { code } from "../agents/code.agent.js";
import { imageAnalyser } from "../agents/imageAnalyser.js";
import { pdfRag } from "../agents/pdfRag.js";


const workflow = new StateGraph(agentState);

workflow.addNode("router", router );
workflow.addNode("chat", chat);
workflow.addNode("pdf", pdf)
workflow.addNode("ppt", ppt);
workflow.addNode("image", imageGen);
workflow.addNode("search", search);
workflow.addNode("code", code);
workflow.addNode("pdfRag", pdfRag);
workflow.addNode("imageAnalyser", imageAnalyser)

workflow.addEdge("__start__", "router");
workflow.addConditionalEdges("router", (state) => {
    console.log("agentqwer: ", state.agent);
    
    switch(state.agent) {
        case "chat":
            return "chat";
        case "code":
            return "code";
        case "pdf":
            return "pdf";
        case "ppt":
            return "ppt";
        case "search":
            return "search";
        case "image":
            return "image";
        case "imageAnalyser" :
            return "imageAnalyser"
            case "pdfRag":
                return "pdfRag"
        default :
            return "chat";
             
    }
}, {
    chat : "chat",
    code : "code",
    image : "image",
    pdf : "pdf",
    ppt : "ppt",
    search : "search",
    pdfRag : "pdfRag",
    imageAnalyser : "imageAnalyser"
});

workflow.addEdge("image", "__end__");  
workflow.addEdge("code", "__end__");
workflow.addEdge("pdf", "__end__");
workflow.addEdge("ppt", "__end__");
workflow.addEdge("chat", "__end__");
workflow.addEdge("search", "chat");
workflow.addEdge("pdfRag", "__end__");
workflow.addEdge("imageAnalyser", "__end__")




export const graph = workflow.compile();
