import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
	CategoryScale,
	LinearScale,
	BarElement,
	Chart,
	Legend,
	Title,
	Tooltip,
} from 'chart.js';
import axios from 'axios';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export default function BarChart() {
	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [],
	});
	const [chartOptions, setChartOptions] = useState({});

	const getData = async () => {
		const response = await axios.get('https://backend-33ft37a-deploy.vercel.app/transactions');
		const transactions = response.data;

		const sevenDaysAgo = new Date();
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

		const filteredTransactions = transactions.filter((transaction) => {
			const transactionDate = new Date(transaction.date);
			return transactionDate >= sevenDaysAgo;
		});

		const dailyExpenses = filteredTransactions.reduce((acc, transaction) => {
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
		const displayData = data.map((amount) => `$ ${amount}`);

		setChartData({
			labels,
			datasets: [
				{
					data,
					borderColor: 'rgb(53, 162, 235)',
					backgroundColor: 'rgb(53, 162, 235, 0.4)',
				},
			],
		});

		setChartOptions({
			plugins: {
				legend: {
					display: false,
				},
				title: {
					display: true,
					text: 'Daily Revenue',
					font: {
						size: 18,
					},
				},
				tooltip: {
					callbacks: {
						label: (context) => `$${context.formattedValue}`,
					},
				},
			},
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						callback: (value) => `$${value}`,
					},
				},
			},
		});
	};

	useEffect(() => {
		getData();
	}, []);
	return (
		<div className='w-full md:col-span-2 relative m-auto p-4  rounded-lg'>
			<Bar data={chartData} options={chartOptions} />
		</div>
	);
}
