'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import logo from '../public/logocommerce.png';
import cart from '../public/cart.png';
import Link from 'next/link';
import Menu from './Menu/Menu';
import UserMenu from './UserMenu';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { searchProducts, clearState } from '@/redux/Slice';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function NavBar() {
	const [search, setSearch] = useState('');
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
		const myCartLocal = window.localStorage.getItem('myCart')||"";
		if (!myCartLocal) {
			window.localStorage.setItem('myCart', JSON.stringify([]));
		}
	}, []);

	const getUser = async() =>{
		if (session) {
			const email = session.user.email;
			const response = await axios.get(
				`https://backend-33ft37a-deploy.vercel.app/users/auth/${email}`,
			);
			console.log(response);
			localStorage.setItem(
				'user',
				JSON.stringify({
					data: response.data,
					validated: false,
				}),
			);
		}
	}

	useEffect(() => {
		getUser()
	}, []);

	const pathname = usePathname();
	useEffect(() => {
		if (pathname.includes('products')) {
			setSearch('');
		}
	}, [pathname]);

	const debouncedSearch = useCallback(
		debounce((searchTerm) => {
			if (searchTerm.length > 0) {
				router.push('/search');
				dispatch(searchProducts(searchTerm));
			}
		}, 500),
		[],
	);

	const handleChange = (event) => {
		const searchTerm = event.target.value;
		setSearch(searchTerm);
		if (pathname.includes(search)) {
			debouncedSearch(searchTerm);
		}
	};

	useEffect(() => {
		if ((!search || search == '') && pathname.includes('search')) {
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
						<UserMenu />
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
