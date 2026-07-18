import { MessageSquare, MessagesSquare, MessagesSquareIcon } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const { selectedConversation } = useSelector(state => state.conversation);
    const { messages } = useSelector(state => state.message);
    console.log("in nav: ", selectedConversation);


    return (
        <>
            {selectedConversation && <div className='h-14 flex items-center gap-2.5 px-5 border-b border-white/[0.06] bg-[#0d0f14]'>
                <div className=' flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20'>
                    <MessageSquare size={13} className='text-indigo-400' />
                </div>

                <div className='text-[14px] font-semibold tracking-tight text-slate-100'>
                    {selectedConversation?.title || "New Chat"}
                </div>
                <div className=' text-slate-600 bg-white/[0.04] border border-white/[0.06] font-medium text-[10px] rounded-full py-0.5 px-2'>
                    {messages?.length} Messages
                </div>
            </div>}
        </>
    )
}

export default Navbar
