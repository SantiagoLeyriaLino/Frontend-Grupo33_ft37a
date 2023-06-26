'use client'
import Link from "next/link";
import { useState } from "react"
import userBanner from '../public/userBanner.png'
import Image from 'next/image'
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export default function UserMenu({user}) {
    if (typeof localStorage !== 'undefined'){{ const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()
    
    const notify = (message) => {
        toast.success(message, {
            autoClose: 2000,
        });
    };
    const openMenu = () => {
        setIsOpen(true);
    };
    const closeMenu = () => {
        setIsOpen(false);
    };
    const handleClick = () => {
         localStorage.removeItem('user')
        notify('Logging out ...')
        setTimeout(()=> {router.push('/login')}, 3000)
    }

    return (
            <div
                onMouseEnter={openMenu}
                onMouseLeave={closeMenu}
                className="relative ">
                <Image
                    className=" flex block pb-[0.4rem] self-center"
                    src={userBanner} alt={'user'} width={40} height={40}/>
                {
                    isOpen
                        ?
                        <ul className="absolute bg-white flex flex-col ">
                            <div
                                className="relative ">
                                <Link href={'/profile'}><li className={`hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer`}>Profile account</li></Link>
                            </div>
                            <div
                                className="relative ">
                                <Link href={'/purchaseHistory'}><li className={`hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer`}>Purchase history</li></Link>
                            </div>
                            <li onClick={handleClick} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Log out</li>
                        </ul>
                        :
                        <></>
                }
            <ToastContainer/>
            </div>
    )}
}