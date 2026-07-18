import { searchTool } from "../config/tavily.js"

export const search = async (state) => {
    try {
        const results = await searchTool.invoke({
            query : state.prompt
        })

        console.log("res from tavily: ", results);
        return {...state, searchResults : results, images : results.images}
    } catch (error) {
        console.log("err in fetching res from tavily: ", error.message);
        return {...state, searchResults : [], images : []};
    }
}