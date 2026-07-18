import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "../agents/router.agent.js";
import { chat } from "../agents/chat.agent.js";
import { pdf } from "../agents/pdf.agent.js";
import { ppt } from "../agents/ppt.agent.js";
import { imageGen } from "../agents/imageGen.agent.js";
import { search } from "../agents/search.agent.js";
import { code } from "../agents/code.agent.js";

const workflow = new StateGraph(agentState);

workflow.addNode("router", router );
workflow.addNode("chat", chat);
workflow.addNode("pdf", pdf)
workflow.addNode("ppt", ppt);
workflow.addNode("imageGen", imageGen);
workflow.addNode("search", search);
workflow.addNode("code", code);

workflow.addEdge("__start__", "router");
workflow.addConditionalEdges("router", (state) => {
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
        case "imageGen":
            return "imageGen";
        default :
            return "chat";
             
    }
}, {
    chat : "chat",
    code : "code",
    imageGen : "imageGen",
    pdf : "pdf",
    ppt : "ppt",
    search : "search"
});

workflow.addEdge("imageGen", "__end__");  
workflow.addEdge("code", "__end__");
workflow.addEdge("pdf", "__end__");
workflow.addEdge("ppt", "__end__");
workflow.addEdge("chat", "__end__");
workflow.addEdge("search", "code");




export const graph = workflow.compile();
