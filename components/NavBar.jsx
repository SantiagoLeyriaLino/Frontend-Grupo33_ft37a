'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import logo from '../public/logo.png';
import cart from '../public/cart.png';
import Link from 'next/link';
import Menu from './Menu/Menu';
import userBanner from '../public/userBanner.png';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { searchProducts, clearState } from '@/redux/Slice';
import { useSession } from 'next-auth/react';
import axios from 'axios';

import { RxDashboard, RxPerson } from 'react-icons/rx';

export default function NavBar() {
	const [search, setSearch] = useState(null);
	const [userData, setUserData] = useState({});
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		let data = JSON.parse(localStorage.getItem('user'));
		if (data && data.data) setUserData(data);
	}, []);

	useEffect(() => {
		const myCartLocal = localStorage.getItem('myCart');
		if (!myCartLocal) {
			localStorage.setItem('myCart', JSON.stringify([]));
		}
	}, []);

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
		if (search == null && pathname.includes('search')) {
			dispatch(searchProducts());
		}
	}, [search, dispatch]);

	console.log(userData);

	return (
		<nav className='flex flex-col justify-between pt-[1rem]  gap-y-[1rem] fixed w-full z-50 bg-white border-b-2 border-black'>
			<div className='flex justify-around w-full items-center'>
				<Link href={'/'}>
					<Image src={logo} alt='logo-img' width={80} height={80} />
				</Link>
				<input
					className='bg-[#90909050] w-[40%] p-[0.6rem] rounded-[1rem]  pl-[1rem]'
					type='text'
					onKeyPress={handleKeyPress}
					onChange={handleChange}
					value={search}
				/>
				<div className={`flex items-center justify-between gap-x-[2rem]
				 ${userData && userData.data ? "w-[15%]" : "w-[20%]"}`}>
				<Link href={'/checkout'} className={`${(userData && userData?.data?.isAdmin) ? "hidden" : ""}`}>
									<Image src={cart} alt='ico-cart' width={40} height={40} />
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
						<Image 
						className='rounded-full h-[50px] w-[50px] object-cover'
						src={userData.data.image[0]} alt='img-user' width={50} height={50} />
						</Link>
					) : (
						<Link href={'/login'}>Register/Login</Link>
					)}
				</div>
			</div>
			<Menu />
		</nav>
	);
}
