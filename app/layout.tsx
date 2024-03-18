'use client';
import AlertMessage from '@/components/layout/alert-message';
import Footer from '@/components/layout/footer';
import { AlertDispatchContext } from '@context/layout/alert-context';
import type { AlertState } from 'custom-types/layout-types';
import { SessionProvider } from 'next-auth/react';
import { useReducer } from 'react';
import { alertReducer } from 'reducers/layout/alert-reducer';
import Navbar from '../components/layout/navbar';
import './global.scss';
import ThemeRegistry from './ThemeRegistry';

export default function RootLayout({
    // session,
    children,
}: {
    // session: any;
    children: React.ReactNode;
}) {
    const initialAlert: AlertState = {
        display: false,
    };

    const [alert, alertDispatch] = useReducer(alertReducer, initialAlert);

    return (
        <SessionProvider>
            <html lang="en">
                <body>
                    <ThemeRegistry options={{ key: 'mui' }}>
                        <Navbar />
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
                        <Footer />
                    </ThemeRegistry>
                </body>
            </html>
        </SessionProvider>
    );
}
