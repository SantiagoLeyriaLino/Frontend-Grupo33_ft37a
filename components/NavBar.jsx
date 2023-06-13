'use client'
import Image from "next/image"
import logo from '../public/logocommerce.png'
import cart from '../public/cart.png'
import Link from "next/link"
import Menu from "./Menu/Menu"


export default function NavBar() {
    return (
        <nav className="flex flex-col justify-between pt-[1rem]  gap-y-[1rem] fixed w-full z-20 bg-white border-b-2 border-black">
            <div className="flex justify-around w-full items-center">

                <Image src={logo} alt="logo-img" width={80} height={80} />
                <input className="bg-[#90909050] w-[45%] p-[0.6rem] rounded-[1rem]  pl-[1rem]" type="text" />
                <div className="flex items-center gap-x-[2rem]">
                    <Link href={'/login'}>Register/Login</Link>
                    <Image src={cart} alt="ico-cart" width={40} height={40} />
                </div>
            </div>
            <Menu/>

        </nav>
    )
}