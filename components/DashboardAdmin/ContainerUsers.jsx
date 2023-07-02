'use client';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';

export default function ContainerUsers() {
	const [userData, setUserData] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(0);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get('https://backend-33ft37a-deploy.vercel.app/users');
				console.log(response);
				setUserData(response.data.documents);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		fetchUsers();
	}, []);

	const data = useMemo(() => userData, [userData]);
	console.log(data);
	const columns = useMemo(
		() => [
			// {
			// 	Header: 'ID',
			// 	accessor: '_id',
			// 	canSort: false,
			// },
			{
				Header: 'User Name',
				accessor: 'name',
				canSort: true,
				sortType: (rowA, rowB, columnId) => {
					const valueA = rowA.values[columnId] || '';
					const valueB = rowB.values[columnId] || '';
					return valueA.localeCompare(valueB);
				},
			},
			{
				Header: 'email',
				accessor: 'email',
				canSort: true,
				Cell: ({ row }) => {
					const email = row.original.email;
					return email ? email : <p className='font-semibold text-lg'>N/A</p>;
				},
				sortType: (rowA, rowB, columnId) => {
					const valueA = rowA.values[columnId] || '';
					const valueB = rowB.values[columnId] || '';
					return valueA.localeCompare(valueB);
				},
			},
			{
				Header: 'Contact Number',
				accessor: 'phoneNumber',
				Cell: ({ row }) => {
					const phoneNumber = row.original.phoneNumber;
					return phoneNumber ? (
						phoneNumber
					) : (
						<p className='font-semibold text-lg'>N/A</p>
					);
				},
				canSort: false,
			},
			{
				Header: 'Active',
				accessor: 'isActive',
				Cell: ({ row }) => (
					<select
						value={row.original.isActive}
						onChange={(e) =>
							updateUser(
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
			{
				Header: 'Admin',
				accessor: 'isAdmin',
				Cell: ({ row }) => (
					<select
						value={row.original.isAdmin}
						onChange={(e) =>
							updateUser(row.original._id, 'isAdmin', e.target.value === 'true')
						}
						className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
					>
						<option value='true'>Admin</option>
						<option value='false'>Not Admin</option>
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
		[],
	);

	const filteredData = useMemo(() => {
		if (searchTerm === '') {
			return data;
		} else {
			return data.filter(
				(user) =>
					user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					user.email.toLowerCase().includes(searchTerm.toLowerCase()),
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
			initialState: { pageIndex: currentPage, pageSize: 5 },
		},
		useSortBy,
		usePagination,
	);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	// useEffect(() => {
	// 	setCurrentPage(0);
	// }, [searchTerm]);

	const updateUser = async (userId, propertyName, value) => {
		try {
			const updates = { [propertyName]: value };
			await axios.put(`https://backend-33ft37a-deploy.vercel.app/users/${userId}`, updates);
			setUserData(
				(prevData) =>
					prevData.map((user) => {
						if (user._id === userId) {
							return {
								...user,
								[propertyName]: value,
							};
						}
						return user;
					}),
				setCurrentPage(pageIndex),
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='w-11/12 mx-auto py-4'>
			<div className='bg-white shadow-md rounded-lg overflow-hidden'>
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
								{headerGroup.headers.map((column, index) => (
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
						{page.map((row, index) => {
							prepareRow(row);
							key={index}
							return (
								<tr
								key={index}
									{...row.getRowProps()}
									className='hover:bg-opacity-30 hover:bg-gray-500 '
								>
									{row.cells.map((cell,index) => (
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
							type='number'
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
