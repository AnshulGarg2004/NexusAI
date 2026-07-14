export const chat = async (state) => {
    const llm = await getModel("chat");

    const prompt = "You are Nexus AI. An intelligent AI assitant"
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