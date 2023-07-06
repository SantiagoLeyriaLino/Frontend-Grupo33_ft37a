'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import cart from '../public/cart.png';
import Tippy from "@tippyjs/react"
import 'tippy.js/dist/tippy.css';

export default function MyCart({ notifyCart, myCart }) {

    console.log({ ESTOESELMENSAJE: myCart });
    return (
        <>
            {
                (notifyCart > 0)
                    ?
                    <Tippy
                        interactive={true}
                        placement="bottom"
                        delay={100}
                        theme="material"
                        content={
                            <div className="flex flex-col justify-around gap-y-[0.8rem] py-[1rem] w-[300px]">
                                {
                                    myCart.map((prod, index) => {
                                        let cant = prod?.cantSelect?.reduce((acu,pr)=> {
                                            return acu + pr.cant
                                        },0)
                                        console.log(cant);
                                        return (
                                            <div key={index} className="flex justify-between border-b-[1px] border-[#F56728] pb-[0.6rem] ">
                                                <Image
                                                    className=" h-[50px] object-cover w-[20%]"
                                                    src={prod.images[0]} alt="img-prod" width={200} height={200} />
                                                <div className="flex flex-col w-[75%]">
                                                    <span className="font-bold text-[1.1rem]">{prod.brand}</span>
                                                    <span className="text-[0.8rem] font-light">{prod.name}</span>
                                                   
                                                        <span className="font-bold text-[#F56728]">{`$ ${(cant*prod.price).toFixed(2)}`}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }>
                        <motion.div whileTap={{ scale: 0.92 }} whileHover={{ scale: 1.1 }} className='relative '>
                            {
                                (notifyCart > 0)
                                    ?
                                    <div className='absolute w-[20px] h-[20px] rounded-full bg-green-500 left-[65%] top-[10%] flex justify-center items-center   '>
                                        <span className='text-[0.8rem]'>{notifyCart}</span>
                                    </div>
                                    : <></>
                            }
                            <Image
                                src={cart} alt='ico-cart' width={50} height={50} />
                        </motion.div>
                    </Tippy>
                    :
                    <motion.div whileTap={{ scale: 0.92 }} whileHover={{ scale: 1.1 }} className='relative '>
                        {
                            (notifyCart > 0)
                                ?
                                <div className='absolute w-[20px] h-[20px] rounded-full bg-green-500 left-[65%] top-[10%] flex justify-center items-center   '>
                                    <span className='text-[0.8rem]'>{notifyCart}</span>
                                </div>
                                : <></>
                        }
                        <Image
                            src={cart} alt='ico-cart' width={50} height={50} />
                    </motion.div>
            }
        </>
    )
}