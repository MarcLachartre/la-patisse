import { Button } from '@mui/material';
import type { Viewport } from 'next';
import { Metadata } from 'next';
import Link from 'next/link';
import MinimalFooter from '../components/minimal-footer';
import styles from '../styles/pages/Home.module.scss';

export const metadata: Metadata = {
    title: 'La Pâtisse 🍰',
    applicationName: 'La Pâtisse 🍰',
    description:
        "La Pâtisse n'est rien d'autre qu'un simple recueil de recettes pros et persos. Elle est née de ma volonté d'en faire l'inventaire et de la partager😊🍰.",
    creator: 'Marc Lachartre',
    keywords:
        'La Pâtisse, pâtisserie, delicatessen, recette, recettes, gateaux, entremets, cake, tarte, CAP, chef',

    openGraph: {
        title: 'La Pâtisse 🍰',
        images: 'https://res.cloudinary.com/dgi1q0deg/image/upload/v1697644670/La%20Patisse/1710874863717.png',
        description:
            "La Pâtisse n'est rien d'autre qu'un simple recueil de recettes pros et persos. Elle est née de ma volonté d'en faire l'inventaire et de la partager😊🍰.",
    },
};

const jsonLd = {
    '@context': 'https://www.la-patisse.com',
    '@type': 'Recettes',
    name: 'La Pâtisse 🍰',
    image: 'https://res.cloudinary.com/dgi1q0deg/image/upload/v1697644670/La%20Patisse/1710874863717.png',
    description:
        "La Pâtisse n'est rien d'autre qu'un simple recueil de recettes pros et persos. Elle est née de ma volonté d'en faire l'inventaire et de la partager😊🍰.",
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
};

const Page = () => {
    return (
        <div className={styles.homepageContainer}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className={styles.homepageBackground}></div>
            <img
                src="/homepage-cake.png"
                alt="homepage-cake"
                className={styles.homepageImage}
            />
            <div className={styles.homepageDescriptionContainer}>
                <h1>La Pâtisse</h1>
                <h5>
                    Bienvenue! Entre recettes professionelles et personnelles,
                    La Pâtisse n'est pas qu'un simple recueil de recettes, c'est
                    la volonté de partager les souvenirs d'une enfance
                    gourmande, des découvertes pâtissières mais aussi des
                    classiques de la pâtisserie francaise avec des recettes de
                    chefs 🍰🧑‍🍳!
                </h5>
                <div className={styles.buttonContainer}>
                    <Link href="/recettes">
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth={true}
                            size="large"
                        >
                            Patisser
                        </Button>
                    </Link>
                </div>
            </div>
            <MinimalFooter />
        </div>
    );
};

export default Page;
