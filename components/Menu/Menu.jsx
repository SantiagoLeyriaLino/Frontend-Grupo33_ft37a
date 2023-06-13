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
            <li
                className="block pb-[0.4rem]"
            >Home</li>
            <li
                className="block pb-[0.4rem]"
            >About</li>
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
                                <li className={`hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer ${isOpen2 === true ? 'bg-[#909090] text-white' : ''}`}>Hombres</li>
                                {
                                    isOpen2
                                        ?
                                        <ul className="absolute bg-white flex flex-col left-[100%] top-0 ">
                                            <li className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Zapatillas</li>
                                            <li className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Buzos</li>
                                            <li className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Remeras</li>
                                            <li className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Pantalones</li>
                                        </ul>
                                        :
                                        <></>
                                }
                            </div>

                            <div
                                onMouseEnter={openMenu3}
                                onMouseLeave={closeMenu3}
                                className="relative ">

                                <li className={`hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer ${isOpen3 === true ? 'bg-[#909090] text-white' : ''}`}>Mujeres</li>
                                {
                                    isOpen3
                                        ?
                                        <ul className="absolute bg-white flex flex-col left-[100%] top-0 ">
                                            <li className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Zapatillas</li>
                                            <li className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Buzos</li>
                                            <li className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Remeras</li>
                                            <li className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Pantalones</li>
                                        </ul>
                                        :
                                        <></>
                                }
                            </div>

                            <div
                                onMouseEnter={openMenu4}
                                onMouseLeave={closeMenu4}
                                className="relative ">
                                <li className={`hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer ${isOpen4 === true ? 'bg-[#909090] text-white' : ''}`}>Infantil</li>
                                {
                                    isOpen4
                                        ?
                                        <ul className="absolute bg-white flex flex-col left-[100%] top-0 ">
                                            <li className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Zapatillas</li>
                                            <li className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Buzos</li>
                                            <li className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Remeras</li>
                                            <li className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Pantalones</li>
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
            <li
                className="block pb-[0.4rem]"
            >More</li>
        </ul>
    )
}