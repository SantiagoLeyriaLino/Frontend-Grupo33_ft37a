'use client'
import { useEffect, useState } from "react"

export default function SizeSelected({ size, stock, handleCantSelected, handleResSelected, handleSumActiveCart,handleResActiveCart }) {
    const [checked, setChecked] = useState(false)
    const [cant, setCant] = useState(1)

    const handleCheck = (event) => {
        const { checked } = event.target
        if (checked) {
            setChecked(true)
            handleSumActiveCart(1)
        } else {
            setChecked(false)
            handleResActiveCart(1)
        }
    }

    const handleResCant = () => {
        (cant > 1) && setCant(cant - 1)
    }
    const handleSumCant = () => {
        (cant < stock) && setCant(cant + 1)
    }

    useEffect(() => {
        console.log(size);
        if (checked) {
            console.log('hola');
            handleCantSelected({ size: size, cant })
        } else {
            console.log('chau');
            handleResSelected(size)
        }


    }, [cant, checked])
    console.log(cant);
    return (
        <>
            {
                (stock > 0)
                    ?

                    <div className="flex items-center gap-x-[0.4rem]">
                        <input  onChange={handleCheck} type="checkbox" name="" value="" id="" />
                        <span className="w-[16px]">{size}</span>

                        <div className={`${checked ? "opacity-1" : "opacity-0"} flex h-[fit-content] gap-x-[0.4rem]`}>
                            <span>Cant</span>
                            <div className="flex">
                                <div
                                    className="flex items-center justify-center bg-[#FA8B61] hover:bg-[#F8652A] px-[0.2rem] rounded-l-[0.6rem]  cursor-pointer"
                                    onClick={handleResCant}
                                >
                                    <span className="text-[0.7rem]">{`<`}</span></div>
                                <div className="flex items-center justify-center w-[20px] bg-white text-center  text-black ">
                                    <span className="text-[0.7rem]">{cant}</span>
                                </div>
                                <div
                                    className="flex items-center justify-center bg-[#FA8B61] hover:bg-[#F8652A] px-[0.2rem] rounded-r-[0.6rem] cursor-pointer"
                                    onClick={handleSumCant}
                                >
                                    <span className="text-[0.7rem]">{`>`}</span></div>
                            </div>
                        </div>

                    </div>
                    :
                    <></>
            }
        </>
    )
}