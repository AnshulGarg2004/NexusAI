import React from 'react'
import { useSelector } from 'react-redux'
import MessageBubble from './MessageBubble';

const MessageArea = () => {
    const {selectedConversation} = useSelector(state => state.conversation);
    const {messages} = useSelector(state => state.message)
    return (
        <div className=' flex-1 overflow-y-auto px-6 py-6 space-y-6 [scrollbar-widht:none] [&::-webkit-scrollbar]:hidden'>
            {(messages.length == 0 || !selectedConversation ) ? (
                <div className='h-full flex flex-col items-center justify-center gap-4  text-center'>
                    <div className=' flex flex-col gap-1.5'>
                        <h1 className=' font-semibold text-[20px] text-slate-200 tracking-tight'>Zentra AI</h1>
                        <p className='font-semibold text-[15px] text-slate-400 tracking-tight'>How can i help you?</p>
                        <p className='font-semibold text-[13px] max-w-[260px] leading-relaxed text-slate-600'>Ask me anything -code, ideas, explanation, or just a quick question</p>
                    </div>
                    <div className=' flex flex-wrap justify-center gap-2 mt-1'>
                        {["Create a Netflix clone", "Explain Redis", "Build a Dashboard"].map((sent) => (
                            <button className=' cursor-pointer text-[12px] text-slate-400 bg-white/[0.04] border border-white/[0.07] px-3 py-1.5 rounded-lg hover:bg-white/[0.08] hover:text-slate-200 transition-colors duration-150'>
                                {sent}
                            </button> 
                        ))}
                    </div>
                </div>

            ) : (
                <div>
                    {messages.map((mess, i) => (
                        <div>
                            <MessageBubble role={mess.role} content={mess.content} />
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default MessageArea
