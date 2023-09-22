import { Metadata } from 'next';

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
	// Layouts must accept a children prop.
	// This will be populated with nested layouts or pages
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
