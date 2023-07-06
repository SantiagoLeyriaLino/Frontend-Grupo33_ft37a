'use client';
import Image from 'next/image';
import logo from '../../public/logo.png';
import SideBar from '@/components/DashboardAdmin/SideBar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NoAccess from '@/components/DashboardAdmin/NoAccess';
import BarChart from '@/components/DashboardAdmin/BarChar';
import PieChart from '@/components/DashboardAdmin/PieChart';
import RecentPruchase from '@/components/DashboardAdmin/RecentPurchase';


export default function AdminPage() {
	const router = useRouter();
	const [userLocal, setUserlocal] = useState();

	useEffect(() => {
		const myUser = JSON.parse(localStorage.getItem('user'));
		if (myUser && myUser.data) {
			setUserlocal(myUser);
		}
	}, []);

	return (
		<>
			{userLocal?.data?.isAdmin == false ? (
				<NoAccess />
			) : (
				<SideBar>
					<main className='bg-gray-100 min-h-screen'>
						<nav className='flex justify-between w-[80%] mx-[auto] items-center py-[1rem]'>
							<Image
								className='w-[80px] h-[80px] cursor-pointer'
								src={logo}
								alt='logo'
								width={600}
								height={600}
								onClick={()=>router.push("/")}
							/>
							<div>Perfil Admin</div>
						</nav>
						<div className='flex justify-center'>
							<PieChart />
						</div>
						<div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4 mt-7'>
							<BarChart />
							<RecentPruchase />
						</div>
					</main>
				</SideBar>
			)}
		</>
	);
}