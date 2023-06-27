'use client';

import { useSearchParams } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const GoogleLogin = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl');
	const { data: session } = useSession();
	const router = useRouter();
	// localStorage.removeItem('nextauth.message');

	return (
		<div>
			{session ? (
				router.push('/') && (
					<a
						href='#'
						onClick={() => signOut()}
						className='font-semibold text-[1rem] py-[0.4rem] px-[2rem] bg-black text-white rounded-[1rem] w-[50%] mx-[auto] shadow-md shadow-[#11111180]'
					>
						Sign out
					</a>
				)
			) : (
				<a
					href='#'
					onClick={async () => await signIn('google')}
					className='font-semibold text-[1rem] py-[0.4rem] px-[2rem] bg-black text-white rounded-[1rem] w-[50%] mx-[auto] shadow-md shadow-[#11111180]'
				>
					Continue With Google
				</a>
			)}
		</div>
	);
};

export default GoogleLogin;
