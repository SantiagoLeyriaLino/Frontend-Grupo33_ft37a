'use client';

import { useSearchParams } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import customAuth from '../../app/api/signInAuth';

const GoogleLogin = () => {
	const searchParams = useSearchParams();
	const { data: session } = useSession();
	const router = useRouter();

	const handleSignout = (e) => {
		e.preventDefault();
		signOut();
	};

	// session && router.push('/');
	return (
		<div>
			{session ? (
				router.push('/') && <button onClick={handleSignout}>Sign out</button>
			) : (
				<button onClick={() => signIn()}>Continue With Google</button>
			)}
		</div>
	);
};

export default GoogleLogin;
