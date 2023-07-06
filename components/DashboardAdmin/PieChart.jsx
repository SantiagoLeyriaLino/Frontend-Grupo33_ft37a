import axios from 'axios';
import { Chart, ArcElement, ToolTip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement, Legend);

export default function PieChart() {
	const [chartData, setChartData] = useState(null);
	const [chartOptions, setChartOptions] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('https://backend-33ft37a-deploy.vercel.app/transactions');
				const transactions = response.data;
				const productsData = {};

				transactions.forEach((transaction) => {
					transaction.products.forEach((product) => {
						const { productId } = product;
						if (productsData[productId.name]) {
							productsData[productId.name] += 1;
						} else {
							productsData[productId.name] = 1;
						}
					});
				});

				const sortedData = Object.entries(productsData).sort(
					(a, b) => b[1] - a[1],
				);
				const data = sortedData.slice(0, 10).map(([name, quantity]) => ({
					name,
					quantity,
				}));

				setChartOptions({
					plugins: {
						legend: {
							position: 'right',
						},
						title: {
							display: true,
							text: 'Top 10 Products',
							font: {
								size: 18,
							},
						},
					},
					maintainAspectRatio: false,
					responsive: true,
				});
				setChartData(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className='h-[70vh] w-[60vw]'>
			<Pie
				data={{
					labels: chartData?.map((data) => data.name),
					datasets: [
						{
							data: chartData?.map((data) => data.quantity),
							backgroundColor: [
								'rgba(255, 99, 132, 0.7)',
								'rgba(54, 162, 235, 0.7)',
								'rgba(255, 206, 86, 0.7)',
								'rgba(75, 192, 192, 0.7)',
								'rgba(153, 102, 255, 0.7)',
							],
						},
					],
				}}
				options={chartOptions}
			/>
		</div>
	);
}
