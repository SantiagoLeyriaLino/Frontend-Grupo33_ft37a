'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const GoogleLogin = () => {
	const { data: session } = useSession();
	const router = useRouter();

	const handleClick = async (e) => {
		e.preventDefault;
		await signIn('google');
	};

	return (
		<div>
			<a
				href='#'
				onClick={handleClick}
				className='font-semibold text-[1rem] py-[0.4rem] px-[2rem] bg-black text-white rounded-[1rem] w-[50%] mx-[auto] shadow-md shadow-[#11111180]'
			>
				Continue With Google
			</a>
		</div>
	);
};

export default GoogleLogin;
