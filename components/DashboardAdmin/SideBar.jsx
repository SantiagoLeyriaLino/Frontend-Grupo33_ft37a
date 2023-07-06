'use client';
import Link from 'next/link';
import { RxDashboard, RxPerson } from 'react-icons/rx';
import { RiShoppingCartFill } from 'react-icons/ri';
import { MdNoEncryptionGmailerrorred, MdAddBox } from 'react-icons/md';

export default function SideBar({ children }) {
	return (
		<div className='flex'>
			<div className='fixed w-20 h-screen p-4 bg-gray-100 border-r-[1px] flex flex-col justify-between'>
				<div className='flex flex-col items-center'>
					<Link href='/admin'>
						<div className='bg-[#F8652A] text-white p-3 rounded-lg inline-block'>
							<RxDashboard size={30} />
						</div>
					</Link>
					<span className='border-b-[1px] border-gray-200 w-full p-2 '></span>

					<Link href='/admin/users'>
						<div className='bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 rounded-lg inline-block mt-1'>
							<RxPerson size={30} />
						</div>
					</Link>
					<Link href='/admin/ban'>
						<div className='bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 rounded-lg inline-block'>
							<MdNoEncryptionGmailerrorred size={30} />
						</div>
					</Link>

					<Link href='/admin/products'>
						<div className='bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 rounded-lg inline-block'>
							<RiShoppingCartFill size={30} />
						</div>
					</Link>

					<Link href='/admin/create'>
						<div className='bg-gray-100 hover:bg-gray-200 cursor-pointer p-3 rounded-lg inline-block'>
							<MdAddBox size={30} />
						</div>
					</Link>
				</div>
			</div>
			<main className='ml-20 w-full'>{children}</main>
		</div>
	);
}
