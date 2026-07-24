
import React from 'react'
import Home from '../pages/Home'
import { useEffect } from 'react'
import getCurrentUser from '../features/getCurrentUser'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import verifyPayment from '../features/verify-order'

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const getUser = async () => {
            const data = await getCurrentUser();
            dispatch(setUserData(data))
        }

        getUser();
    }, [])

    useEffect(() => {
        const verifyStripePayment = async () => {
            const params = new URLSearchParams(window.location.search);
            const payment = params.get("payment");
            const sessionId = params.get("session_id");

            if (payment !== "success" || !sessionId) return;

            const data = await verifyPayment({ sessionId });
            console.log("stripe payment verification response: ", data);

            const user = await getCurrentUser();
            dispatch(setUserData(user));

            window.history.replaceState({}, "", window.location.pathname);
        }

        verifyStripePayment();
    }, [dispatch])
    
    return (
        <>
        <Home />
        </>
    )
}

export default App
