import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import customAuth from '../../signInAuth';

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		// GithubProvider({
		// 	clientId: process.env.GITHUB_ID,
		// 	clientSecret: process.env.GITHUB_SECRET,
		// }),
	],
	callbacks: {
		async signIn({ user }) {
			await customAuth({ user });
			return true;
		},
	},
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
