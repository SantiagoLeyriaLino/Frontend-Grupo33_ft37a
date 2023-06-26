'use client'
import Image from "next/image";
import SummaryCard from "./SummaryCard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTotalPay } from "@/redux/Slice";

export default function ContainerSummary({ products, handleCantChange, handleDeleteProductCart }) {

    const [totalSum, setTotalSum] = useState(0)
    const [myCartLocal, setMyCartLocal] = useState()
    const dispatch = useDispatch()


    useEffect(() => {
        console.log('hola');
        setMyCartLocal(products)
    }, [products])

    useEffect(()=>{
        const total = myCartLocal?.reduce((acu, producto) => {
            return acu + (producto.price * producto.cant)
        }, 0)
        setTotalSum(total)
        dispatch(addTotalPay(total))
        
    },[myCartLocal])




    return (
        <div className="bg-[#454545] p-[0.6rem] flex flex-col gap-y-[1rem]">
            {
                products?.map((prod, index) => {
                    return (
                        <SummaryCard
                            key={index}
                            product={prod}
                            handleCantChange={handleCantChange}
                            handleDeleteProductCart={handleDeleteProductCart}
                            />
                    )
                })
            }
            <div className="flex flex-col justify-between pb-[1rem] gap-y-[1rem] px-[2rem]">
            <div className="flex justify-between">
                <h2 className="text-white">Sub total:</h2>
                <h2 className="text-white" >$ {totalSum}</h2>
            </div>
            <div className="flex justify-between">
                <h2 className="text-white">Cupon de desc:</h2>
                <h2 className="text-white">$ 0</h2>
            </div>
            <div className="flex justify-between pt-[1rem] border-[#F8652A] border-t-[1px]">
                <h2 className="text-white">Total:</h2>
                <h2 className="text-[#F8652A]">$ {totalSum}</h2>
            </div>

            </div>
            
            
        </div>
    )
}



    // useEffect(() => {

    //     let total = 0
    //     // const cart = localStorage.getItem("myCart")
    //     // const myCart = JSON.parse(cart)

    //     if (myCartLocal && myCartLocal.length > 0) {
    //         total = myCartLocal.reduce((acu, producto) => {
    //             return acu + (producto.price * producto.cant)
    //         }, 0)
    //         setTotalSum(total)
    //     }
    // }, [myCartLocal])

    // ------------------------------------------------------
    // useEffect(() => {
    //     console.log(products);
    //     const total = myCartLocal.reduce((acu, producto) => {
    //         return acu + (producto.price * producto.cant)
    //     }, 0)
    //     setTotalSum(total)

    //     window.addEventListener('storage', handleStorageChange);

    // }, [products])

    // const handleStorageChange = (event) => {
    //     if (event.storageArea === localStorage && event.key === 'myCart') {
    //         console.log('hola');
    //         const storedProducts = JSON.parse(event.newValue) || [];
    //         setMyCartLocal(storedProducts);

    //         const updatedTotalPrice = storedProducts.reduce((total, product) => {
    //             return total + product.price * product.cant;
    //         }, 0);
    //         setTotalSum(updatedTotalPrice);
    //     }
    // };