import React from 'react';
import ContainerUsers from '@/components/DashboardAdmin/ContainerUsers';
import SideBar from '@/components/DashboardAdmin/SideBar';

export default function usersPage() {
	return (
		<SideBar>
			<main className='bg-gray-100 min-h-screen'>
				<ContainerUsers />
			</main>
		</SideBar>
	);
}
