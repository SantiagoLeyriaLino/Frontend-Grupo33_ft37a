'use client'
import Image from 'next/image';
import logo from '../../public/logocommerce.png';
import SideBar from '@/components/DashboardAdmin/SideBar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NoAccess from '@/components/DashboardAdmin/NoAccess';

export default function AdminPage() {
	const router = useRouter()
	const [userLocal, setUserlocal] = useState()
	
	useEffect(()=>{
		const myUser = JSON.parse(localStorage.getItem('user'))
		if(myUser && myUser.data){
			setUserlocal(myUser)
		}
		
	},[])

	
	
	return (
		<>
		{
			userLocal?.data?.isAdmin == false
			?
		<NoAccess/>
		:
		<SideBar>
			<main className='bg-gray-100 min-h-screen'>
				<nav className='flex justify-between w-[80%] mx-[auto] items-center py-[1rem]'>
					<Image
						className='w-[80px] h-[80px]'
						src={logo}
						alt='logo'
						width={600}
						height={600}
					/>
					<div>Perfil Admin</div>
				</nav>
			</main>
		</SideBar>
	}
		</>
	)

}
