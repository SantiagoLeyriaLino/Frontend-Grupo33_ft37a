import React from 'react';
import SideBar from '@/components/DashboardAdmin/SideBar';
import ContainerProducts from '@/components/DashboardAdmin/ContainerProducts';

export default function productsPage() {
	return (
		<SideBar>
			<main className='bg-gray-100 min-h-screen'>
				<ContainerProducts />
			</main>
		</SideBar>
	);
}
