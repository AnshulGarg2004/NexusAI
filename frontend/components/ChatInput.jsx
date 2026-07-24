import { Code2, FileText, Globe, Image, MessageSquare, Mic, Paperclip, Presentation, Send, Zap } from 'lucide-react'
import React, { useState } from 'react'
import { sendMessage } from '../features/send-message';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setArtifacts } from '../src/redux/messageSlice';
import { addConversation, setConversationTitle, setSelectedConversation } from '../src/redux/conversationSlice';
import { createConversation } from '../features/create-conversation';
import { updateConversation } from '../features/update-conversation';
import getCurrentUser from '../features/getCurrentUser';
import { setUserData } from '../src/redux/userSlice';

const ChatInput = () => {

    const [value, setValue] = useState("");
    const [selectedAgent, setSelectedAgent] = useState("Auto")
    const dispatch = useDispatch();
    const { selectedConversation, conversations } = useSelector(state => state.conversation)
    const { messages } = useSelector(state => state.message)

    const handleSendMessage = async () => {
        const title = value.trim().slice(0, 40);

        let conversation = selectedConversation;

        if (!conversation) {
            const conv = await createConversation();
            dispatch(addConversation(conv));
            dispatch(setSelectedConversation(conv));
            conversation = conv;
        }

        if (conversation.title == "New Chat") {

            await updateConversation({ id: conversation._id, title });
            dispatch(setConversationTitle({ conversationId: conversation._id, title }));
        }

        const payload = {
            prompt: value.trim(),
            conversationId: conversation?._id,
            agent: selectedAgent.toLowerCase()
        }


        dispatch(addMessage({ role: "user", content: value.trim() }))
        setValue("");
        const data = await sendMessage(payload);
        console.log('data in chat input: ', data);
        const artifacts = Array.isArray(data?.artifacts) ? data.artifacts : [];
        dispatch(setArtifacts(artifacts));
        dispatch(addMessage({
            role: "assistant",
            content: data?.answer || "",
            images: data?.images || [],
            artifacts
        }))

        const user = await getCurrentUser();
        dispatch(setUserData(user));


    }

    const agents = [
        {
            id: "auto",
            icon: Zap,
            label: "Auto"

        },
        {
            id: "chat",
            icon: MessageSquare,
            label: "Chat"
        },
        {
            id: "code",
            icon: Code2,
            label: "Code",
        },
        {
            id: "pdf",
            icon: FileText,
            label: "PDF"
        },
        {
            id: "ppt",
            icon: Presentation,
            label: "PPT"
        },

        {
            id: "image",
            icon: Image,
            label: "Image"
        },
        {
            id: "search",
            icon: Globe,
            label: "Search"
        }
    ]

    return (
        <div className=' border-t w-full overflow-hidden px-3 md:px-5 py-4 border-white/6 bg-[#0d0f14]'>
            <div className=' border flex flex-col gap-2 bg-white/3 border-white/7 rounded-2xl px-4 pt-3.5 pb-3 min-h-52.5'>
                <div className='flex w-[80%] gap-2 pr-2 flex-wrap'>
                    {agents.map((agent) => {
                        const Icon = agent.icon;
                        const isActive = selectedAgent === agent.label
                        return (
                            <div onClick={() => setSelectedAgent(agent.label)} className={` flex shrink-0 cursor-pointer items-center px-3 py-2 gap-1.5 text-xs rounded-full border transition-all font-medium${isActive ? " bg-linear-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-[0_1px_8px_rgba(99,102,241,0.35)]" : " bg-white/3 text-slate-400 border-white/6 hover:bg-white/7"}`}>
                                <Icon size={14} className={`${isActive ? " text-white" : " text-slate-500"}`} />
                                {agent.label}
                            </div>
                        )
                    })}
                </div>
                <textarea
                    value={value}
                    onChange={(e) => (setValue(e.target.value))}
                    placeholder='Ask Anything'
                    className='w-full flex-1 min-h-0 bg-transparent outline-none resize-none text-slate-200 placeholder:text-slate-600 leading-relaxed disabled:opacity-50 [scrollbar-widht:none] [&::-webkit-scrollbar]:hidden'
                />
                <div className="mt-auto flex items-center justify-between">

                    <div className="flex items-center gap-2">
                        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-slate-500 transition-all hover:border-white/6 hover:bg-white/5 hover:text-slate-300">
                            <Paperclip size={17} />
                        </button>

                        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-slate-500 transition-all hover:border-white/6 hover:bg-white/5 hover:text-slate-300">
                            <Mic size={17} />
                        </button>
                    </div>

                    <button
                        onClick={handleSendMessage}
                        disabled={!value.trim()}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${value.trim()
                            ? "bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20 hover:scale-105"
                            : "bg-white/5 text-slate-600 cursor-not-allowed"
                            }`}
                    >
                        <Send size={17} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatInput
