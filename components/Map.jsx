'use client';

import React, { useState } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

export default function Map() {
	const key = 'AIzaSyB3rS6UDVt2aN_8zki8FmvPMbm0rq1FH6Q';

	const containerStyle = {
		width: '100%',
		height: '600px',
	};

	const markers = [
		{
			position: {
				lat: 4.722365,
				lng: -74.065015,
			},
			label: 'FashionFinds Bogotá',
		},
		{
			position: {
				lat: -34.568767,
				lng: -58.698108,
			},
			label: 'FashionFinds Buenos Aires',
		},
	];
	const [center, setCenter] = useState(markers[0].position);

	const handleListItemClick = (marker) => {
		setCenter(marker.position);
	};

	return (
		<LoadScript googleMapsApiKey={key}>
			<h2 className='text-[3.4rem] font-semibold text-center pb-[2rem] mt-5'>
				Find Us
			</h2>
			<div className='flex gap-5 mb-2 '>
				{markers.map((marker, index) => (
					<button
						key={index}
						className=' text-black text-lg font-semibold hover:pointer'
						onClick={() => handleListItemClick(marker)}
					>
						{marker.label}
					</button>
				))}
			</div>
			<GoogleMap center={center} zoom={17} mapContainerStyle={containerStyle}>
				{markers.map((marker, index) => (
					<Marker
						key={index}
						position={marker.position}
						label={{
							text: marker.label,
							color: 'white',
							className: 'bg-black text-lg rounded-full py-0 px-2',
						}}
					/>
				))}
			</GoogleMap>
		</LoadScript>
	);
}
