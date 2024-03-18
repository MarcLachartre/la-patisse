import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const OPTIONS: NextAuthOptions = {
    providers: [
        GoogleProvider({
            profile(profile) {
                // console.log('Profile Google: ', profile);

                let userRole = 'Google User';
                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                };
            },
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        // CredentialsProvider({
        //     name: 'Credentials',
        //     credentials: {
        //         email: {
        //             label: 'email:',
        //             type: 'text',
        //             placeholder: 'your-email',
        //         },
        //         password: {
        //             label: 'password:',
        //             type: 'password',
        //             placeholder: 'your-password',
        //         },
        //     },
        //     async authorize(credentials) {
        //         try {
        //             const foundUser = await User.findOne({
        //                 email: credentials.email,
        //             })
        //                 .lean()
        //                 .exec();

        //             if (foundUser) {
        //                 console.log('User Exists');
        //                 const match = await bcrypt.compare(
        //                     credentials.password,
        //                     foundUser.password
        //                 );

        //                 if (match) {
        //                     console.log('Good Pass');
        //                     delete foundUser.password;

        //                     foundUser['role'] = 'Unverified Email';
        //                     return foundUser;
        //                 }
        //             }
        //         } catch (error) {
        //             console.log(error);
        //         }
        //         return null;
        //     },
        // }),
    ],
    callbacks: {
        // async signin() {},
        async jwt({ token, user }: { token: any; user: any }) {
            // console.log(user);
            if (user) token.role = user.email;
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            // console.log(session);
            if (session?.user) session.user.role = token.role;
            return session;
        },
    },
};

const handler = NextAuth(OPTIONS);
export { handler as GET, handler as POST };
