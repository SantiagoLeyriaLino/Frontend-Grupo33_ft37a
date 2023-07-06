'use client';
import Image from 'next/image';
import shop from '../public/header.jpg';
import tienda from '../public/photo4.jpg';
import tienda2 from '../public/photo3.jpg';
import logo_adidas from '../public/logo_adidas.png'
import logo_balenciaga from '../public/logo_balenciaga.png'
import logo_champion from '../public/logo_champion.png'
import logo_fila from '../public/logo_fila.png'
import logo_gucci from '../public/logo_gucci.png'
import logo_levis from '../public/logo_levis.png'
import logo_nike from '../public/logo_nike.png'
import logo_puma from '../public/logo_pumas.png'
import logo_versace from '../public/logo_versace.png'
import discount_banner from '../public/discount_banner.png'
import CarouselBanner from '@/components/CarouselBanner';
import ArivalsCarousel from '@/components/ArivalsCarousel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter()
	const [ arrivals, setArrivals ] = useState([])

	function handleClick(){
		router.push('/login')
	}

	useEffect(()=> {
		axios.get('https://backend-33ft37a-deploy.vercel.app/products/search?season=winter')
		.then(response => setArrivals(response.data))
	}, [])

	return (
		<main className='pt-[8.1rem] min-h-[100vh]'>
			<div className='relative'>
				<CarouselBanner
					className='w-[100%] object-fill h-[60vh] '
					src={shop}
					alt='img-header'
					width={1500}
					height={1500}
					routes={[
						{ name: "Hombres", route: "/products/hombres" },
						{ name: "Mujeres", route: "/products/female" },
						{ name: "Niños", route: "/products/children" },
						{ name: "Ofertas", route: "/"}
					  ]}
				/>
				{/* <h2 className='absolute text-white font-bold text-[2rem] top-[2rem] left-[4rem] bg-[#90909050] py-[1rem] px-[1.4rem] rounded-[1rem]'>
					Empieza tu negocio
				
				</h2> */}
			</div>
			<br />
			<section className='flex w-[80%] mx-[auto]  justify-center py-[3rem]'>
				<div className='w-[60%] pt-[2rem] text-left'>
					<h2 className='text-[3.4rem] font-semibold leading-[3.5rem]'>The latest trend in <strong>clothing</strong></h2>
					<p className='w-[60%] mt-[2rem] text-[1.4rem] font-normal leading-tight'>
						Express your unique style with our diverse range of statement pieces and
						 everyday essentials. Shop now and redefine your fashion game.
					</p>
				</div>
				<div className='grid border-separate items-center grid-cols-3 gap-[2.4rem]'>
					<Image width={80} height={80} src={logo_adidas} alt="marca_1"/>
					<Image width={80} height={80} src={logo_balenciaga} alt="marca_2"/>
					<Image width={80} height={80} src={logo_champion} alt="marca_3"/>
					<Image width={80} height={80} src={logo_fila} alt="marca_4"/>
					<Image width={80} height={80} src={logo_gucci} alt="marca_5"/>
					<Image width={80} height={80} src={logo_levis} alt="marca_6"/>
					<Image width={80} height={80} src={logo_nike} alt="marca_7"/>
					<Image width={80} height={80} src={logo_puma} alt="marca_8"/>
					<Image width={80} height={80} src={logo_versace} alt="marca_9"/>
				</div>
			</section>

			<section className='bg-black py-[4rem]'>
				<div className='flex w-[80%] mx-[auto] justify-around flex-wrap '>
					<h2 className='w-full font-extrabold text-white text-[2rem] mb-[2rem]'>
						Arrivals
					</h2>
					{/* <Image
						className='rounded-[2rem]'
						src={zapas}
						alt='photo-zapas'
						width={200}
						height={200}
					/>
					<Image
						className='rounded-[2rem]'
						src={playera}
						alt='photo-playera'
						width={200}
						height={200}
					/>
					<Image
						className='rounded-[2rem]'
						src={pantalon}
						alt='photo-pantalon'
						width={200}
						height={200}
					/>
					<Image
						className='rounded-[2rem]'
						src={reloj}
						alt='photo-reloj'
						width={200}
						height={200}
					/> */}
				</div>
				<div className='flex justify-center'>
					<ArivalsCarousel items={arrivals}/>
				</div>
			</section>

			<section className='py-[6rem]'>
				<div className='flex w-[80%] mx-[auto] gap-x-[4rem]'>
					<Image
						className='object-cover w-[450px] h-[450px] rounded-[0.6rem]'
						src={discount_banner}
						alt='photo-3'
						width={800}
						height={800}
					/>
					<div className='flex flex-col mb-[2rem] gap-x-[3rem] w-[70%] gap-y-[2rem]'>
						<h2 className='text-[3.2rem] font-semibold leading-[3.5rem]'>
							Get your first discount coupon <strong>for free</strong>!
						</h2>
						<p className='w-[50%] text-[1.4rem] font-normal leading-tight'>
							Sign up and get your first 15% discount coupon.
						</p>
						<motion.button onClick={handleClick} className='text-white w-[120px] font-bold text-[1.3rem]
						bg-[#90909050] p-[0.4rem] pl-[0.8rem] pr-[0.8rem] rounded-[1.5rem]
						 bg-black' whileHover={{backgroundColor: 'gray', duration: 0.5}}>
							Sign up
						</motion.button>
					</div>
				</div>
			</section>
		</main>
	);
}
