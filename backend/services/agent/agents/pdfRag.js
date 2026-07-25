export const pdfRag = async(state) => {
    try {
        
    } catch (error) {
        console.log("error in pdf rag: ", error.message);
        return {
            ...state,
            aiResponse : "❌Failed to generte response"
        }
    }
}