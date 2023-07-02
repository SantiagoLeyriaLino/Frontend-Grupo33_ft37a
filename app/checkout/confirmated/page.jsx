'use client'
import Swal from "sweetalert2"
import Image from "next/image"
import confirm from '../../../public/confirmated.jpg'
import { useEffect } from "react"
 

export default function ConfirmatedPage (){
    useEffect(()=>{
        Swal.fire({
            title: 'Successful purchase!',
            text: 'Review the purchase data we sent to your email address',
            icon: 'success',
            confirmButtonText: '<a href="https://frontend-grupo33-ft37a.vercel.app/">Continue</a>'
            
        })
        localStorage.setItem('myCart',JSON.stringify([]))
    },[])
    return (
        <main className="pt-[10rem] min-h-[100vh]">
            <div className="w-[90%] relative mx-[auto]">
                <p className="absolute text-white font-bold text-[3rem] bottom-[2rem] left-[2rem] bg-[#90909050] py-[1rem] px-[1.4rem] rounded-[1rem]">Thank you for your purchase,<br/> have a nice day!</p>
                <Image src={confirm} alt="img" width={1200} height={1200}
                className="w-[100%] object-cover  h-[75vh]"
                />
            </div>
            
        </main>
    )
}