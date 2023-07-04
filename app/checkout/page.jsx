'use client'
import Summary from "@/components/Stripe Components/ContainerSummary";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js'
import { CardElement } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/Stripe Components/CheckoutForm";
import { useRouter } from "next/navigation";
import stripeImg from "../../public/stripee.png"
import Image from "next/image";

import { addTotalPay } from "@/redux/Slice";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY_PUBLIC}`); // estado "products"

export default function CheckoutPage() {


    const [products, setProducts] = useState()
    const [clientSecret, setClientSecret] = useState("");
    const totalPay = useSelector(state => state.products.totalPay)
    const desc = useSelector(state => state.products.desc)
    const cupon = useSelector(state=> state.products.cupon)

    const router = useRouter()
    const dispatch = useDispatch()

    const [sizeCheck, setSizeCheck] = useState([])
    const [cantSelect, setCantSelect] = useState([])
    const [amount,setAmount] = useState(totalPay)

    const getMyCart = () => { // extrae localStorage y almacena en estado "products"
        const myCartLocal = localStorage.getItem("myCart")
        const myCart = JSON.parse(myCartLocal)
        console.log(myCart.lenght);
        if(!myCart){
            router.push('/')
        }
        setProducts(myCart)
        
    }

    // const addMyCart = () => {
    //     console.log(product.cant);
    //     const myCartLocal = localStorage.getItem('myCart')
    //     const myCartParse = JSON.parse(myCartLocal)
    //     const productFind = myCartParse.find(prod => (prod._id === product._id) && (prod.cant === cant))
    //     if (!productFind) {
    //         if (myCartParse.length === 0) {
    //             const cantzero = cantSelect.shift()
    //             localStorage.setItem('myCart', JSON.stringify([{ ...product, cant: cant, cantSelect: cantSelect }]))
    //             notify('Add to Cart')
    //         } else {
    //             const cantzero = cantSelect.shift()
    //             const productMyCart = { ...product, cant: cant, cantSelect:cantSelect }
    //             const sameProduct = myCartParse.find(prod => prod._id === product._id)
    //             if (!sameProduct) {
    //                 const myCart = [...myCartParse, productMyCart]
    //                 console.log(myCart);
    //                 localStorage.setItem('myCart', JSON.stringify(myCart))
    //                 notify('Add to Cart')
    //             } else {

    //                 console.log(sameProduct);
    //                 const arrayFilter = myCartParse.filter(prod => prod._id !== sameProduct._id)
    //                 const newArray = [...arrayFilter, productMyCart]
    //                 localStorage.setItem('myCart', JSON.stringify(newArray))
    //                 notify('Add to Cart')
    //             }
    //         }

    //     } else {
    //         notifyError('Already added to cart')
    //     }
    // }

    const addSizeProduct = (id,prod) =>{
        const {size} = prod
        console.log(prod);
        setProducts(prevProducts =>{
                return prevProducts.map(producto=>{
                    if(producto._id === id){
                        return {
                            ...producto,
                            cantSelect:[...producto.cantSelect,{size,cant:1}]
                        }
                    }
                    return producto
                })
            
        })
            
        
    }

    const restCount = (id, size, stock, cant) => {
        console.log('entre');
        setProducts(prevProducts => {
            return prevProducts.map(producto => {
                console.log(producto._id);
                console.log(id);
                if (producto._id === id) {
                    const updatedCantSelect = producto.cantSelect.map(cantSelect => {
                        console.log(cantSelect.size)
                        if (cantSelect.size === size) {
                            const newCant = cantSelect.cant - 1;
                            console.log(stock);
                            if (newCant >= 1) {
                                return {
                                    ...cantSelect,
                                    cant: newCant
                                };
                            }
                        }
                        return cantSelect;
                    });
                    return {
                        ...producto,
                        cantSelect: updatedCantSelect
                    };
                }
                return producto;
            });
        });
    }

    // sumCount(id,size,stock,cant)
    const sumCount = (id, size, stock, cant) => {
        console.log('entre');
        setProducts(prevProducts => {
            return prevProducts.map(producto => {
                console.log(producto._id);
                console.log(id);
                if (producto._id === id) {
                    const updatedCantSelect = producto.cantSelect.map(cantSelect => {
                        console.log(cantSelect.size)
                        if (cantSelect.size === size) {
                            const newCant = cantSelect.cant + 1;
                            console.log(stock);
                            if (newCant <= stock) {
                                return {
                                    ...cantSelect,
                                    cant: newCant
                                };
                            }
                        }
                        return cantSelect;
                    });
                    return {
                        ...producto,
                        cantSelect: updatedCantSelect
                    };
                }
                return producto;
            });
        });
    };

    // const handleCantSelected = (size) => {
    //     console.log(size);
    //     if (products?.cantSelect?.length === 0) {
    //         setCantSelect(size)
    //     } else {
    //         const sizeSelect = products?.cantSelect?.find(elem => elem.size === size.size)
    //         if (!sizeSelect) {
    //             setCantSelect([...cantSelect, size])
    //         }

    //         else {
    //             const newArray = cantSelect.filter(elem => elem.size !== size.size)
    //             const sumArray = [...newArray, size]
    //             setCantSelect(sumArray)
    //         }
    //     }

    // }

    // const handleResSelected = (size) => {
    //     console.log(size);
    //     const newArray = products?.cantSelect?.filter(ele => ele.size !== size)
    //     console.log(newArray);
    //     setCantSelect(newArray)
    // }


    // const handleCantChange = (producId, newCant) => {
    //     console.log('aca estoy');
    //     const newCantProduct = products.map((product) => {

    //         if (product._id === producId) {
    //             console.log('lo encontre');
    //             return { ...product, cant: newCant };
    //         }
    //         return product
    //     })
    //     setProducts(newCantProduct)
    // }

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
        if(cupon){
            setAmount(totalPay - desc)
        }else {
            setAmount(totalPay)
        }
        getMyCart()
        console.log(products);
        
    }, [cupon,totalPay])

    useEffect(() => {
        console.log('hola');
        console.log(products);
        if(products){
            localStorage.setItem('myCart', JSON.stringify(products))
        }

        const myCartLocal = localStorage.getItem("myCart")
        const myCart = JSON.parse(myCartLocal)
        if(myCart.length === 0){
            dispatch(addTotalPay(0))
            router.push('/')
        }
    }, [products])

    const getClientSecret = async (amount) => {
        console.log(amount);
        try {
            const { data } = await axios.post('https://backend-33ft37a-deploy.vercel.app/payment', { amount })
            setClientSecret(data.data)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        console.log(amount);
        if (amount > 0) {
            getClientSecret(amount)
        }
    }, [amount])


    return (
        <main>

            <section className="pt-[10rem] pb-[4rem] flex w-[80%] mx-[auto] justify-between min-h-[100vh]">
                <div className="w-[60%] pt-[1rem] flex flex-col gap-y-[0.6rem] items-center">
                    {
                        stripePromise && clientSecret && (
                            <Elements stripe={stripePromise} options={{ clientSecret }} >
                                <CheckoutForm productos={products} />
                            </Elements>
                        )
                    }
                    <Image src={stripeImg} alt="power-stripe" width={150} height={150}/>
                </div>
                <div className="w-[40%] pt-[1rem]">
                    <Summary products={products}
                        // handleCantChange={handleCantChange}
                        handleDeleteProductCart={handleDeleteProductCart}
                        // handleCantSelected={handleCantSelected}
                        // handleResSelected={handleResSelected}
                        restCount={restCount}
                        sumCount={sumCount}
                        addSizeProduct={addSizeProduct}
                    />
                </div>
            </section>
        </main>
    )
}