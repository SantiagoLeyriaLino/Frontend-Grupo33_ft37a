'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

const GoogleLogin = () => {
	const { data: session } = useSession();
	const router = useRouter();

	const handleClick = async (e) => {
		e.preventDefault;
		await signIn('google');
	};

	return (
		<div className='flex justify-center'>
			<label htmlFor='google'>
				<a href='#' onClick={handleClick} className='hidden' id='google'>
					Continue With Google
				</a>
				<FcGoogle
					onClick={handleClick}
					className='h-[5vh] w-[5vh] cursor-pointer'
				/>
			</label>
		</div>
	);
};

export default GoogleLogin;
