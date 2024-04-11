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
                    Bienvenue! Entre recettes professionelles et personnelles,
                    La Pâtisse n'est pas qu'un simple recueil de recettes, c'est
                    la volonté de partager les souvenirs d'une enfance
                    gourmande, des découvertes culinaires mais aussi des
                    classiques de la pâtisserie francaise avec des recettes de
                    chefs 🍰🧑‍🍳!
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
