import axios from 'axios';

export default async function customAuth({ user }) {
	const userExistsResponse = await axios.get(
		`https://backend-33ft37a-deploy.vercel.app/users/auth/${user.email}`,
		
	);

	if (!userExistsResponse.data) {
		const newUserInfo = {
			name: user.name,
			email: user.email,
			password: 'GoogleNextAuthPassword32',
		};
		await axios.post('https://backend-33ft37a-deploy.vercel.app/users', newUserInfo);
		
	} else {
		const url = `password=GoogleNextAuthPassword32&email=${userExistsResponse.data.email}`;
		await axios.get(`https://backend-33ft37a-deploy.vercel.app/users/login?${url}`);
	}
}
