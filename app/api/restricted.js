import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async (
	req,
	res,
	{ user, account, profile, email, credentials },
) => {
	const session = await getServerSession(req, res, authOptions);

	if (session) {
		res.send({
			content: 'Welcome Back!',
		});
	} else {
		res.send({
			error:
				'You must be signed in to view the protected content on this page.',
		});
	}
};
