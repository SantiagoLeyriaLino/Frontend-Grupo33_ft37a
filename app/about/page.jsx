'use client';
import Image from 'next/image';
import about from '../../public/aboutBanner.png';
import egPage1 from '../../public/react.png';
import egPage4 from '../../public/js.png';
import egPage5 from '../../public/nextlogo.svg';
import { motion } from 'framer-motion';
import Map from '@/components/Map';
import FormContactUs from '@/components/FormContactUs';

export default function About() {
	const images = [egPage1,egPage4,egPage5];

	return (
		<main className='min-h-[100vh]'>
			<section className='flex w-[100%] mx-[auto] justify-center py-[5rem]'>
				<Image
					className='w-[100%] object-cover h-[60vh] '
					src={about}
					alt='img-header'
					width={1500}
					height={1500}
				/>
			</section>
			<section className='flex w-[80%] mx-[auto] justify-center pb-[5rem]'>
				<div
					className='flex flex-col'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
				>
					<motion.h2
						className='text-[3.4rem] font-semibold text-center pb-[2rem]'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
					>
						About Us
					</motion.h2>
					<motion.h3
						className='text-[1.4rem]'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
					>
						Somos un grupo de estudiantes con conocimientos previos en anteriores proyectos
						que buscamos desarrollar este nuevo producto digital donde podamos ofrecer
						una gran variedad de artículos confiables y de excelente calidad.
						Este proyecto fue creado pensando en hacer un e-commerce a escala global
						donde los usuarios pudiesen encontrar a precios mas accesibles variedad y calidad en diferentes
						marcas de ropa.
						Nuestro objetivo es brindarle una experiencia única al usuario 
						y satisfacer sus necesidades con productos que sean relevantes para ellos
						sin perder la satisfacción del cliente final.

					</motion.h3>
				</div>
			</section>
			<section className='w-[80%] mx-[auto] justify-center pb-[5rem]'>
				<h2 className='text-[3.4rem] font-semibold text-center pb-[3rem]'>
				Technologies Used
				</h2>
				<div className='flex flex-row justify-around'>
					{images.map((image, index) => (
						<motion.div key={index} whileHover={{ opacity: 0.5 }}>
							<Image
								className='object-cover w-[16rem] h-[12rem] rounded-[1rem] border shadow-lg'
								src={image}
								alt={`page-${index}`}
							/>
						</motion.div>
					))}
				</div>
				<Map />
				<div>
					<br/>
				<motion.h2
						className='text-[3.4rem] font-semibold text-center pb-[2rem]'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
					>Contact Us</motion.h2>
					<FormContactUs/>
				</div>
			</section>
		</main>
	);
}
