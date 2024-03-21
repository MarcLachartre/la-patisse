import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        if (
            (req.nextUrl.pathname.startsWith('/recettes/create') || // create page matcher
                /^\/recettes\/([0-9]+([A-Za-z]+[0-9]+)+)\/edit$/i.test(
                    // edit recipe page matcher
                    req.nextUrl.pathname
                )) &&
            req.nextauth.token?.role != process.env.ADMIN1 &&
            req.nextauth.token?.role != process.env.ADMIN2 &&
            req.nextauth.token?.role != process.env.ADMIN3
        ) {
            return NextResponse.rewrite(new URL('/auth/denied', req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ['/recettes/create', '/recettes/:_id*/edit'],
};
