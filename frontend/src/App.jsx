import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, googleProvider } from '../utils/firebase'

function App() {

    const googleLogin = async () => {
        const data = await signInWithPopup(auth, googleProvider);
        console.log("data from firebase: ", data);
        
    }
    return (
        <div>
            <button onClick={googleLogin} className='bg-back-500 w-full h-screen cursor-pointer' >
                Continue with Google
                </button>
        </div>
    )
}

export default App
