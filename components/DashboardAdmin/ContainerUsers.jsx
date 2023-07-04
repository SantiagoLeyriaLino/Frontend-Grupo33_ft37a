'use client';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { useRouter } from 'next/navigation';

export default function ContainerUsers() {
	const router = useRouter();

	const [localUser, setLocalUser] = useState({})
	const [userData, setUserData] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(0);
	const [dataUpdate, setDataUpdate] = useState({});

	useEffect(() => {
		let data = JSON.parse(localStorage.getItem('user'));
		if (data && data.data) setLocalUser(data);
	}, []);

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

	const updateUser = (userId, propertyName, value) => {
		setDataUpdate((prevUpdatedUsers) => ({
			...prevUpdatedUsers,
			[userId]: {
				...prevUpdatedUsers[userId],
				[propertyName]: value,
			},
		}));

		setUserData((prevUserData) => {
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
			for (const userId in dataUpdate) {
				const updates = dataUpdate[userId];
				console.log(updates);
				let token = localUser.data.token
				console.log({ESTEESELTOKEN:localUser})
				await axios.put(`https://backend-33ft37a-deploy.vercel.app/users/${userId}`, updates, {
					headers: {
						Authorization: `Bearer ${token}`
					  }
				});
			}
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const data = useMemo(() => userData, [userData]);
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
			const newValue = e.target.value;
			updateData(index, id, newValue);
		};

		useEffect(() => {
			setValue(initialValue);
		}, [initialValue]);

		if (id === 'isActive') {
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
		} else if (id === 'isAdmin') {
			return (
				<select
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
				>
					<option value='true'>Admin</option>
					<option value='false'>Not Admin</option>
				</select>
			);
		}
	};

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};
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
				Cell: EditableCell,
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
				Cell: EditableCell,
				canSort: true,
				sortType: (rowA, rowB, columnId) => {
					const valueA = rowA.values[columnId] ? 1 : 0;
					const valueB = rowB.values[columnId] ? 1 : 0;
					return valueA - valueB;
				},
			},
		],
		[data, dataUpdate],
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
						{page.map((row, index) => {
							
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
				<button onClick={saveChanges}>Save Changes</button>
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
