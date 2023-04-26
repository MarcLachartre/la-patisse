import '@/styles/global.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta
					name="keywords"
					content="La Pâtisse, pâtisserie, delicatessen"
				></meta>
				<meta
					name="description"
					content="La Pâtisse n'est rien d'autre qu'un simple recueil de mes recettes favorites. Elle est née de ma volonté d'en faire l'inventaire et de la partager avec mon entourage 😊🍰."
				></meta>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				></meta>
				<title>La Pâtisse</title>
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
