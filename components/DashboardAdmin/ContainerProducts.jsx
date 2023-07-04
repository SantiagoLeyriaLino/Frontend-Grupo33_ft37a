'use client';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, usePagination, useCell } from 'react-table';
import EditForm from './EditForm';
// import { IoMdImages } from 'react-icons/io';
// import Swal from 'sweetalert2';
// import { useFormik } from 'formik';

export default function ContainerProducts() {
	const [productData, setProductData] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);

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
				Cell: ({ value }) => (
					<div>
						{value.map((s, idx) => (
							<div key={idx}>
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
						{value.map((image) => (
							<img
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
				Cell: ({ row }) => (
					<select
						value={row.original.isActive}
						// onChange={(e) =>
						// 	updateProduct(row.original._id, 'isActive', e.target.value)
						// }
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

	return (
		<div className='w-11/12 mx-auto py-14'>
			<div className='shadow-md rounded-lg overflow-hidden'>
				{showEditModal && (
					<EditForm product={selectedProduct} onClose={closeEditModal} />
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
									className='hover:bg-opacity-30 hover:bg-gray-500 '
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
				</div>
			</div>
		</div>
	);
}
