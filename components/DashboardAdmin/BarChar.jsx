import { useState, useEffect } from 'react';

import { Bar } from 'react-chartjs-2';
import { CategoryScale, LinearScale, BarElement, Chart } from 'chart.js';
import axios from 'axios';

Chart.register(CategoryScale, LinearScale, BarElement);

export default function BarChart() {
	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [],
	});
	const [chartOptions, setChartOptions] = useState({});

	const getData = async () => {
		const response = await axios.get('https://backend-33ft37a-deploy.vercel.app/transactions');
		console.log(response.data);
		const transactions = response.data;

		const dailyExpenses = transactions.reduce((acc, transaction) => {
			const transactionDate = new Date(transaction.date).toLocaleDateString();
			if (acc[transactionDate]) {
				acc[transactionDate] += transaction.amount;
			} else {
				acc[transactionDate] = transaction.amount;
			}
			return acc;
		}, {});
		const labels = Object.keys(dailyExpenses);
		const data = Object.values(dailyExpenses);

		setChartData({
			labels,
			datasets: [
				{
					label: 'Sales',
					data,
				},
			],
		});
	};

	useEffect(() => {
		getData();
	}, []);
	return (
		<div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white'>
			<Bar data={chartData} options={chartOptions} />
		</div>
	);
}
