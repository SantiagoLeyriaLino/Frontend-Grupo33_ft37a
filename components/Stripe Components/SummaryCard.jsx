'use client'
import { forEach } from "lodash"
import Image from "next/image"
import { useEffect, useState } from "react"
import SizeCheck from "./SizeCheck"
import { useDispatch } from "react-redux"
import { addArrayPrice } from "@/redux/Slice"
export default function SummaryCard({ product,
    // handleCantChange,
    handleDeleteProductCart, sumCount, restCount, addSizeProduct }) {

    const [cant, setCant] = useState(product.cant)
    const [summaryProduct, setSummaryProduct] = useState(product)
    const [addSize, setAddSize] = useState(product?.size?.filter(elem => !product?.cantSelect?.some(cantItem => cantItem.size === elem.size)))
    const [cantTotal, setCantTotal] = useState(0)
    const dispatch = useDispatch()



    useEffect(() => {

        const cantTotales = product?.cantSelect?.reduce((acu, producto) => {
            return acu + producto.cant
        }, 0)
        setCantTotal(cantTotales)

        console.log(addSize);
        console.log(summaryProduct);
        // handleCantChange(product._id, cant)
        console.log(product._id);
        console.log(product.cantSelect);
        console.log(product);
    }, [cant, summaryProduct, addSize, product])

    useEffect(()=>{
        console.log(cantTotal);
        dispatch(addArrayPrice({id:product._id,priceTotal:cantTotal * product.price}))
    },[cantTotal])

    const handleAddSize = (id,prod) =>{
        const newArray = addSize.filter(product=>{
            product.size !== prod.size
        })

        setAddSize(newArray)
        
        addSizeProduct(id,prod)
    }

    return (
        <div>
            <div className="relative flex gap-x-[1rem] pb-[1rem] pt-[0.8rem] px-[0.4rem] border-[#F8652A] border-b-[2px]">
                <span
                    onClick={() => { handleDeleteProductCart(product._id) }}
                    className="cursor-pointer hover:bg-red-600 absolute font-bold bg-red-400 text-white right-[4px] top-[10px] px-[0.6rem] rounded-[0.4rem]">x</span>
                <Image
                    className="object-cover h-[60px] rounded-[0.4rem]"
                    src={product.images[0]} alt={product.title} width={100} height={0} />
                <div className="flex flex-col gap-y-[0.4rem]  w-[65%]">
                    <span className="font-semibold text-[1rem] text-white">{product.name}</span>
                    
                    <div className="flex gap-x-[0.4rem] ">
                        {
                            addSize?.map((prod, index) => {
                                if(prod.stock > 0){
                                    return (
                                        <span
                                            onClick={()=>{handleAddSize(product._id,prod)}}
                                            className="bg-[#DCDCDC] px-[0.4rem] rounded-[0.2rem] text-[0.6rem] cursor-pointer hover:bg-[#a1a1a1]"
                                            key={index}>{prod.size}</span>
                                    )
                                }
                            })
                        }
                    </div>
                    <div>
                        {
                            product?.cantSelect?.map((prod, index) => {
                                return (
                                    <SizeCheck
                                        key={index}
                                        id={product._id}
                                        cant={prod.cant}
                                        size={prod.size}
                                        summaryProduct={summaryProduct}
                                        // handleCantSelected={handleCantSelected}
                                        // handleResSelected={handleResSelected}
                                        restCount={restCount}
                                        sumCount={sumCount}
                                    />
                                )
                            })
                        }
                    </div>
                    <span className="font-medium text-[#F8652A]">$ {product.price * cantTotal}</span>
                </div>
            </div>
        </div>
    )
}


  // const myCartLocal = localStorage.getItem("myCart")
    // const myCart = JSON.parse(myCartLocal)
    // const newCart = myCart.map(producto=>{
    // })

    // const total = myCart.reduce((acu,producto)=>{
    //     return acu + (producto.price * producto.cant)
    // },0)
    // useEffect(()=>{
    // },[])


    // document.addEventListener('DOMContentLoaded', function () {
    //     console.log('hola');
    //     function handleStorageChange(event) {
    //         if (event.key === 'myCart') {
    //             console.log('Se ha detectado un cambio en el local storage para la clave "miClave"');
    //         }
    //     }

    //     window.addEventListener('storage', handleStorageChange);
    // })