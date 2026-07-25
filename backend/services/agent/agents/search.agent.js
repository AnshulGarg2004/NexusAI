import { checkLimit } from "../config/rateLimit.js";
import { searchTool } from "../config/tavily.js"
import { detectCredits } from "../utils/detectCredits.js";

export const search = async (state) => {
    try {
        await checkLimit(state.userId, "search")
        const results = await searchTool.invoke({
            query : state.prompt
        })

        console.log("res from tavily: ", results);
        await detectCredits(state.userId, "search");
        return {...state, searchResults : results, images : results.images}
    } catch (error) {
        console.log("err in fetching res from tavily: ", error.message);
        return {...state, searchResults : [], images : []};
    }
}