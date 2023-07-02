'use client';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import Image from 'next/image';

export default function ContainerProducts() {
	const [productData, setProductData] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [pendingChanges, setPendingChanges] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get('https://backend-33ft37a-deploy.vercel.app/products');
				setProductData(response.data);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		fetchUsers();
	}, []);

	const data = useMemo(() => productData, [productData]);
	const columns = useMemo(
		() => [
			{
				Header: 'Product',
				accessor: 'name',
				canSort: true,
				sortType: (rowA, rowB, columnId) => {
					const valueA = rowA.values[columnId] || '';
					const valueB = rowB.values[columnId] || '';
					return valueA.localeCompare(valueB);
				},
			},
			{
				Header: 'Size',
				accessor: 'size',
				canSort: true,
				Cell: ({ value, row }) => {
					return (
						<div>
							Size: {value[0].size}
							<br />
							{/* stock: {value[0].stock} */}
							Stock:{' '}
							<input
								type='number'
								value={value[0].stock}
								onChange={(e) =>
									updateProduct(row.original._id, value.stock, e.target.value)
								}
							/>
						</div>
					);
				},
			},
			{
				Header: 'Images',
				accessor: 'images',
				Cell: ({ row }) => {
					const images = row.original.images;
					return images.map((image, index) => (
						<Image
							className='w-14 h-14'
							key={index}
							src={image}
							alt={`Image ${index}`}
						/>
					));
				},
				canSort: false,
			},
			{
				Header: 'Price',
				accessor: 'price',
				canSort: true,
				Cell: ({ row }) => {
					const id = row.original._id;
					const pendigChange = pendingChanges.find(
						(change) => change.id === id,
					);
					const value = pendigChange ? pendigChange.value : row.original.price;

					return (
						<input
							className='border-transparent'
							type='text'
							onChange={(e) =>
								updatePendingChange(row.original._id, 'price', e.target.value)
							}
							value={value}
						/>
					);
				},
			},
			{
				Header: 'Stock',
				accessor: 'stock',
				canSort: true,
			},
			{
				Header: 'Active',
				accessor: 'isActive',
				Cell: ({ row }) => (
					<select
						value={row.original.isActive}
						onChange={(e) =>
							updateProduct(
								row.original._id,
								'isActive',
								e.target.value === 'true',
							)
						}
						className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
					>
						<option value='true'>Active</option>
						<option value='false'>Not Active</option>
					</select>
				),
				canSort: true,
				sortType: (rowA, rowB, columnId) => {
					const valueA = rowA.values[columnId] ? 1 : 0;
					const valueB = rowB.values[columnId] ? 1 : 0;
					return valueA - valueB;
				},
			},
		],
		[pendingChanges],
	);

	const filteredData = useMemo(() => {
		if (searchTerm === '') {
			return data;
		} else {
			return data.filter((user) =>
				user.name.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		}
	}, [data, searchTerm]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data: filteredData,
			initialState: { pageIndex: 0, pageSize: 5 },
		},
		useSortBy,
		usePagination,
	);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const updateProduct = async (productId, propertyName, value) => {
		try {
			const updates = { [propertyName]: value };
			await axios.put(`https://backend-33ft37a-deploy.vercel.app/products/${productId}`, updates);
			setProductData((prevData) =>
				prevData.map((product) => {
					if (product._id === productId) {
						return {
							...product,
							[propertyName]: value,
						};
					}
					return product;
				}),
			);
		} catch (error) {
			console.log(error);
		}
	};

	const updatePendingChange = (productId, propertyName, value) => {
		const change = { productId, propertyName, value };
		setPendingChanges((prevChanges) => {
			const updatedChanges = [...prevChanges];
			const existingChangeIndex = updatedChanges.findIndex(
				(change) => change.productId === productId,
			);

			if (existingChangeIndex !== -1) {
				updatedChanges[existingChangeIndex] = change;
			} else {
				updatedChanges.push(change);
			}

			return updatedChanges;
		});
	};

	const applyPendingChange = async (productId) => {
		const pendingChange = pendingChanges.find(
			(change) => change.productId === productId,
		);

		if (pendingChange) {
			const { propertyName, value } = pendingChange;
			try {
				const updates = { [propertyName]: value };
				await axios.put(`https://backend-33ft37a-deploy.vercel.app/products/${productId}`, updates);
				setProductData((prevData) =>
					prevData.map((product) => {
						if (product._id === productId) {
							return {
								...product,
								[propertyName]: value,
							};
						}
						return product;
					}),
				);
				setPendingChanges((prevChanges) =>
					prevChanges.filter((change) => change.productId !== productId),
				);
			} catch (error) {
				console.error('Error applying change:', error);
			}
		}
	};

	return (
		<div className='w-11/12 mx-auto py-14'>
			<div className='shadow-md rounded-lg overflow-hidden'>
				<div className='p-4'>
					<input
						type='text'
						value={searchTerm}
						onChange={handleSearch}
						placeholder='Search users...'
						className='w-full py-2 px-3 border border-collapse rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm'
					/>
				</div>
				<table
					{...getTableProps()}
					className='w-full h-auto border-collapse overflow-hidden shadow-md'
				>
					<thead className='bg-[#55608f]'>
						{headerGroups.map((headerGroup, index) => (
							<tr {...headerGroup.getHeaderGroupProps()} key={index}>
								{headerGroup.headers.map((column,index) => (
									<th
										{...column.getHeaderProps(column.getSortByToggleProps())}
										key={index}
										className='p-15 bg-opacity-20 bg-black text-white text-center border-b-2 border-gray-300'
									>
										{column.render('Header')}
										<span>
											{column.isSorted
												? column.isSortedDesc
													? ' 🔽'
													: ' 🔼'
												: ''}
										</span>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row,index) => {
							prepareRow(row);
							key={index}
							return (
								<tr
									{...row.getRowProps()}
									className='hover:bg-opacity-30 hover:bg-gray-500 '
								>
									{row.cells.map((cell, index) => (
										<td
											{...cell.getCellProps()}
											key={index}
											className='py-7 px-14 bg-opacity-20 bg-white text-black border-2'
										>
											{cell.render('Cell')}
										</td>
									))}
								</tr>
							);
						})}
					</tbody>
				</table>
				<button onClick={applyPendingChange}>Save Changes</button>
				<div className='flex justify-evenly'>
					<button onClick={() => previousPage()} disabled={!canPreviousPage}>
						prev
					</button>
					<button onClick={() => nextPage()} disabled={!canNextPage}>
						next
					</button>
					<span>
						Page
						<strong>
							{pageIndex + 1} of {pageOptions.length}
						</strong>
					</span>
					<span>
						| Go to page:
						<input
							type='text'
							defaultValue={pageIndex + 1}
							onChange={(e) => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0;
								gotoPage(page);
							}}
							style={{ width: '50px' }}
						/>
					</span>
					<select
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
					>
						{[5, 10, 15, 20].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}
