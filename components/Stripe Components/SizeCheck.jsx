'use client'
import { useEffect, useState } from "react"

export default function SizeCheck({ summaryProduct, id, size, cant, restCount, sumCount }) {
    const [checked, setChecked] = useState(false)
    const [cantSize, setCantSize] = useState(cant)
    const [stock, setStock] = useState(0);

    const handleCheck = (event) => {
        const { checked } = event.target
        if (checked) {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }

    useEffect(() => {
        summaryProduct.size.map(siz => {
            if(siz.size === size){
                setStock(siz.stock)
            }
        }
        )
        console.log(size);
        if (checked) {
            console.log('hola');
            // handleCantSelected({ size: size, cant })
        } else {
            console.log('chau');
            // handleResSelected(size)
        }


    }, [cant, checked])
    console.log(cant);
    console.log(stock);
    console.log(summaryProduct)
    return (
        <div className="flex items-center gap-x-[1rem]">
            <div className="flex gap-x-[0.4rem]">
                <input onChange={handleCheck} type="checkbox" name="" value="" id="" />
                <span className="w-[16px] text-[#11111190]">{size}</span>
            </div>

            {
                checked
                    ?
                    <div className={`${checked ? "opacity-1" : "opacity-0"} flex h-[fit-content] gap-x-[0.6rem]`}>
                        <span className="text-black">x</span>
                        <div className="flex gap-x-[0.4rem]">
                            <div
                                className="  cursor-pointer"
                                onClick={()=>{restCount(id,size,stock,cant)}}
                            >
                                <span className="text-[#FA8B61] hover:text-[#F8652A] select-none">{`-`}</span></div>
                            <div className=" ">
                                <span className="text-[#FA8B61]">{cant}</span>
                            </div>
                            <div
                                className="cursor-pointer flex items-center"
                                onClick={()=>{sumCount(id,size,stock,cant)}}
                            >
                                <span className="text-[#FA8B61] hover:text-[#F8652A] select-none">{`+`}</span></div>
                        </div>
                    </div>

                    :
                    <div className="flex gap-x-[1.4rem]">
                        
                        <span className="text-[#11111190]">x</span>
                        <span className="text-[#11111190]">{cant}</span>

                        </div>
            }

        </div>
    )
}