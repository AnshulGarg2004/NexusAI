import React from 'react'
import { Coins, LogOut, MessageSquare, PanelLeftIcon, PanelRight, PanelRightIcon, PenSquare, Plus, User } from "lucide-react"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getConversation } from '../features/get-conversation';
import { addConversation, setConversations, setSelectedConversation } from '../src/redux/conversationSlice';
import { createConversation } from '../features/create-conversation';
import { logout } from '../features/logout';
import { setUserData } from '../src/redux/userSlice';

function SideBar() {

    const [collapsed, setCollapsed] = useState(false);
    const [imageError, setImageError] = useState(false)

    const dispatch = useDispatch();

    const { conversations, selectedConversation } = useSelector(state => state.conversation);
    
    

    const { userData } = useSelector(state => state.user);

    console.log("user data from use select: ", userData);


    console.log("conversation from use select: ", conversations);


    useEffect(() => {
        const getConv = async () => {
            const data = await getConversation();

            dispatch(setConversations(data));

            if (data?.length > 0 && !selectedConversation) {
                dispatch(setSelectedConversation(data[0]));
            }
        }
        getConv();
    }, [userData?._id]);

    const handleCreateConversation = async () => {
        const data = await createConversation();
        console.log("data from create convo : ", data);

        dispatch(addConversation(data));
        
        if (data) dispatch(setSelectedConversation(data));
    }

    if (collapsed) {
        return (
            <div className=' flex flex-col items-center w-[56px] h-screen bg-[#0d0f14] border-r py-4 border-white/[0.06] gap-1 shrink-0'>
                <button onClick={() => setCollapsed(false)} className='w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none mb-1 cursor-pointer'>
                    <PanelRight />
                </button>

                <button onClick={() => dispatch(setSelectedConversation(null))} className='w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none mb-1 cursor-pointer'>
                    <Plus size={17} />
                </button>

                <div className=' pt-5 flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                    {conversations.map((convo, ind) => {
                        const isActive = selectedConversation?._id === convo._id;
                        return (
                            <div onClick={() => dispatch(setSelectedConversation(convo))}
                                className={`flex items-center gap-2.5 rounded-[10px] cursor-pointer px-3 mb-0 py-2.5 border duration-150 transition-colors ${isActive ? " bg-indigo-500/10 bg-indigo-500/[0.18]" : " bg-transparent border-transparent"}`}>

                                <div className={` flex items-center justify-center shrink-0 w-[20px] h-[20px] rounded-lg duration-150 transition-colors ${isActive ? " bg-indigo-500/15 text-indigo-400" : " bg-white/[0.05] text-slate-500 "}`}>
                                    <MessageSquare size={13} />

                                </div>

                            </div>
                        )
                    })}
                </div>

                <div className="relative shrink-0">
                    {(userData?.avatar && !imageError) ? (
                        <img
                            className="w-10 h-10 rounded-xl object-cover border border-indigo-500/30"
                            src={userData.avatar}
                            alt="User"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                            <User size={18} className="text-slate-400" />
                        </div>
                    )}
                </div>

            </div>
        )
    }
    return (
        <div className='fixed lg:static inset-y-0 left-0 z-50 w-[270px] h-screen shrink-0 bg-[#0d0f14] border-r border-white/[0.06]'>
            <div className='flex flex-col h-full'>
                <div className='flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]'>
                    <div onClick={() => setCollapsed(!collapsed)} className=' lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer'>
                        <PanelLeftIcon />
                    </div>

                    <span className="text-[16px] font-semibold text-slate-100 tracking-tight flex-1">
                        Zentra AI
                    </span>

                    <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide">
                        free
                    </span>

                    <button onClick={() => dispatch(setSelectedConversation(null))}
                        className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
                    >
                        <PenSquare size={14} />
                    </button>
                </div>
                <div className='px-4 pt-4 pb-1'>
                    <button onClick={() => dispatch(setSelectedConversation(null))}  className='w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-linear-to-r from-indigo-500 to-violet-700 rounded-xl py-[10px] border-none cursor-pointer hover:opacity-90 transition-opacity duration-150'>
                        <Plus size={15} /> New Chat
                    </button>

                </div>


                {conversations.length > 0 ? (
                    <div className='px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600'>
                        Recents
                    </div>


                ) : (
                    <div className='px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600'>
                        No Recent Conversation
                    </div>

                )}
                <div className=' flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                    {conversations.map((convo, ind) => {
                        const isActive = selectedConversation?._id === convo._id;
                        return (
                            <div key={ind} onClick={() => dispatch(setSelectedConversation(convo))}
                                className={`flex items-center gap-2.5 rounded-[10px] cursor-pointer px-3 mb-0 py-2.5 border duration-150 transition-colors ${isActive ? " bg-indigo-500/10 bg-indigo-500/[0.18]" : " bg-transparent border-transparent"}`}>

                                <div className={` flex items-center justify-center shrink-0 w-[28px] h-[28px] rounded-lg duration-150 transition-colors ${isActive ? " bg-indigo-500/15 text-indigo-400" : " bg-white/[0.05] text-slate-500 "}`}>
                                    <MessageSquare size={13} />

                                </div>
                                <span className={`text-[13px] truncate font-medium ${isActive ? "text-slate-100" : " text-slate-300"}`}>
                                    {convo?.title || "New Chat"}
                                </span>
                            </div>
                        )
                    })}
                </div>

                <div className=' mx-2.5 h-px bg-white/[0.06]' />

                <div className='px-3.5 py-3.5'>
                    {userData ? (
                        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-colors duration-150 cursor-pointer">

                            <div className="relative shrink-0">
                                {(userData?.avatar && !imageError) ? (
                                    <img
                                        className="w-10 h-10 rounded-xl object-cover border border-indigo-500/30"
                                        src={userData.avatar}
                                        alt="User"
                                        onError={() => setImageError(true)}
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <User size={18} className="text-slate-400" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-100 truncate">
                                    {userData?.name || "User"}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Free Plan
                                </p>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    className="flex items-center justify-center w-8 h-8 rounded-lg text-yellow-500 hover:bg-white/10 transition-colors"
                                >
                                    <Coins size={16} />
                                </button>

                                <button
                                    onClick={() => {
                                        logout();
                                        dispatch(setUserData(null));
                                    }}
                                    className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:bg-white/10 hover:text-red-400 transition-colors"
                                >
                                    <LogOut size={16} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button className='w-full flex items-center justify-center gap-2 text-sm font-medium text-slate-200 bg-white/[0.06] border border-white/[0.08] rounded-xl py-[11px] cursor-pointer hover:bg-white/[0.08] transition-colors duration-150'>
                            Login
                        </button>
                    )}
                </div>

            </div>

        </div>
    )
}

export default SideBar