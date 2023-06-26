'use client'
import Summary from "@/components/Stripe Components/ContainerSummary";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js'
import { CardElement } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/Stripe Components/CheckoutForm";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY_PUBLIC}`); // estado "products"

export default function CheckoutPage() {

    // const options = {
    //     // passing the client secret obtained in step 3
    //     clientSecret: '{{CLIENT_SECRET}}',
    //     // Fully customizable with appearance API.
    //     appearance: {/*...*/},
    //   };

    if (typeof localStorage !== 'undefined'){ {const [products, setProducts] = useState()
    const [clientSecret, setClientSecret] = useState("");
    // const [stripePromise, setStripePromise] = useState("");
    const amount = useSelector(state => state.products.totalPay)

    // setStripePromise(loadStripe('pk_test_51NLR6uLcLCj2IYBvkClOWECjiBqzYZeLetrIKGc9QlEeC2tJQKMq12enElgMR9lJzingQYbAq09DR5Z8XmjRpEwp00xG9VyEUi'))

    const getMyCart = () => { // extrae localStorage y almacena en estado "products"
        const myCartLocal = localStorage.getItem("myCart")
        const myCart = JSON.parse(myCartLocal)
        console.log(myCart);
        setProducts(myCart)
    }

    const handleCantChange = (producId, newCant) => {
        console.log('aca estoy');
        const newCantProduct = products.map((product) => {

            if (product._id === producId) {
                console.log('lo encontre');
                return { ...product, cant: newCant };
            }
            return product
        })
        setProducts(newCantProduct)
    }

    const handleDeleteProductCart = (producId) => {
        console.log('voy a eliminar');
        const newArrayProduct = products.filter(product => {
            if (product._id !== producId) {
                return product
            }
        })
        setProducts(newArrayProduct)
    }

    useEffect(() => {
        getMyCart()
        console.log(products);
    }, [])

    useEffect(() => {
        localStorage.setItem('myCart', JSON.stringify(products))
    }, [products])

    const getClientSecret = async (amount) => {
        console.log(amount);
        try {
            const {data} = await axios.post('https://backend-grupo-33ft37a-jpaguo1zy-santiagoleyrialino.vercel.app/payment', { amount })
            setClientSecret(data.data)
        } catch (error) {
        console.log(error); 
        }
    }


    useEffect(() => {
        if (amount > 0) {
            getClientSecret(amount)
        }
    }, [amount])
    

    return (
        <main>

            <section className="pt-[10rem] pb-[4rem] flex w-[80%] mx-[auto] justify-between min-h-[100vh]">
                <div className="w-[60%] pt-[1rem]">
                {
                    stripePromise && clientSecret && (
                        <Elements stripe={stripePromise} options={{clientSecret}} >
                            {/* <CheckoutForm products={products}/> */}
                            <CheckoutForm />
                            {/* <CardElement className="w-[600px] h-[fit-content]"/> */}
                        </Elements>
                    )
                }
                </div>
                <div className="w-[40%] pt-[1rem]">
                <Summary products={products}
                    handleCantChange={handleCantChange}
                    handleDeleteProductCart={handleDeleteProductCart}
                />
                </div>
            </section>
        </main>
    )}
}