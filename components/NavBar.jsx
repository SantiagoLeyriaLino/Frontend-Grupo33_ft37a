'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import logo from '../public/logo.png';
import cart from '../public/cart.png';
import Link from 'next/link';
import Menu from './Menu/Menu';
import userBanner from '../public/userBanner.png';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { debounce, set } from 'lodash';
import { searchProducts, clearState, newNotifyCart, setFilters } from '@/redux/Slice';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import magnify from '../public/magnify.png'

import { RxDashboard, RxPerson } from 'react-icons/rx';
import MyCart from './MyCart';

export default function NavBar() {
	const [search, setSearch] = useState(null);
	const [userData, setUserData] = useState({});
	const router = useRouter();
	const dispatch = useDispatch();
	const [ isOpen, setIsOpen ] = useState(false)
	const [myCart, setMyCart] = useState()

	const notifyCart = useSelector(state=> state.products.notifyCart)

	useEffect(() => {
		let data = JSON.parse(localStorage.getItem('user'));
		if (data && data.data) setUserData(data);
	}, []);

	useEffect(() => {
		console.log('hola');
		const myCartLocal = localStorage.getItem('myCart');
		if (!myCartLocal) {
			localStorage.setItem('myCart', JSON.stringify([]));
		}else{
			const myCartParse = JSON.parse(myCartLocal)
				console.log(myCartParse);
				dispatch(newNotifyCart(myCartParse.length))
				setMyCart(myCartParse)
				console.log({ESTAMOSACAAADSADQEWQ:myCart});
		}
	}, [notifyCart,dispatch]);

	const pathname = usePathname();
	useEffect(() => {
		if (!pathname.includes('/search')) {
			setSearch('');
		}
	}, [pathname]);


	const handleChange = (event) => {
		const searchTerm = event.target.value;
		setSearch(searchTerm);
		
		// if (pathname.includes('/search')) {
		// 	debouncedSearch(searchTerm);
		// }
	};
	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			dispatch(searchProducts(search));
			router.push('/search');
		}
	};

	useEffect(() => {
		if (search == null && pathname.includes('/search')) {
			dispatch(searchProducts());
		}
	}, [search, dispatch]);

	
	console.log(userData);

	return (
		<nav className='flex flex-col justify-between pt-[1rem]  gap-y-[1.1rem] fixed w-full z-50 bg-white'>
			<div className='flex justify-around w-full items-center '>
					<Link href={'/'}>
						<Image className='w-[100px] h-auto relative left-[5rem]'
						src={logo} alt='logo-img' width={200} height={200}/> {/* VER PARA QUE LIMPIE EL BUSCADOR AL CLIQUEAR*/}
					</Link>
				<div className='flex align-baseline justify-between w-[50%] '>
					<motion.div className=" flex justify-end relative w-[70%]" initial={false} animate={isOpen ? "open" : "closed"}>
						<motion.input variants={{
							open: {
								clipPath: "none",
								width: "100%",
								opacity: 1,
								transition: {
								type: "spring",
								bounce: 0,
								duration: 0.7,
								delayChildren: 0.3,
								staggerChildren: 0.05
								}
							},
							closed: {
								clipPath: "none",
								width: "14%",
								opacity: 0,
								transition: {
								type: "spring",
								bounce: 0,
								duration: 0.7
								}
							}
						}}
							className='bg-white rounded text-[0.9rem] w-[500px] h-[40px] border-[2px] border-black border-solid" p-[0.3rem] pl-[1rem]'
							type='text'
							onKeyPress={handleKeyPress}
							onChange={handleChange}
							value={search}
							placeholder='Search a product'
						/><motion.div whileHover={{scale: 1.01}}>
							<Image className='flex relative top-[0.4rem] right-[2.2rem] cursor-pointer'
							src={magnify} alt={'magnify'} width={26} height={26}
							onClick={() => setIsOpen(!isOpen)}/>
						</motion.div>
					</motion.div>

				<div className={`flex items-center justify-between gap-x-[2rem] 
				 ${userData && userData.data ? "w-[20%]" : "w-[30%]"}`}>
				<Link href={'/checkout'} className={` ${(userData && userData?.data?.isAdmin) ? "hidden" : ""}`}>

					{
						(myCart)
						? 
						<MyCart notifyCart={notifyCart} myCart={myCart}/>
						:
						<></>
					}
						
					{/* <motion.div whileTap={{ scale: 0.92}} whileHover={{scale: 1.1}} className='relative '>
						{
							(notifyCart>0)
							?
						<div className='absolute w-[20px] h-[20px] rounded-full bg-green-500 left-[65%] top-[10%] flex justify-center items-center   '>
							<span className='text-[0.8rem]'>{notifyCart}</span>
						</div>
						:<></>
						}
						<Image 
						src={cart} alt='ico-cart' width={50} height={50} />
					</motion.div> */}
				</Link>
				<div className={`bg-purple-800 text-white p-[0.6rem] rounded-lg ${(userData && userData?.data?.isAdmin) ? "inline-block" : "hidden" } `}>
					<Link href={'/admin'}>
						<RxDashboard size={30} />
					</Link>
				</div>
					{/* {
						(userData && userData.data)
							?
							userData.data.isAdmin ?
								<div className='bg-purple-800 text-white p-[0.6rem] rounded-lg inline-block'>
									<Link href={'/admin'}>
										<RxDashboard size={30} />
									</Link>
								</div>
								:
								<Link href={'/checkout'}>
									<Image src={cart} alt='ico-cart' width={40} height={40} />
								</Link>
							:
							<></>
					} */}
					{userData && userData.data ? (
						<Link href={'/profile'}>
							<motion.div whileTap={{ scale: 0.92}} whileHover={{scale: 1.1}}>
								<Image 
								className='rounded-full '
								src={userData.data.image[0]} alt='img-user' width={50} height={50} />
							</motion.div>
						</Link>
					) : (
						<Link href={'/login'} className='bg-black text-white font-semibold text-[0.9rem] p-[0.4rem] rounded'
						>Register/Login</Link>
					)}
				</div>
				</div>
			</div>
			<Menu />
		</nav>
	);
}
