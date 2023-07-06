'use client';
import Image from 'next/image';
import loginImg from '../../public/login.jpg';
import logo from '../../public/logo-white.png';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import GoogleSignInButton from '@/components/nextauth/googleLogin';
import { useSession } from 'next-auth/react';

import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
	const router = useRouter();
	const { data: session } = useSession();

	const notify = (message) => {
		toast.success(message, {
			autoClose: 2000,
		});
	};

	const notifyError = (message) => toast.error(message);

	const [login, setLogin] = useState({
		password: '',
		email: '',
	});

	const handleLogin = (event) => {
		const { name, value } = event.target;
		setLogin((prevLogin) => ({
			...prevLogin,
			[name]: value,
		}));
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (session) {
					const email = session.user.email;
					const response = await axios.get(
						`https://backend-33ft37a-deploy.vercel.app/users/auth/${email}`,
					);
					console.log(response.data);
					if (response.data.validated && response.data.isActive) {
						localStorage.setItem(
							'user',
							JSON.stringify({
								data: response.data,
								validated: true,
							}),
						);
						notify('You were successfully logged in');
						setTimeout(() => router.push('/'), 3000);
					} else if (response.data.isActive) {
						localStorage.setItem('userEmail', JSON.stringify(response.data.email))
						notifyError(
							'Unauthenticated user, check your email to confirm your account',
						);
					} else {
						Swal.fire({
							title: 'Error',
							text: 'Deactivated user, contact FashionFinds support team',
							icon: 'error',
							confirmButtonText: '<a href="https://frontend-grupo33-ft37a.vercel.app/">Aceptar</a>',
						});
					}
				}
			} catch (error) {
				Swal.fire({
					title: 'Error',
					text: 'Deactivated user, contact FashionFinds support team',
					icon: 'error',
					confirmButtonText: '<a href="https://frontend-grupo33-ft37a.vercel.app/">Aceptar</a>',
				});
			}
		};

		fetchData();
	}, [session]);

	// <<<<<<< HEAD
	const handleSubmit = async (event) => {
		event.preventDefault();
		let url = `password=${login.password}&email=${login.email}`;
		try {
			const response = await axios(`https://backend-33ft37a-deploy.vercel.app/users/login?${url}`);
			if (response.data.validated && response.data.isActive) {
				localStorage.setItem(
					'user',
					JSON.stringify({
						data: response.data,
						validated: true,
					}),
				);
				notify('You were successfully logged in');
				setTimeout(() => router.push('/'), 3000);
			} else if (response.data.isActive) {
				localStorage.setItem('userEmail', JSON.stringify(response.data.email))
				notifyError(
					'Unauthenticated user, check your email to confirm your account',
				);
			} else {
				Swal.fire({
					title: 'Error',
					text: 'Deactivated user, contact FashionFinds support team',
					icon: 'error',
					confirmButtonText: '<a href="https://frontend-grupo33-ft37a.vercel.app/">Aceptar</a>',
				});
			}
		} catch (error) {
			Swal.fire({
				title: 'Error',
				text: 'Deactivated user, contact FashionFinds support team',
				icon: 'error',
				confirmButtonText: '<a href="https://frontend-grupo33-ft37a.vercel.app/">Aceptar</a>',
			});
		}
	};
	// =======
	// 	const handleSubmit = async (event) => {
	// 		event.preventDefault();
	// 		let url = `password=${login.password}&email=${login.email}`;
	// 		try {
	// 			const response = await axios(`https://backend-33ft37a-deploy.vercel.app/users/login?${url}`);
	// 			localStorage.setItem(
	// 				'user',
	// 				JSON.stringify({
	// 					data: response.data,
	// 					validated: false,
	// 				}),
	// 			);
	// 			notify('You were successfully logged in');
	// 			setTimeout(() => router.push('/'), 3000);
	// 		} catch (error) {
	// 			notifyError(error.message);
	// 		}
	// 	};
	// >>>>>>> 2cea507e28a09d5ac7f7821cbf13f8c69beb0f00

	return (
		<main className='min-h-[100vh] bg-black'>
			<section className='flex'>
				<article
					className='w-[60%] min-h-[100vh] flex items-center'
				>
					<Image
						className='relative h-[100%] w-[100%] object-cover object-bottom'
						src={loginImg}
						alt='img-login'
						width={2000}
						height={2000}
					/>
					<motion.span className='absolute font-playfair text-white font-light text-[3rem] top-[2rem] left-[4rem] py-[0.6rem] px-[1.4rem] rounded-[1rem]'
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 1 }}>
						EXPLORE <strong className='font-bold '>TRENDS</strong> <br /> 
						AND FIND <strong className='font-bold '>YOURSTYLE.</strong>
					</motion.span>
				</article>

				<article
					className='w-[50%] h-[100vh] flex items-center bg-black'
				>
					<motion.div className='flex flex-col items-center w-[100%] h-[100%] pt-[1rem] px-[3rem] pb-[4rem] gap-y-[1rem]'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1 }}>
						<div className='flex flex-col gap-y-[1rem]'>
							<Link href={'/'}>
								<Image
									className='mx-[auto]'
									src={logo}
									alt='img-logo'
									width={150}
									height={150}
								/>
							</Link>
							<div className='flex  bg-[#909090] w-[fit-content] p-[0.2rem] rounded-[1.6rem]'>
								<Link
									className='font-semibold text-[1rem] py-[0.4rem] px-[1.6rem] bg-white text-black rounded-[1rem]'
									href={'/login'}
								>
									Login
								</Link>
								<Link
									className='font-semibold text-[1rem] py-[0.4rem] px-[1.4rem] text-white rounded-[1rem]'
									href={'/register'}
								>
									Register
								</Link>
							</div>
						</div>
						<form className='flex flex-col gap-y-[3rem]' action=''>
							<label className='flex flex-col gap-y-[0.4rem]' htmlFor=''>
								<span className='font-black text-[1.3rem] text-white'>Email:</span>
								<input
									name='email'
									value={login.email}
									onChange={handleLogin}
									className='p-[0.3rem] pl-[0.7rem] w-[330px] rounded'
									type='text'
								/>
							</label>
							<label className='flex flex-col gap-y-[0.4rem]' htmlFor=''>
								<span className='font-black text-[1.3rem] text-white'>Password:</span>
								<input
									name='password'
									value={login.password}
									onChange={handleLogin}
									className='p-[0.3rem] pl-[0.7rem] w-[330px] rounded'
									type='password'
								/>
							</label>

							<div className='flex justify-evenly'>
								<div className='flex gap-x-[0.6rem] items-center'>
									<span className='font-light text-white text-[0.9rem]'>Remember me</span>
									<input type='checkbox' />
								</div>

								<span className='font-light text-white text-[0.9rem]'>
									Forgot your password?
								</span>
							</div>
							<div className='flex flex-col items-center gap-y-[1rem]'>
								<motion.button whileTap={{scale: 0.92}}
									onClick={handleSubmit}
									className='font-black text-[1rem] py-[0.3rem] bg-white text-black
									rounded-[1rem] w-[120px]'
								>
									LOG IN
								</motion.button>
								<motion.div whileTap={{scale: 0.92}}>
									<GoogleSignInButton/>
								</motion.div>
							</div>
						</form>
					</motion.div>
				</article>
				<ToastContainer />
			</section>
		</main>
	);
}