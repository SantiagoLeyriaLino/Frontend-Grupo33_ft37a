'use client';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import EditForm from './EditForm';
import { LuEdit } from 'react-icons/lu';

export default function ContainerProducts() {
	const [productData, setProductData] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [dataUpdate, setDataUpdate] = useState({});
	const [currentPage, setCurrentPage] = useState(0);

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
	const filteredData = useMemo(() => {
		if (searchTerm === '') {
			return data;
		} else {
			return data.filter((user) =>
				user.name.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		}
	}, [data, searchTerm]);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleEdit = (product) => {
		console.log(product);
		setSelectedProduct(product);
		setShowEditModal(true);
	};

	const closeEditModal = () => {
		setShowEditModal(false);
		setSelectedProduct(null);
	};

	const EditableCell = ({
		value: initialValue,
		row: { index },
		column: { id },
		updateData,
	}) => {
		const [value, setValue] = useState(initialValue);

		const onChange = (e) => {
			const newValue = e.target.value;
			setValue(newValue);
		};

		const onBlur = (e) => {
			const newValue = e.target.value === 'true';
			updateData(index, id, newValue);
		};

		useEffect(() => {
			setValue(initialValue);
		}, [initialValue]);

		return (
			<select
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
			>
				<option value='true'>Active</option>
				<option value='false'>Not Active</option>
			</select>
		);
	};

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
				Cell: ({ row, value }) => (
					<div className='max-w-xs overflow-hidden whitespace-nowrap overflow-ellipsis'>
						<p>{value}</p>
					</div>
				),
			},
			// {
			// 	Header: 'Size',
			// 	accessor: 'size',
			// 	canSort: true,
			// 	Cell: ({ value }) => (
			// 		<div className='space-y-3'>
			// 			{value.map((s, idx) => (
			// 				<div key={idx} className='flex flex-col  p-1 rounded-lg'>
			// 					<div className='text-sm '>Size: {s.size}</div>
			// 					<div className='text-sm'>Stock: {s.stock}</div>
			// 				</div>
			// 			))}
			// 		</div>
			// 	),
			// },
			{
				Header: 'Images',
				accessor: 'images',
				Cell: ({ row, value }) => (
					<div className='flex flex-row justify-evenly'>
						{value.map((image) => (
							<img
								key={image}
								src={image}
								alt='img'
								className='w-14 h-14 gap-5 border rounded-lg object-cover w-100 h-100 shadow-lg'
							/>
						))}
					</div>
				),
				canSort: false,
			},
			{
				Header: 'Price',
				accessor: 'price',
				canSort: true,
				// Cell: EditableCell,
			},
			{
				Header: 'Stock',
				accessor: 'stock',
				canSort: true,
			},
			{
				Header: 'Active',
				accessor: 'isActive',
				Cell: ({ value }) => {
					return value ? 'Active' : 'Not Active';
				},
				canSort: true,
				sortType: (rowA, rowB, columnId) => {
					const valueA = rowA.values[columnId] ? 1 : 0;
					const valueB = rowB.values[columnId] ? 1 : 0;
					return valueA - valueB;
				},
			},
			{
				Header: 'Edit',
				Cell: ({ row }) => (
					<label htmlFor={`edit-${row.index}`}>
						<button
							onClick={() => handleEdit(row.original)}
							className='hidden'
							id={`edit-${row.index}`}
						>
							Edit
						</button>
						<LuEdit className='h-7 w-7 cursor-pointer' />
					</label>
				),
				canSort: false,
			},
		],
		[],
	);

	const updateUser = (userId, propertyName, value) => {
		setDataUpdate((prevUpdatedUsers) => ({
			...prevUpdatedUsers,
			[userId]: {
				...prevUpdatedUsers[userId],
				[propertyName]: value,
			},
		}));

		setProductData((prevUserData) => {
			const updatedData = prevUserData.map((user) => {
				if (user._id === userId) {
					return {
						...user,
						[propertyName]: value,
					};
				}
				return user;
			});
			setCurrentPage(pageIndex);
			return updatedData;
		});
	};

	const saveChanges = async () => {
		try {
			for (const productId in dataUpdate) {
				const updates = dataUpdate[productId];
				console.log(updates);
				await axios.put(`https://backend-33ft37a-deploy.vercel.app/products/${productId}`, updates);
			}
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

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
			initialState: { pageIndex: currentPage, pageSize: 5 },
			updateData: (rowIndex, columnId, value) => {
				const productId = filteredData[rowIndex]._id;
				updateUser(productId, columnId, value);
			},
		},
		useSortBy,
		usePagination,
	);

	return (
		<div className='w-11/12 mx-auto py-14'>
			<div className='shadow-md rounded-lg overflow-hidden'>
				{showEditModal && (
					<div
						className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex justify-center items-center '
						onClick={closeEditModal}
					>
						<EditForm
							product={selectedProduct}
							onClose={closeEditModal}
							onClick={(e) => e.stopPropagation()}
						/>
					</div>
				)}
				<div className='p-4'>
					<input
						type='text'
						value={searchTerm}
						onChange={handleSearch}
						placeholder='Search products...'
						className='w-full py-2 px-3 border border-collapse rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm'
					/>
				</div>

				<table
					{...getTableProps()}
					className='w-full h-auto border-collapse overflow-hidden shadow-md'
				>
					<thead className='bg-orange-500'>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										{...column.getHeaderProps(column.getSortByToggleProps())}
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
						{page.map((row) => {
							prepareRow(row);
							return (
								<tr
									{...row.getRowProps()}
									className='hover:bg-opacity-30 hover:bg-gray-500'
								>
									{row.cells.map((cell) => (
										<td
											{...cell.getCellProps()}
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
				<div className='flex justify-evenly items-center'>
					<button
						onClick={() => previousPage()}
						disabled={!canPreviousPage}
						className={`py-1 px-2 text-white rounded ${
							!canPreviousPage
								? 'bg-gray-300 cursor-not-allowed'
								: 'bg-[#F8652A]'
						}`}
					>
						prev
					</button>
					<button
						onClick={() => nextPage()}
						disabled={!canNextPage}
						className={`py-1 px-2 text-white rounded ${
							!canNextPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#F8652A]'
						}`}
					>
						next
					</button>
					<span>
						Page{' '}
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
							className='ml-2 py-2 px-3 border border-collapse rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm'
						/>
					</span>
					<select
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
						className='py-2 px-3 border border-collapse rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm'
					>
						{[5, 10, 15, 20].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
					{/* <button
						onClick={saveChanges}
						className='bg-orange-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded'
					>
						Guardar cambios
					</button> */}
				</div>
			</div>
		</div>
	);
}
