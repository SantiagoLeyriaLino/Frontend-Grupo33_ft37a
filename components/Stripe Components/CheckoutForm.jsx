'use client';
import { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement, AddressElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
// import 'sweetalert2/src/sweetalert2.scss'

export default function CheckoutForm({ products }) {
    const stripe = useStripe()
    const elements = useElements()


    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [email, setEmail] = useState('')
    // const myCart = useSelector(state => state.courses.my_cart);
    // const addPurchase = async(email) =>{
    //     const response = await axios.post('http://localhost:3001/purchase',email)
    //     console.log(response);
    //  }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email) {

            if (!stripe || !elements) {
                return;
            }


            setIsProcessing(true)

            console.log(email);

            try {
                const response = await axios.post('https://backend-33ft37a-deploy.vercel.app/purchase', { email: email })
                console.log(response);
                
                const { error } = await stripe.confirmPayment({
                    elements,
                    confirmParams: {
                        return_url: `${window.location.origin}/checkout/confirmated`
                    },
                    //redirect: 'if_required',
                })
                console.log(error);
                setIsProcessing(false)
    
                
            } catch (error) {
                console.log(error);
            }


        }
        else {

            Swal.fire({
                title: 'User not logged in!',
                text: 'Please login to checkout',
                icon: 'error',
                confirmButtonText: 'continue',
                footer: '<a href="https://frontend-grupo33-ft37a.vercel.app/login">Go login?</a>'
            })
        }

    };



    useEffect(() => {
        const userData = localStorage.getItem('user')
        if(userData){
            const data = JSON.parse(userData)
            setEmail(data.data.email)
        }

    }, [])
    console.log(email);

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="w-[80%] mx-[auto]">
            <PaymentElement />
            <AddressElement options={{ mode: 'billing' }} />
            <button className="py-[0.4rem]  px-[0.8rem] text-white bg-[#F8662B] mt-[1rem] rounded-[0.8rem]" disabled={isProcessing} id="submit">
                <span className="" id="button-text">
                    {isProcessing ? "Processing ... " : "Pay now"}
                </span>
            </button >

            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}