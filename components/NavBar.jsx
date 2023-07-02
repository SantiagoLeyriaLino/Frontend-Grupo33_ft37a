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

export default function NavBar() {
	const [search, setSearch] = useState(null);
	const [userData, setUserData] = useState({})
	const router = useRouter();
	const dispatch = useDispatch();
	// const userData = JSON.parse(localStorage.getItem('user'));
	const { data: session } = useSession();

	useEffect(()=>{
		let data = JSON.parse(localStorage.getItem('user'));
		if(data && data.data)
		setUserData(data)
	},[])

	useEffect(() => {
		const myCartLocal = localStorage.getItem('myCart');
		if (!myCartLocal) {
			localStorage.setItem('myCart', JSON.stringify([]));
		}
	}, []);


	useEffect(() => {
		const fetchData = async () => {
			if (session) {
				const email = session.user.email;
				const response = await axios.get(
					`https://backend-33ft37a-deploy.vercel.app/users/auth/${email}`,
				);
				localStorage.setItem(
					'user',
					JSON.stringify({
						data: response.data,
						validated: false,
					}),
				);
			}
		};
		fetchData();
	}, []);

	const pathname = usePathname();
	useEffect(() => {
		if (!pathname.includes('/search')) {
			setSearch('');
		}
	}, [pathname]);

	const debouncedSearch = useCallback(
		debounce((searchTerm) => {
			router.push('/search');
			dispatch(searchProducts(searchTerm));
			// 	router.push('/search');
			// 	dispatch(searchProducts(searchTerm));
		}, 1000),
		[],
	);

	const handleChange = (event) => {
		const searchTerm = event.target.value;
		setSearch(searchTerm);
		debouncedSearch(searchTerm);
		// if (pathname.includes('/search')) {
		// 	debouncedSearch(searchTerm);
		// }
	};

	useEffect(() => {
		if(search==null && pathname.includes('/search')){
			dispatch(searchProducts());
		}
	}, [search, dispatch]);

	return (
		<nav className='flex flex-col justify-between pt-[1rem]  gap-y-[1rem] fixed w-full z-50 bg-white border-b-2 border-black'>
			<div className='flex justify-around w-full items-center'>
				<Link href={'/'}>
					<Image src={logo} alt='logo-img' width={80} height={80} />
				</Link>
				<input
					className='bg-[#90909050] w-[45%] p-[0.6rem] rounded-[1rem]  pl-[1rem]'
					type='text'
					onChange={handleChange}
					value={search}
				/>
				<div className='flex items-center gap-x-[2rem]'>
					{userData && userData.data ? (
						<Link href='/profile'>
							<Image
							className='flexblock pb-[0.4rem] self-center'
							src={userBanner}
							alt={'user'}
							width={40}
							height={40}/>
						</Link>
					) : (
						<Link href={'/login'}>Register/Login</Link>
					)}
					<Link href={'/checkout'}>
						<Image src={cart} alt='ico-cart' width={40} height={40} />
					</Link>
				</div>
			</div>
			<Menu />
		</nav>
	);
}
