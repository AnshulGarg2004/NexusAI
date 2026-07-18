import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMessage } from '../features/get-messages';
import { setMessages } from '../src/redux/messageSlice';
import Navbar from './Navbar';
import MessageArea from './MessageArea';
import ChatInput from './ChatInput';

const ChatArea = () => {

     const {selectedConversation} = useSelector(state => state.conversation);
     console.log("in chat area: ", selectedConversation);
     
     const dispatch = useDispatch();
    useEffect(() => {
        const getMsg = async () => {
            console.log("dfghjk");
            
            if(selectedConversation) {

                const data = await getMessage(selectedConversation._id); 
                console.log("data in char area from get mess.js ", data);
                dispatch(setMessages(data));
                
            }
        }

        getMsg();
    }, [selectedConversation])
    return (
        <div className='flex-1 flex flex-col'>
            <Navbar />
            <MessageArea />
            <ChatInput />
        </div>
    )
}

export default ChatArea
