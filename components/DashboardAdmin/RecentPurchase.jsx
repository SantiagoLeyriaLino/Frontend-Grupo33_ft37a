import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { RiTimeLine } from 'react-icons/ri';
import { FaMoneyBillAlt } from 'react-icons/fa';

export default function RecentPurchase() {
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('https://backend-33ft37a-deploy.vercel.app/transactions');
				const orders = response.data;
				orders.sort((a, b) => {
					const dateA = new Date(a.date);
					const dateB = new Date(b.date);
					if (dateA > dateB) return -1;
					if (dateA < dateB) return 1;
					return b.amount - a.amount;
				});

				const recentOrders = orders.slice(0, 20);

				setTransactions(recentOrders);
				console.log(orders);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	const getTimeAgo = (date) => {
		const now = moment();
		const orderDate = moment(date);
		return orderDate.from(now);
	};

	return (
		<div className='w-full relative h-[40vh] m-auto p-4 border rounded-lg bg-white overflow-scroll shadow-lg'>
			<h1 className='text-2xl font-bold mb-4 flex justify-center'>
				Recent Orders
			</h1>
			<ul>
				{transactions.map((transaction, index) => (
					<li
						key={index}
						className='border-b py-2 flex justify-between items-center'
					>
						<span className='text-gray-700'>
							<RiTimeLine className='inline-block mr-2' />
							New Order: {getTimeAgo(transaction.date)}
						</span>
						<span className='text-blue-600 font-semibold'>
							<FaMoneyBillAlt className='inline-block mr-2' />
							Amount: ${transaction.amount}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
