import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../utils/firebase'
import { FcGoogle } from "react-icons/fc";
import api from '../utils/axios.js'
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../src/redux/userSlice.js';
import Sidebar from '../components/Sidebar.jsx';
import Artifact from '../components/Artifact.jsx';
import ChatArea from '../components/ChatArea.jsx';

const Home = () => {

    const { userData } = useSelector(state => state.user);
    const dispatch = useDispatch();
    console.log("user dsta from redux: ", userData);

    const handleLogin = async (token) => {
        try {
            const { data } = await api.post('/api/auth/login', { token });
            dispatch(setUserData(data.user));
            console.log("data in handlelogin : ", data);

        } catch (error) {
            console.log("error in hl: ", error);

        }
    }

    const googleLogin = async () => {
        const data = await signInWithPopup(auth, googleProvider);
        const token = await data.user.getIdToken();
        console.log("token: ", token);

        await handleLogin(token)
        console.log("data from firebase: ", data);

    }
    return (
        <div className='h-screen   flex bg-[#0d0f14] text-white overflow-hidden'>
                <Sidebar />
                <ChatArea />
                <Artifact />
         
            {!userData && (
                <div className=' fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
                    <div className='w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5'>
                        <div>
                            <h2 className='text-[17px] font-semibold text-slate-100 tracking-tight'>Welcome to Nexus AI</h2>
                            <p className='text-[13px] text-slate-500'>Please Login to continue using the App</p>
                        </div>

                        <button onClick={googleLogin} className='w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium text-black/60 bg-white hover:bg-gray-200 shadow-lg  transition-all duration-150 cursor-pointer'>
                            <FcGoogle size={15} className='text-white' />
                            Continue with Google
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home
