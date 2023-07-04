'use client';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditForm({ product, onClose }) {
	const [images, setImages] = useState([]);
	const [sizeValue, setSizeValue] = useState([]);
	const [colorValue, setColorValue] = useState([]);

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Name is required').min(4),
		category: Yup.string().required('Category is required').min(4),
		// color: Yup.string().required('Color is required'),
		gender: Yup.string().required('Gender is required'),
		season: Yup.string().required('Season is required'),
		// brand: Yup.string().required('Brand is required'),
		price: Yup.number().positive('Price must be a positive number'),
		articleCode: Yup.string().required('articleCode is required'),
		stock: Yup.number().positive('Price must be a positive number'),
		size: Yup.string().max(15, 'Field cannot exceed 15 characters'),
	});

	const formik = useFormik({
		initialValues: {
			name: product.name || '',
			category: product.category || '',
			gender: product.gender || '',
			size: '',
			color: product.color || '',
			season: product.season || '',
			stock: '',
			brand: product.brand || '',
			price: product.price || 1,
			articleCode: product.articleCode || '',
		},
		validationSchema: validationSchema,
		validate: (values) => {
			const errors = {};

			if (sizeValue.length === 0) {
				errors.sizeValue = 'At least one size is required';
			}

			return errors;
		},
		onSubmit: (values) => {
			const formData = new FormData();
			formData.append('name', values.name);
			formData.append('category', values.category);
			formData.append('gender', values.gender);
			sizeValue.forEach((value) => {
				formData.append('size[]', JSON.stringify(value));
			});
			formData.append('color', values.color);
			formData.append('season', values.season);
			formData.append('stock', values.stock);
			formData.append('brand', values.brand);
			formData.append('articleCode', values.articleCode);
			formData.append('price', values.price);
			images.length
				? images.forEach((file) => {
						formData.append('images', file);
				  })
				: formData.append('images', product.images);
			console.log(product.images);
			axios
				.put(`https://backend-33ft37a-deploy.vercel.app/products/${product._id}`, formData)
				.then((response) => {
					Swal.fire({
						title: 'Create Product!',
						text: `product was successfully created`,
						icon: 'success',
						confirmButtonText: 'continue',
					});
					console.log(response.data);
					formik.setValues(formik.initialValues);
					setSizeValue([]);
					setImages([]);
				})
				.catch((error) => {
					console.log(error);
					Swal.fire({
						title: 'Error!',
						text: `${error.response.data.error}`,
						icon: 'error',
						confirmButtonText: 'continue',
					});
				});
		},
	});
	useEffect(() => {
		if (product) {
			formik.setValues({
				name: product.name || '',
				category: product.category || '',
				gender: product.gender || '',
				size: '',
				color: product.color || '',
				season: product.season || '',
				stock: '',
				brand: product.brand || '',
				price: product.price || 1,
				articleCode: product.articleCode || '',
			});
			setSizeValue(product.size || []);
			setColorValue(product.color || []);
		}
	}, [product]);

	useEffect(() => {
		formik.validateForm();
	}, [formik.values, sizeValue]);
	useEffect(() => {
		console.log({ color: colorValue, size: sizeValue });
	}, [sizeValue, colorValue]);
	const handleChange = (event) => {
		formik.handleChange(event);
	};
	const handleClick = (event) => {
		if (formik.values.size.length > 0 && formik.values.stock != 0) {
			setSizeValue([
				...sizeValue,
				{ size: formik.values.size, stock: formik.values.stock },
			]);
		} else {
			alert('Invalid Values in "Size or Stock"');
		}
		formik.setFieldValue('size', '');
		formik.setFieldValue('stock', 1);
		console.log(size);
	};
	const handleClickColor = (event) => {
		setColorValue([...colorValue, formik.values.color]);
		formik.setFieldValue('color', '');
		console.log(color);
	};
	function handleImage(files) {
		const selectFiles = Array.from(files).slice(0, 3);
		setImages(selectFiles);
	}
	const handleBlur = (event) => {
		formik.handleBlur(event);
	};

	const handleDlete = (value) => {
		let newArr = sizeValue.filter((size) => size.size != value);
		setSizeValue(newArr);
	};

	return (
		<div className='flex flex-col items-center justify-center bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-3xl mx-auto'>
			<button onClick={onClose}>X</button>
			<h1 className='text-4xl font-bold text-black mb-[2rem]'>
				Add your products
			</h1>
			<form
				onSubmit={formik.handleSubmit}
				className=' relative w-full flex flex-col gap-y-[2rem]'
			>
				<div className=''>
					<label htmlFor='name' className='text-lg mb-2'>
						Name:
					</label>
					<input
						type='text'
						id='name'
						placeholder='e.g., Martin'
						onChange={handleChange}
						value={formik.values.name}
						onBlur={handleBlur}
						className='w-full px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
					{formik.errors.name && (
						<div className='absolute text-red-500 text-sm'>
							{formik.errors.name}
						</div>
					)}
				</div>

				<div className='flex justify-between  '>
					<div className='w-[60%]'>
						<label
							htmlFor='brand'
							className='relative flex flex-col gap-y-[0.4rem]'
						>
							Brand:{' '}
						</label>
						<input
							type='text'
							id='brand'
							placeholder='eje: Nike'
							onChange={handleChange}
							value={formik.values.brand}
							onBlur={handleBlur}
							className='py-[0.6rem] px-[1rem] rounded-[0.4rem] shadow-md shadow-[#11111180] w-[100%]'
						/>
						{formik.errors.brand && (
							<div className='absolute text-red-500 text-sm'>
								{formik.errors.brand}
							</div>
						)}
					</div>

					<div className='w-[30%]'>
						<label htmlFor='articleCode' className='relative'>
							Aticle Code
						</label>
						<input
							type='text'
							id='articleCode'
							placeholder='eje: 500'
							onChange={handleChange}
							value={formik.values.articleCode}
							onBlur={handleBlur}
							className='py-[0.6rem] px-[1rem] rounded-[0.4rem] shadow-md shadow-[#11111180] w-[100%]'
						/>
						{formik.errors.articleCode && (
							<div className='absolute text-red-500 text-sm'>
								{formik.errors.articleCode}
							</div>
						)}
					</div>
				</div>

				<div className='flex justify-between '>
					<div className='justify-start w-[30%] '>
						<label htmlFor='images'>
							Images:
							<span className=' gap-y-[0.4rem] bg-black text-white rounded-[0.4rem]  flex flex-col py-[0.6rem] px-[1rem] shadow-md shadow-[#11111180]'>
								{`${images ? images.length : 0} Images selected `}
							</span>
							<input
								type='file'
								multiple
								id='images'
								placeholder='Choose Images'
								onChange={(e) => handleImage(e.target.files)}
								style={{
									display: 'none',
								}}
							/>
						</label>
					</div>

					<div className='w-[25%] '>
						<label
							htmlFor='color'
							className='relative flex flex-col gap-y-[0.4rem]'
						>
							Color:{' '}
						</label>
						<input
							type='text'
							id='color'
							placeholder='eje: Red'
							onChange={handleChange}
							value={formik.values.color}
							onBlur={handleBlur}
							className='w-[100%] py-[0.6rem] px-[1rem] rounded-[0.4rem] shadow-md shadow-[#11111180]'
						/>
						{formik.errors.color && (
							<div className='absolute text-red-500 text-sm'>
								{formik.errors.color}
							</div>
						)}
					</div>

					<div className='w-[18%]'>
						<label htmlFor='price' className='relative'>
							Price:
						</label>
						<input
							type='number'
							id='price'
							placeholder='eje: 500'
							onChange={handleChange}
							value={formik.values.price}
							onBlur={handleBlur}
							className='w-full py-[0.6rem] px-[1rem] rounded-[0.4rem] shadow-md shadow-[#11111180]'
						/>
						{formik.errors.price && (
							<div className='absolute text-red-500 text-sm'>
								{formik.errors.price}
							</div>
						)}
					</div>
				</div>

				<div className='flex   py-[1rem]  justify-between  mt-[1rem]'>
					<div className='flex flex-col justify-between gap-y-[1.6rem]'>
						<div className=''>
							<label
								htmlFor='category'
								className='relative flex flex-col gap-y-[0.4rem]'
							>
								Category:{' '}
							</label>
							<select
								id='category'
								onChange={handleChange}
								onBlur={handleBlur}
								value={formik.values.category}
								className='w-full px-4 py-2  shadow-md focus:outline-none focus:ring-2 focus:ring-[#F8652A] bg-black text-white rounded-[0.4rem]'
							>
								<option value=''>Select</option>
								<option value='shoe'>Shoe</option>
								<option value='hoodie'>Hoodie</option>
								<option value='t-shirt'>T-shirt</option>
								<option value='pants'>Pants</option>
							</select>
							{formik.errors.category && (
								<div className='absolute text-red-500 text-sm'>
									{formik.errors.category}
								</div>
							)}
						</div>
						<div className=''>
							<label
								htmlFor='gender'
								className='relative flex flex-col gap-y-[0.4rem]'
							>
								Gender:
							</label>
							<select
								id='gender'
								onChange={handleChange}
								onBlur={handleBlur}
								value={formik.values.gender}
								className='w-full px-4 py-2  shadow-md focus:outline-none focus:ring-2 focus:ring-[#F8652A] bg-black text-white rounded-[0.4rem]'
							>
								<option value=''>Select</option>
								<option value='male'>Male</option>
								<option value='female'>Female</option>
								<option value='child'>Child</option>
							</select>
							{formik.errors.gender && (
								<div className='absolute text-red-500 text-sm'>
									{formik.errors.gender}
								</div>
							)}
						</div>
						<div className=''>
							<label
								htmlFor='season'
								className='relative flex flex-col gap-y-[0.4rem]'
							>
								Season:{' '}
							</label>
							<select
								id='season'
								onChange={handleChange}
								onBlur={handleBlur}
								value={formik.values.season}
								className='w-full px-4 py-2  shadow-md focus:outline-none focus:ring-2 focus:ring-[#F8652A] bg-black text-white rounded-[0.4rem]'
							>
								<option value=''>Select</option>
								<option value='spring'>Spring </option>
								<option value='summer'>Summer </option>
								<option value='autumn'>Autumn</option>
								<option value='winter'>Winter </option>
							</select>
							{formik.errors.season && (
								<div className='absolute text-red-500 text-sm'>
									{formik.errors.season}
								</div>
							)}
						</div>
					</div>
					<div className=' w-[25%]'>
						<h3 className='text-center font-bold '>Size List</h3>
						<div className='relative  w-[100%] flex flex-col gap-y-[1rem] p-[1rem] border-[1px] border-[#F8652A] rounded-[0.6rem]'>
							<label
								htmlFor='size'
								className='flex items-center justify-end gap-x-[1rem]'
							>
								Size:
								<input
									type='text'
									id='size'
									placeholder='eje: 42'
									onChange={handleChange}
									value={formik.values.size}
									onBlur={handleBlur}
									className='w-[50%] py-[0.6rem] px-[0.4rem] rounded-[0.4rem] shadow-md shadow-[#11111180]'
								/>
								{formik.errors.size &&
									setSizeValue &&
									sizeValue.length === 0 && (
										<div className='text-red-500 text-sm'>
											{formik.errors.size}
										</div>
									)}
							</label>
							<label
								htmlFor='stock'
								className='  flex items-center justify-end gap-x-[1rem]'
							>
								Stock:
								<input
									type='number'
									id='stock'
									placeholder='eje: 42'
									onChange={handleChange}
									value={formik.values.stock}
									onBlur={handleBlur}
									className='w-[50%] py-[0.6rem] pl-[0.4rem] rounded-[0.4rem] shadow-md shadow-[#11111180]'
								/>
								{formik.errors.stock &&
									setSizeValue &&
									sizeValue.length === 0 && (
										<div className='absolute top-full text-red-500 text-sm'>
											{formik.errors.stock}
										</div>
									)}
							</label>
							{!formik.errors.size && !formik.errors.stock && (
								<button
									onClick={handleClick}
									className='text-[1rem] py-4 px-[2rem] bg-black text-white rounded-[0.4rem] w-24 mx-auto relative shadow-md shadow-[#11111180]'
								>
									<span className='absolute inset-0 flex items-center justify-center'>
										Add
									</span>
								</button>
							)}
						</div>
					</div>
					<div className=' w-[40%]'>
						<h3 className='text-center font-bold '>Size List</h3>
						{sizeValue && sizeValue.length > 0 ? (
							<div className=' w-[100%]  mx-[auto] border-[1px] border-[#F8652A] rounded-[0.6rem] items-start py-[1rem] '>
								<div className=' w-[85%] mx-[auto] flex flex-col gap-y-[0.6rem]'>
									{sizeValue.map((siz, index) => (
										<div
											key={index}
											className='flex items-center justify-between'
										>
											<span className='bg-black text-white px-[0.6rem] py-[0.4rem] rounded-[0.4rem]'>
												Size: {siz.size}
											</span>
											<span>-</span>
											<span className='bg-black text-white px-[0.6rem] py-[0.4rem] rounded-[0.4rem]'>
												Stock: {siz.stock}
											</span>
											<span
												className='cursor-pointer hover:bg-red-600  font-bold bg-red-400 text-white right-[4px] top-[10px] px-[0.6rem] rounded-[0.4rem]'
												onClick={() => handleDlete(siz.size)}
											>
												{' '}
												x
											</span>
										</div>
									))}
								</div>
							</div>
						) : (
							<div className='text-center w-[100%]  mx-[auto] border-[1px] border-[#F8652A] rounded-[0.6rem] items-start py-[1rem] '>
								{formik.errors.sizeValue && (
									<span className='text-red-500 text-sm text-center'>
										{formik.errors.sizeValue}
									</span>
								)}
							</div>
						)}
					</div>
				</div>

				<div className='mb-6 my-6 flex justify-center'>
					{!formik.errors.articleCode &&
						!formik.errors.brand &&
						!formik.errors.category &&
						!formik.errors.category &&
						!formik.errors.color &&
						!formik.errors.gender &&
						!formik.errors.name &&
						!formik.errors.price &&
						!formik.errors.season &&
						sizeValue &&
						sizeValue.length > 0 && (
							<button
								type='submit'
								className='font-normal text-[1rem] py-2 px-3 bg-black text-white transform -skew-x-12 w-24 h-12 shadow-md hover:bg-green-500 transition-colors duration-300'
								style={{
									clipPath:
										'polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%)',
								}}
							>
								Submit
							</button>
						)}
				</div>
			</form>
		</div>
	);
}
