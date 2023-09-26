'use client';

import footer from '../styles/components/Footer.module.scss';
import ContactIcons from '../components/contact-icons';
import Link from 'next/link';

const Footer = () => {
	return (
		<div className={footer.footerContainer}>
			<div className={footer.footerDescriptionContainer}>
				<img
					className={footer.footerLogoContainer}
					src="/icons/logo.png"
					alt="logo la patisse"
				/>
				<p>
					La Pâtisse n'est rien d'autre qu'un simple recueil de mes
					recettes favorites. Elle est née de ma volonté d'en faire
					l'inventaire et de la partager avec mon entourage 😊🍰.
				</p>
			</div>
			<div className={footer.sitemapContainer}>
				<h2> La Pâtisse </h2>
				<div className={footer.sitemapLinks}>
					<Link href="/">Accueil</Link>
					<Link href="/recettes">Recettes</Link>
				</div>
			</div>
			<div className={footer.footerContactContainer}>
				<h2>Me contacter</h2>
				<div className={footer.footerContactLinks}>
					<a href="mailto:marc.lachartre@gmail.com">
						marc.lachartre@gmail.com
					</a>
					<ContactIcons color="white" />
				</div>
			</div>
		</div>
	);
};

export default Footer;
