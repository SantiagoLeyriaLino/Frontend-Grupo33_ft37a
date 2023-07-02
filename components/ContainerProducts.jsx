'use client'
import ProductCard from "./ProductCard"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import SkeletonContainerProducts from "./SkeletonComponents/SkeletonContainerProducts"

export default function ContainerProducts({products}) {

    const errorSearch = useSelector((state)=>state.products.error)
    const [errorState, setErrorState] = useState(false)

    useEffect(()=>{
        setErrorState(errorSearch);
        console.log({ESTOESERROR:errorSearch})
    },[errorSearch])

    return (
        <div className="flex flex-wrap p-[2rem] justify-between gap-y-[2rem]">
            {errorState?
             <div className="flex justify-center items-start h-screen mx-auto">
             <h1 className="text-center mt-12">There is no result for your search.</h1>
           </div>
            :
               ( products
                ?
                products.map((product)=>{
                    return(
                        <ProductCard
                        key={product._id}
                        product={product}
                        />
                    )
                })

                :
                <SkeletonContainerProducts/>)
                
            }

        </div>
    )
}