'use client';

import footer from '@/styles/components/Footer.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ContactIcons from '../contact-icons';

const Footer = () => {
    const pathname = usePathname();
    const [display, setDisplay] = useState('none');

    useEffect(() => {
        pathname === '/' ? setDisplay('none') : setDisplay('flex'); // Do not display footer if page is homepage
    }, [pathname]);

    return (
        <div
            className={footer.footerContainer}
            style={{ display: `${display}` }}
        >
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
                    <Link href="/privacy-policy">
                        Politique de confidentialité
                    </Link>
                </div>
            </div>
            <div className={footer.footerContactContainer}>
                <h2>Me contacter</h2>
                <div className={footer.footerContactLinks}>
                    <a href="mailto:lapatisse.pro@gmail.com">
                        lapatisse.pro@gmail.com
                    </a>
                    <ContactIcons color="white" />
                </div>
            </div>
        </div>
    );
};

export default Footer;
