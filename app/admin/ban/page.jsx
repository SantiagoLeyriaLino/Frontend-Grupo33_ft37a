import React from 'react';
import ContainerBanUsers from '@/components/DashboardAdmin/ContainerBanUsers';
import SideBar from '@/components/DashboardAdmin/SideBar';

export default function usersPage() {
	return (
		<SideBar>
			<main className='bg-gray-100 min-h-screen'>
				<ContainerBanUsers />
			</main>
		</SideBar>
	);
}
