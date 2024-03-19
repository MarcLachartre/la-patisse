import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        // console.log(req);
        // console.log(req.nextUrl.pathname);
        console.log(
            req.nextauth.token?.role != 'marc.lachartre@gmail.com' ||
                req.nextauth.token?.role != 'h.lachartre@gmail.com'
        );

        if (
            (req.nextUrl.pathname.startsWith('/recettes/create') || // create page matcher
                /^\/recettes\/([0-9]+([A-Za-z]+[0-9]+)+)\/edit$/i.test(
                    // edit recipe page matcher
                    req.nextUrl.pathname
                )) &&
            req.nextauth.token?.role != 'marc.lachartre@gmail.com' &&
            req.nextauth.token?.role != 'h.lachartre@gmail.com' &&
            req.nextauth.token?.role != 'lachartrehelena@gmail.com' &&
            req.nextauth.token?.role != 'paulamdp17@gmail.com'
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
