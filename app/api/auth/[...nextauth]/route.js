// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';

// const {
//     auth,
//     signIn,
//     signOut,
//     handlers: { GET, POST },
// } = NextAuth({
//     // Configure one or more authentication providers
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID || '',
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
//         }),
//         // ...add more providers here
//     ],
//     secret: process.env.SECRET,
//     callbacks: {
//         async session({ session, token }: any) {
//             token.username !== undefined
//                 ? (session.user.username = token.username)
//                 : false;

//             return session;
//         },

//         async jwt({ token, profile }: any) {
//             if (profile !== undefined) {
//                 token.username === undefined
//                     ? (token.username = profile.username)
//                     : false;
//             }
//             return token;
//         },
//     },
// });

// export { GET, POST };
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const OPTIONS = {
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
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
        async signin() { },
        async jwt({ token, user }) {
            // console.log(user);
            if (user) token.role = user.email;
            return token;
        },
        async session({ session, token }) {
            // console.log(session);
            if (session?.user) session.user.role = token.role;
            return session;
        },
    },
};

const handler = NextAuth(OPTIONS);
export { handler as GET, handler as POST };
