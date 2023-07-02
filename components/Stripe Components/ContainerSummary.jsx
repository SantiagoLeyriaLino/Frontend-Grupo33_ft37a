'use client'
import Image from "next/image";
import SummaryCard from "./SummaryCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTotalPay, addDesc, changeCupon } from "@/redux/Slice";

export default function ContainerSummary({ products,
    //  handleCantChange,
      handleDeleteProductCart, restCount,sumCount,addSizeProduct}) {

    const [totalSum, setTotalSum] = useState(0)
    const [myCartLocal, setMyCartLocal] = useState()
    const dispatch = useDispatch()
    const arrayPrice = useSelector(state => state.products.arrayPrice)
    const [totalPay,setTotalPay] = useState(0)
    const [cupon,setCupon] = useState(0)
    const [cpActive,setCpActive] = useState(false)
    const totalPriceGlobal = useSelector(state => state.products.totalPay)
    const desc = useSelector(state => state.products.desc)

    const handleCheckCupon = (event) =>{
        const {checked} = event.target
        if(checked){
            setCpActive(true)
            const priceDesc = totalPriceGlobal - desc
            setTotalPay(priceDesc)
            dispatch(changeCupon(true))
        }else {
            setCpActive(false)
            setTotalPay(totalPriceGlobal)
            dispatch(changeCupon(false))
        }
    }   

    useEffect(()=>{
        if(cpActive){
            setCpActive(true)
            const priceDesc = totalPriceGlobal - desc
            setTotalPay(priceDesc)
            dispatch(changeCupon(true)) 
        }else{
            setCpActive(false)
            setTotalPay(totalPriceGlobal)
            dispatch(changeCupon(false))
        }
    },[totalPriceGlobal])


    useEffect(() => {
        setMyCartLocal(products)
        const userDataLocal = localStorage.getItem('user')
        const userDataParse = JSON.parse(userDataLocal)
        setCupon(userDataParse.data.cpDesc)

        console.log(products);
    }, [products])

    // useEffect(()=>{
    //     const total = myCartLocal?.reduce((acu, producto) => {
    //         return acu + (producto.price * producto.cant)
    //     }, 0)
    //     setTotalSum(total)
    //     dispatch(addTotalPay(total))
        
    // },[myCartLocal])

    useEffect(()=>{
        console.log(arrayPrice);
        const total = arrayPrice?.reduce((acu,producto)=>{
            console.log(producto.priceTotal);
            return acu + producto.priceTotal
        },0)
        console.log(total);
        setTotalPay(total)
        dispatch(addTotalPay(total))
        
    },[arrayPrice])


    console.log(cupon);

    return (
        <div className="bg-[#454545] p-[0.6rem] flex flex-col gap-y-[1rem]">
            {
                products?.map((prod, index) => {
                    return (
                        <SummaryCard
                            key={index}
                            product={prod}
                            // handleCantChange={handleCantChange}
                            handleDeleteProductCart={handleDeleteProductCart}
                            // handleCantSelected={handleCantSelected}
                            // handleResSelected={handleResSelected}
                            restCount={restCount}
                            sumCount={sumCount}
                            addSizeProduct={addSizeProduct}
                            />
                    )
                })
            }
            <div className="flex flex-col justify-between pb-[1rem] gap-y-[1rem] px-[2rem]">
            <div className="flex justify-between">
                <h2 className="text-white">Sub total:</h2>
                <h2 className="text-white" >$ {totalPriceGlobal}</h2>
            </div>
            {
                (cupon > 0)
                ?
            <div className="flex justify-between">
                <div className="flex gap-x-[0.2rem]">
                    <input type="checkbox" name="" id="" 
                    onChange={handleCheckCupon}
                    />
                    <h2 className={`${cpActive ? "text-white" : "text-[#ffffff30]"}`}>Cupon de desc 15%</h2>
                </div>
                <h2 className={`${cpActive ? "text-white" : "text-[#ffffff30]"}`}>1</h2>
            </div>
            :
            <div className="flex justify-between">
                <h2 className="text-[#ffffff30]">Cupon de desc 15%</h2>
                <h2 className="text-[#ffffff30]">0</h2>
            </div>
            

            }
            <div className="flex justify-between pt-[1rem] border-[#F8652A] border-t-[1px]">
                <h2 className="text-white">Total:</h2>
                <h2 className="text-[#F8652A]">$ {totalPay}</h2>
            </div>

            </div>
            
            
        </div>
    )
}
