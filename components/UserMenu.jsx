'use client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserMenu({ setView, view }) {
	const [myUserParse, setMyUserParse] = useState()
	const { data: session } = useSession();
	const router = useRouter()
	const notify = (message) => {
		toast.success(message, {
			autoClose: 2000,
		});
	};

	useEffect(()=>{
		const myUser = JSON.parse(window.localStorage.getItem('user'))
		if(myUser && myUser.data){
			setMyUserParse(myUser)
		}
	},[])

	const handleClick = async (e) => {
		if (session) {
			try {
				await signOut({ callbackUrl: '/login' });
				notify('Logging out ...');
				setTimeout(() => {
					router.push('/');
				}, 3000);
			} catch (error) {
				console.log('Sign out error:', error);
			}
		} else {
			notify('Logging out ...');
			setTimeout(() => {
				router.push('/login');
			}, 3000);
		}
		localStorage.removeItem('user');
	};

	function handleButtonClicks(event) {
		const { id } = event.target
		setView(id)
	}
	return (
		<div className='relative w-[100%] shadow-xl pt-[1rem]'>
			<ul className='bg-white flex flex-col'>
				<li className={`${view === 'profile' ? 'text-white bg-black' : 'text-black bg-white' } hover:bg-[#909090] hover:text-[white] pl-[1.8rem] pr-[2rem] py-[0.8rem] cursor-pointer`}
					id='profile' onClick={handleButtonClicks}>Account profile
				</li>
				{
					myUserParse?.data?.isAdmin
						?
						<></>
						:
						<li className={`${view === 'purchase_history' ? 'text-white bg-black' : 'text-black bg-white' } hover:bg-[#909090] hover:text-[white] pl-[1.8rem] pr-[2rem] py-[0.8rem] cursor-pointer`}
							id='purchase_history' onClick={handleButtonClicks}>Purchase history
						</li>
				}
				{
					myUserParse?.data?.isAdmin
						?
						<li className={`${view === 'create' ? 'text-white bg-black' : 'text-black bg-white' } hover:bg-[#909090] hover:text-[white] pl-[1.8rem] pr-[2rem] py-[0.8rem] cursor-pointer`}
							id='create' onClick={handleButtonClicks}>Create product
						</li>

						:
						<></>
				}

				<hr className='border-gray-200' />
				<li className='hover:bg-[#909090] hover:text-[white] pl-[1.8rem] py-[1rem] cursor-pointer'
					onClick={handleClick}
				>Log out
				</li>
			</ul>
			<ToastContainer />
		</div>
	);
}
