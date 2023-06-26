// import axios from 'axios';

// export default async function customAuth({ user }) {
// 	// const email = user.email;
// 	const userExistsResponse = await axios.get(
// 		`http://localhost:3001/users/${user.email}`,
// 	);
// 	if (!userExistsResponse.data) {
// 		// const password = nanoid();
// 		const newUserInfo = {
// 			name: user.name,
// 			email: user.email,
// 			password: 'GoogleNextAuthPassword32',
// 		};
// 		const newUser = await axios.post(
// 			'http://localhost:3001/users',
// 			newUserInfo,
// 		);
// 		localStorage.setItem(
// 			'user',
// 			JSON.stringify({
// 				data: newUser.data,
// 				validated: false,
// 			}),
// 		);
// 	} else {
// 		const url = `password=GoogleNextAuthPassword32&email=${userExistsResponse.data.email}`;
// 		const response = await axios.get(
// 			`http://localhost:3001/users/login?${url}`,
// 		);
// 		localStorage.setItem(
// 			'user',
// 			JSON.stringify({
// 				data: response.data,
// 				validated: false,
// 			}),
// 		);
// 	}
// }

import axios from 'axios';

export default async function customAuth({ user }) {
	const userExistsResponse = await axios.get(
		`https://backend-grupo-33ft37a-jpaguo1zy-santiagoleyrialino.vercel.app/users/auth/${user.email}`,
	);

	if (!userExistsResponse.data) {
		const newUserInfo = {
			name: user.name,
			email: user.email,
			password: 'GoogleNextAuthPassword32',
		};
		await axios.post('https://backend-grupo-33ft37a-jpaguo1zy-santiagoleyrialino.vercel.app/users', newUserInfo);
	} else {
		const url = `password=GoogleNextAuthPassword32&email=${userExistsResponse.data.email}`;
		await axios.get(`https://backend-grupo-33ft37a-jpaguo1zy-santiagoleyrialino.vercel.app/users/login?${url}`);
	}
}
