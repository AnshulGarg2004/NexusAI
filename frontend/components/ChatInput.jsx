import { Mic, Paperclip, Send } from 'lucide-react'
import React, { useState } from 'react'
import { sendMessage } from '../features/send-message';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../src/redux/messageSlice';

const ChatInput = () => {

    const [value, setValue] = useState("");
    const dispatch = useDispatch();
    const { selectedConversation, conversations } = useSelector(state => state.conversation)
    const {messages} = useSelector(state => state.message)
    
    const handleSendMessage = async ()  => {
        const payload = {
            prompt : value.trim(),
            conversationId : selectedConversation?._id
        }

        
        dispatch(addMessage({role : "user", content : value.trim()}))
        setValue("");
        const data = await sendMessage(payload);
        dispatch(addMessage({role : "assistant", content : data}))
  
        
    }

    return (
        <div className=' border-t w-full overflow-hidden px-3 md:px-5 py-4 border-white/[0.06] bg-[#0d0f14]'>
            <div className=' border flex flex-col gap-2 bg-white/[0.03] border-white/[0.07] rounded-2xl px-4 pt-3.5 pb-3'>
                <textarea value={value} onChange={(e) => (setValue(e.target.value))} placeholder='Ask Anything' rows={3} className=' w-full bg-transparent outline-none resize-none text-slate-200 placeholder:text-slate-600 leading-relaxed disabled:opacity-50  [scrollbar-widht:none] [&::-webkit-scrollbar]:hidden' />
                <div className='flex items-center justify-center'>
                    <div className='flex items-center gap-1'>
                        <button className=' flex items-center justify-center w-8 h-8 text-slate-600 hover:text-slate-400 hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06] transition-all duration-150 bg-transparent cursor-pointer'>
                            <Paperclip size={16} />
                           
                        </button>
                        <button className=' flex items-center justify-center w-8 h-8 text-slate-600 hover:text-slate-400 hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06] transition-all duration-150 bg-transparent cursor-pointer'>
                            <Mic size={16} />
                           
                        </button>
                    </div>
                    <button onClick={handleSendMessage} disabled={!value}
                     className = {` flex items-center justify-center w-8 h-8 rounded-lg border-none cursor-pointer transition-all duration-150 ${value.trim() ? "bg-linear-to-br from-indigo-500 to-violet-700 hover:opacity-90 text-white" : "bg-white/[0.06] text-slate-600 cursor-not-allowed "}`} >
                        <Send size={15} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatInput
