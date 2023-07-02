import Image from 'next/image';
import logo from '../../public/logocommerce.png';
import ContainerUsers from '@/components/DashboardAdmin/ContainerUsers';
import SideBar from '@/components/DashboardAdmin/SideBar';

export default function AdminPage() {
	return (
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
	);
}
