export const imageAnalyser = async (state) => {
    try {
        
    } catch (error) {
        console.log("error in image Analyser: ", error.message);
        return {
            ...state,
            aiResponse : "❌Failed to generte response"
        }
    }
}