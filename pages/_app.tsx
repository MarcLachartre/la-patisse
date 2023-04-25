import '@/styles/global.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				></meta>
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
