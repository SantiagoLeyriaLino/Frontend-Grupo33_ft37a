'use client'
import Link from "next/link";
import { useState } from "react"

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);

    const openMenu = () => {
        setIsOpen(true);
    };
    const closeMenu = () => {
        setIsOpen(false);
    };

    const openMenu2 = () => {
        setIsOpen2(true);
    };
    const closeMenu2 = () => {
        setIsOpen2(false);
    };

    const openMenu3 = () => {
        setIsOpen3(true);
    };
    const closeMenu3 = () => {
        setIsOpen3(false);
    };

    const openMenu4 = () => {
        setIsOpen4(true);
    };
    const closeMenu4 = () => {
        setIsOpen4(false);
    };


    return (
        <ul className="flex justify-around items-center ">
            <Link href={'/'}>
            <li
                className="block pb-[0.4rem]"
                >Home</li>
                </Link>
            <Link
                className="block pb-[0.4rem]"
                href={'/about'}
            >About</Link>
            <div
                onMouseEnter={openMenu}
                onMouseLeave={closeMenu}
                className="relative ">
                <Link
                    className="block pb-[0.4rem]"
                    href={'/products'}>Products</Link>
                {
                    isOpen
                        ?
                        <ul className="absolute bg-white flex flex-col ">
                            <div
                                onMouseEnter={openMenu2}
                                onMouseLeave={closeMenu2}
                                className="relative ">
                                <Link href={'/products/hombres'}><li className={`hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer ${isOpen2 === true ? 'bg-[#909090] text-white' : ''}`}>Hombres</li></Link>
                                {
                                    isOpen2
                                        ?
                                        <ul className="absolute bg-white flex flex-col left-[100%] top-0 ">
                                            <Link href={'/products/hombres/zapatillas'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Zapatillas</Link>
                                            <Link href={'products/hombres/buzos'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Buzos</Link>
                                            <Link href={'/products/hombres/remeras'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Remeras</Link>
                                            <Link href={'/products/hombres/pantalones'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Pantalones</Link>
                                        </ul>
                                        :
                                        <></>
                                }
                            </div>

                            <div
                                onMouseEnter={openMenu3}
                                onMouseLeave={closeMenu3}
                                className="relative ">

                                <Link href={'/products/female'}><li className={`hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer ${isOpen3 === true ? 'bg-[#909090] text-white' : ''}`}>Female</li></Link>
                                {
                                    isOpen3
                                        ?
                                        <ul className="absolute bg-white flex flex-col left-[100%] top-0 ">
                                            <Link href={'/products/female/shoes'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Shoes</Link>
                                            <Link href={'/products/female/hoodie'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Sweatshirt</Link>
                                            <Link href={'/products/female/t-shirt'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Shirt</Link>
                                            <Link href={'/products/female/pants'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Pants</Link>
                                        </ul>
                                        :
                                        <></>
                                }
                            </div>

                            <div
                                onMouseEnter={openMenu4}
                                onMouseLeave={closeMenu4}
                                className="relative ">
                                <Link href={'/products/children'}><li className={`hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer ${isOpen4 === true ? 'bg-[#909090] text-white' : ''}`}>Children</li></Link>
                                {
                                    isOpen4
                                        ?
                                        <ul className="absolute bg-white flex flex-col left-[100%] top-0 ">
                                            <Link href={'/products/children/shoes'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Shoes</Link>
                                            <Link href={'/products/children/sweatshirt'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Sweatshirt</Link>
                                            <Link href={'/products/children/shirt'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Shirt</Link>
                                            <Link href={'/products/children/pants'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Pants</Link>
                                        </ul>
                                        :
                                        <></>
                                }

                            </div>
                            <li className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Accesorios</li>
                        </ul>
                        :
                        <></>
                }
            </div>
            <Link href={'/products/create'}>
            <li
                className="block pb-[0.4rem]"
                >Create</li>
                </Link>
        </ul>
    )
}