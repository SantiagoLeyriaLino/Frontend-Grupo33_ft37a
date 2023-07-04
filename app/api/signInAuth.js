import axios from 'axios';
// import { nanoid } from 'nanoid';

export default async function customAuth({ user }) {
	const userExistsResponse = await axios.get(
		`https://backend-33ft37a-deploy.vercel.app/users/authNew/${user.email}`,
	);

	if (!userExistsResponse.data) {
		// const password = nanoid();
		const newUserInfo = {
			name: user.name,
			email: user.email,
			password: 'GoogleNextAuthPassword32',
		};
		await axios.post('https://backend-33ft37a-deploy.vercel.app/users', newUserInfo);
	}
}

// import axios from 'axios';
// import { nanoid } from 'nanoid';
// import bcrypt from 'bcrypt';

// export default async function customAuth({ user }) {
// 	const userExistsResponse = await axios.get(
// 		`https://backend-33ft37a-deploy.vercel.app/users/auth/${user.email}`,
// 	);

// 	if (!userExistsResponse.data) {
// 		const password = nanoid();
// 		const newUserInfo = {
// 			name: user.name,
// 			email: user.email,
// 			password: password,
// 		};
// 		await axios.post('https://backend-33ft37a-deploy.vercel.app/users', newUserInfo);
// 	} else {
// 		const { email, password: hashedPassword } = userExistsResponse.data;

// 		const passwordMatch = await bcrypt.compare(
// 			userExistsResponse.data.password,
// 			hashedPassword,
// 		);

// 		const url = `password=${userExistsResponse.data.password}&email=${email}`;

// 		await axios.get(`https://backend-33ft37a-deploy.vercel.app/users/login?${url}`);
// 	}
// }
