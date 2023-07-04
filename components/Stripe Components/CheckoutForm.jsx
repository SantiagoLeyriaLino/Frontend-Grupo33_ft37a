'use client';
import { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement, AddressElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
// import 'sweetalert2/src/sweetalert2.scss'

export default function CheckoutForm({ productos }) {
    const stripe = useStripe()
    const elements = useElements()
    const totalPay = useSelector(state => state.products.totalPay)
    const desc = useSelector(state=> state.products.desc)
    const cupon = useSelector(state=> state.products.cupon)


    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [email, setEmail] = useState('')
    const [data, setData] = useState({})
    const [dataPurchase, setDataPurchase] = useState({
        idUser: "",
        amount: 0,
        products: [],
        date: "",
    })

    const [addressData, setAddressData] = useState({
    })
    // const myCart = useSelector(state => state.courses.my_cart);
    // const addPurchase = async(email) =>{
    //     const response = await axios.post('https://backend-33ft37a-deploy.vercel.app/purchase',email)
    //     console.log(response);
    //  }
    const handleAddressChange = (event) =>{
        setAddressData({
            ...addressData,
            [event.elementType] : event.value
        })
        ;
    }
    console.log(addressData)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email) {

            if (!stripe || !elements) {
                return;
            }

            setIsProcessing(true)

            console.log(email);

            try {
                const response = await axios.post('https://backend-33ft37a-deploy.vercel.app/purchase', { data: {email: email ,dataPurchase:dataPurchase,addressData:addressData}})
                console.log(response);

                const responseTrans = await axios.post('https://backend-33ft37a-deploy.vercel.app/transactions', dataPurchase)
                console.log(responseTrans);

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
        setData(productos)
        console.log(productos);
        const userData = localStorage.getItem('user')
        if (userData) {
            if(cupon){
                const priceDesc = totalPay - desc
                setDataPurchase(prevDataPurchase=>({...prevDataPurchase,amount:priceDesc,cpDesc:1,desc:desc}))
            }else{
                setDataPurchase(prevDataPurchase=>({...prevDataPurchase,amount:totalPay,cpDesc:0,desc:0}))
            }
            const data = JSON.parse(userData)
            setEmail(data.data.email)
            const date = new Date()
            const options = {
                timeZoneName: "short",
              };
              const formattedDate = date.toLocaleString("en-US", options);
            setDataPurchase(prevDataPurchase=>({...prevDataPurchase,date:formattedDate}))
            setDataPurchase(prevDataPurchase => ({ ...prevDataPurchase, idUser: data.data._id }))


            // productos?.map(prod => {
            //     prod?.cantSelect?.map(can => {
            //         setDataPurchase(prevDataPurchase => ({
            //             ...prevDataPurchase,
            //             products: [
            //                 ...prevDataPurchase.products,
            //                 { productId: prod._id, size: can.size, cant: can.cant }
            //             ]
            //         }));
            //     });
            // });
            const arrayProducts = productos?.map(prod =>{
                return prod?.cantSelect?.map(can=>{
                    return {productId:prod._id,name:prod.name,size:can.size,cant:can.cant,price:prod.price*100,amount:((prod.price*100)*can.cant)}
                })
            })
            .flat()
            console.log(arrayProducts);
            setDataPurchase(prevDataPurchase=>({
                ...prevDataPurchase,
                products:arrayProducts
            }))
        }

    }, [productos,cupon])

    useEffect(() => {
    }, [])
    console.log(email);
    console.log(dataPurchase);
    console.log(totalPay);

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="w-[80%] mx-[auto]">
            <PaymentElement />
            <AddressElement options={{ mode: 'billing' }}
            onChange={handleAddressChange} />
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