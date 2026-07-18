import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
    name: "conversation",
    initialState: {
        conversations: [],
        selectedConversation : null
    },

    reducers: {
        setConversations: (state, action) => {
            state.conversations = action.payload
        },

        addConversation: (state, action) => {
            console.log("conversations:", state.conversations);
            console.log("isArray:", Array.isArray(state.conversations));
            state.conversations.unshift(action.payload)
        },
        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload;
        },
        setConversationTitle : (state, action) => {
            const {title, conversationId} = action.payload;
            const conversation = state.conversations.find((conv) => conv._id === conversationId);

            if (conversation) {
                conversation.title = title;
            }

            if (state.selectedConversation._id === conversationId) {
                state.selectedConversation = {...state.selectedConversation, title}
            }
        }
    }
});

export const { setConversations, addConversation, setSelectedConversation,setConversationTitle } = conversationSlice.actions
export default conversationSlice.reducer