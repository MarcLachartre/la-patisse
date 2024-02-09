'use client';
import AlertMessage from '@/components/layout/alert-message';
import Footer from '@/components/layout/footer';
import { AlertDispatchContext } from '@context/layout/alert-context';
import type { AlertState } from 'custom-types/layout-types';
import { useReducer } from 'react';
import { alertReducer } from 'reducers/layout/alert-reducer';
import Navbar from '../components/layout/navbar';
import './global.scss';
import ThemeRegistry from './ThemeRegistry';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const initialAlert: AlertState = {
        display: false,
    };

    const [alert, alertDispatch] = useReducer(alertReducer, initialAlert);

    return (
        <html lang="en">
            <body>
                <Navbar />
                <ThemeRegistry options={{ key: 'mui' }}>
                    <AlertDispatchContext.Provider
                        value={{ alert, alertDispatch }}
                    >
                        <AlertMessage
                            display={alert.display}
                            type={alert.type}
                            text={alert.text}
                        />
                        {children}
                    </AlertDispatchContext.Provider>
                </ThemeRegistry>
                <Footer />
            </body>
        </html>
    );
}

// import '@/styles/global.scss';
// import type { AppProps } from 'next/app';
// import Layout from '../components/layout/layout';
// import Head from 'next/head';

// export default function MyApp({ Component, pageProps }: AppProps) {
// 	return (
// 		<>
// 			<Layout>
// 				<Component {...pageProps} />
// 			</Layout>
// 		</>
// 	);
// }
