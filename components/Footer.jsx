'use client'
import Image from 'next/image';
import FormContactUs from './FormContactUs';
import logo from '../public/logo-white.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import stripe from '../public/stripeblack.png'

export default function Footer() {

	const [dataForm, setDataForm] = useState({
		name:"",
		email:"",
		message:""
	})

	useEffect(()=>{
		console.log(dataForm)
	},[dataForm])

	const onChange = (e) =>{
		setDataForm({ ...dataForm, [e.target.name]: e.target.value });
	}

	function openPopup() {
		document.getElementById("popup").style.display = "block";
	  }
	  
	  function closePopup() {
		document.getElementById("popup").style.display = "none";
	  }

	  const handleSubmit = (event) =>{
		event.preventDefault()
		axios.post('https://backend-33ft37a-deploy.vercel.app/contactUs', dataForm)
		.then((response)=>{
			alert("perfecto")
			closePopup()
		})
	  }
	 
	return (
		<footer className='bg-black min-h-[40vh] text-white  p-[2rem] '>
			<div className='flex justify-around'>
				<div className='w-[30%] text-center'>
					<div className='flex items-center gap-x-[1rem] justify-center   '>
						<Image
							className='border-r-2 border-white px-[2rem]  w-[150px]'
							src={logo}
							alt='logo'
							width={100}
							height={100}
						/>
						<div className=' flex flex-col'>
							<span>e-commerce</span>
							<span>international</span>
						</div>
					</div>

					<div className='mt-[1rem] flex flex-col gap-y-[1rem] items-center'>
						<p className='text-thin text-[0.6rem] text-start'>
							¡Suscribite a nuestro newsletter! y gana 8% ADICIONAL en tu
							primera compra* <br />
							Recibí las mejores promociones y novedades del mundo de la moda
						</p>
						<div className='flex gap-x-[1rem] mb-[1rem] justify-start' >
						<form className="flex  rounded-[0.6rem] gap-x-[0.4rem]">
						<div className="">
							<input
							className="text-black rounded-[0.6rem] py-[0.6rem] pl-[1rem]"
							type="e-mail"
							name="email"
							placeholder="Email"
							/>
							{/* <input
							className="text-black rounded-[0.6rem] py-[0.6rem] pl-[1rem]"
							type="text"
							name="message"
							placeholder="Message"
							/> */}
						</div>
						<button className="rounded-[0.6rem] bg-[#909090] py-[0.6rem] px-[1rem]" >
							Suscribirse
						</button>
						</form>
						</div>
					</div>

					<span className='text-[0.8rem]'>
						© 2023 Online Shop | e-commerce Inc.
					</span>
					<Image 
					className='mx-auto'
					src={stripe} alt='logo-stripe' width={250} height={200}/>
				</div>

				<div className='flex w-[70%] justify-around'>
				<article className="flex flex-col gap-y-2">
					<h3 className="underline cursor-default">Info</h3>
					<Link href={'/about'} className="text-sm">About</Link>
					<span
						className="text-sm text-blue-500 cursor-pointer"
						onClick={openPopup}
					>
						Contact Us
					</span>
					<span className="text-sm cursor-pointer">Privacy Policy</span>
					<span className="text-sm cursor-pointer">Terms</span>
					</article>

					<div id="popup" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden">
					<div className="bg-white p-6 rounded-md max-w-md mx-auto" style={{ marginTop: '150px' }}>
					<span onClick={closePopup} className='text-black cursor-pointer ml-auto self-center'>x</span>
					<h2 className="mb-4 text-lg font-bold text-center text-black">Contact Us</h2>
						<FormContactUs/>
						<span
						className="block top-0 right-0 mt-2 mr-2 text-red cursor-pointer"
						onClick={closePopup}
						>
						&times;
						</span>
					</div>
					</div>
					<article className='flex flex-col gap-y-[0.6rem]'>
						<h3 className='underline cursor-default'>Products</h3>
						<Link href={'/products/hombres'} className='text-[0.8rem]'>Male</Link>
						<Link href={'/products/female'} className='text-[0.8rem]'>Female</Link>
						<Link href={'/products/boy'} className='text-[0.8rem]'>Boy</Link>
						<Link href={'/products/girl'} className='text-[0.8rem]'>Girl</Link>
					</article>

					<article className='flex flex-col gap-y-[0.6rem]'>
						<h3 className='underline cursor-default'>Metodos de pago</h3>
						<span className='text-[0.8rem] cursor-default'>Mercado Pago</span>
						<span className='text-[0.8rem] cursor-default'>RapiPago</span>
						<span className='text-[0.8rem] cursor-default'>Pago Facil</span>
						<span className='text-[0.8rem] cursor-default'>Visa</span>
						<span className='text-[0.8rem] cursor-default'>MasterCard</span>
						<span className='text-[0.8rem] cursor-default'>Naranja</span>
						<span className='text-[0.8rem] cursor-default'>American Express</span>
						
					</article>

					<article className='flex flex-col gap-y-[0.6rem]'>
						<h3 className='underline cursor-default'>Redes</h3>
						<span className='text-[0.8rem] cursor-pointer'>Facebook</span>
						<span className='text-[0.8rem] cursor-pointer'>Twitter</span>
						<span className='text-[0.8rem] cursor-pointer'>Instagram</span>
					</article>
				</div>
			</div>
		</footer>
	);
}
