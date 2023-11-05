import './global.scss';

import { Metadata } from 'next';
import Navbar from '../components/layout/navbar';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
	title: 'La Pâtisse',
	description:
		"La Pâtisse n'est rien d'autre qu'un simple recueil de mes recettes favorites. Elle est née de ma volonté d'en faire l'inventaire et de la partager avec mon entourage 😊🍰.",
	creator: 'Marc Lachartre',
	keywords: 'La Pâtisse, pâtisserie, delicatessen',
	viewport: {
		width: 'device-width',
		initialScale: 1.0,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Navbar />
				{children}
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
