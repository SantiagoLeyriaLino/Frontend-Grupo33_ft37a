'use client'
import Link from "next/link";
import { useState } from "react"
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const pathname = usePathname()
    const router = useRouter()

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
    const openMenu5 = () => {
        setIsOpen5(true);
    };
    const closeMenu5 = () => {
        setIsOpen5(false);
    };


    return (
        <div className="shadow-lg">
            <ul className="flex justify-between items-center   w-[65%] mx-[auto]">
                <Link href={'/'}>
                    <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                        whileTap={{ scale: 0.92 }}
                        className={`block pb-[0.4rem] font-bold ${pathname === '/' ? 'border-b-2 border-black' : ''}`}
                    >HOME</motion.li>
                </Link>

                <div
                    onMouseEnter={openMenu}
                    onMouseLeave={closeMenu}
                    className="relative ">
                    <Link href={'/products'}>
                        <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                            whileTap={{ scale: 0.92 }}
                            className={`block pb-[0.4rem] font-bold
                        ${pathname.includes('/products') && !pathname.includes('/create') ? 'border-b-2 border-black' : ''}`}
                        >PRODUCTS</motion.li>
                    </Link>
                    {
                        isOpen
                            ?
                            <ul className="absolute bg-white flex flex-col ">
                                <div
                                    onMouseEnter={openMenu2}
                                    onMouseLeave={closeMenu2}
                                    className="relative ">
                                    <Link href={'/products/hombres'}><li className={`hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer ${isOpen2 === true ? 'bg-[#909090] text-white' : ''}`}>Male</li></Link>
                                    {
                                        isOpen2
                                            ?
                                            <ul className="absolute bg-white flex flex-col left-[100%] top-0 ">
                                                <Link href={'/products/hombres/zapatillas'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Shoes</Link>
                                                <Link href={'/products/hombres/buzos'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Hoodies</Link>
                                                <Link href={'/products/hombres/remeras'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">T-shirts</Link>
                                                <Link href={'/products/hombres/pantalones'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Pants</Link>
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
                                                <Link href={'/products/female/hoodie'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Hoodies</Link>
                                                <Link href={'/products/female/t-shirt'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">T-shirts</Link>
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
                                    <Link href={'/products/boy'}><li className={`hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer ${isOpen4 === true ? 'bg-[#909090] text-white' : ''}`}>Boy</li></Link>
                                    {
                                        isOpen4
                                            ?
                                            <ul className="absolute bg-white flex flex-col left-[100%] top-0 ">
                                                <Link href={'/products/boy/shoes'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Shoes</Link>
                                                <Link href={'/products/boy/sweatshirt'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Hoodies</Link>
                                                <Link href={'/products/boy/shirt'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">T-shirts</Link>
                                                <Link href={'/products/boy/pants'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Pants</Link>
                                            </ul>
                                            :
                                            <></>
                                    }

                                </div>

                                <div
                                    onMouseEnter={openMenu5}
                                    onMouseLeave={closeMenu5}
                                    className="relative ">
                                    <Link href={'/products/girl'}><li className={`hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer ${isOpen5 === true ? 'bg-[#909090] text-white' : ''}`}>Girl</li></Link>
                                    {
                                        isOpen5
                                            ?
                                            <ul className="absolute bg-white flex flex-col left-[100%] top-0 ">
                                                <Link href={'/products/girl/shoes'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Shoes</Link>
                                                <Link href={'/products/girl/sweatshirt'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Hoodies</Link>
                                                <Link href={'/products/girl/shirt'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">T-shirts</Link>
                                                <Link href={'/products/girl/pants'} className="hover:bg-[#909090] hover:text-[white] pl-[0.4rem] pr-[2rem] py-[0.6rem] cursor-pointer">Pants</Link>
                                            </ul>
                                            :
                                            <></>
                                    }

                                </div>

                            </ul>
                            :
                            <></>
                    }
                </div>
                <Link href={'/about'}>
                    <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                        whileTap={{ scale: 0.92 }}
                        className={`block pb-[0.4rem] font-bold ${pathname === '/about' ? 'border-b-2 border-black' : ''}`}
                    >ABOUT</motion.li>
                </Link>
               
                    <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={()=>router.push('/serach')}
                        className={`block pb-[0.4rem] font-bold ${pathname === '/search' ? 'border-b-2 border-black' : ''}`}
                    >SHOP</motion.li>
              
                {/* <Link href={'/products/create'}>
                <motion.li initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.2}}
                    whileTap={{ scale: 0.92}}
                    className={`block pb-[0.4rem] font-bold ${pathname === '/products/create'? 'border-b-2 border-black' : ''}`}
                >CREATE</motion.li>
            </Link> */}
            </ul>
        </div>
    )
}