'use client';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, usePagination, useCell } from 'react-table';
import EditForm from './EditForm';
import Image from 'next/image';
// import { IoMdImages } from 'react-icons/io';
// import Swal from 'sweetalert2';
// import { useFormik } from 'formik';

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
		setSelectedProduct(product);
		setShowEditModal(true);
	};
	console.log(selectedProduct);

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
			{
				Header: 'Size',
				accessor: 'size',
				canSort: true,
				Cell: ({ value }) => (
					<div>
						{value.map((s, idx) => (
							<div key={idx} className='flex flex-col flex-wrap'>
								Size: {s.size}
								<br />
								Stock: {s.stock}
							</div>
						))}
					</div>
				),
			},
			{
				Header: 'Images',
				accessor: 'images',
				Cell: ({ row, value }) => (
					<div className='flex flex-row justify-evenly '>
						{value.map((image, index) => (
							<Image
							key={index}
								src={image}
								alt='img'
								className='w-14 h-14 gap-5 border rounded-lg object-cover w-100 h-100 shadow-lg '
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
				Cell: EditableCell,
				canSort: true,
				sortType: (rowA, rowB, columnId) => {
					const valueA = rowA.values[columnId] ? 1 : 0;
					const valueB = rowB.values[columnId] ? 1 : 0;
					return valueA - valueB;
				},
			},
			{
				Header: 'Actions',
				Cell: ({ row }) => (
					<button onClick={() => handleEdit(row.original)}>Edit</button>
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
					<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center'>
					<EditForm product={selectedProduct} onClose={closeEditModal} />
				</div>
				)}
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
							<tr key={index} {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column, index) => (
									<th
									key={index}
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
						{page.map((row,index) => {
							
							prepareRow(row);
							return (
								<tr
								key={index}
									{...row.getRowProps()}
									className='hover:bg-opacity-30 hover:bg-gray-500 '
								>
									{row.cells.map((cell, index) => (
										<td
										key={index}
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
				{/* <button onClick={saveChanges}>Save Changes</button> */}
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
					<button onClick={saveChanges}>Change product Status</button>
				</div>
			</div>
		</div>
	);
}
