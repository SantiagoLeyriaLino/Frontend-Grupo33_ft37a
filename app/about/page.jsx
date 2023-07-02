'use client';
import Image from 'next/image';
import about from '../../public/aboutBanner.png';
import egPage1 from '../../public/egPage1.png';
import egPage2 from '../../public/egPage2.png';
import egPage3 from '../../public/egPage3.png';
import { motion } from 'framer-motion';
import Map from '@/components/Map';
import FormContactUs from '@/components/FormContactUs';

export default function About() {
	const images = [egPage1, egPage2, egPage3];

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
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
						euismod eros id neque imperdiet, sit amet efficitur sapien vehicula.
						Sed bibendum neque eget dapibus luctus. Donec mi purus, placerat ut
						vestibulum id, interdum vitae leo. Sed pulvinar auctor quam non
						egestas. Sed orci turpis, consectetur non bibendum sit amet,
						vehicula sed velit. Donec aliquam cursus dui vel lobortis. Ut sit
						amet ante luctus, accumsan libero nec, vestibulum velit. Morbi ut
						nisl sit amet quam lobortis egestas.
					</motion.h3>
				</div>
			</section>
			<section className='w-[80%] mx-[auto] justify-center pb-[5rem]'>
				<h2 className='text-[3.4rem] font-semibold text-center pb-[3rem]'>
					Portfolio
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
