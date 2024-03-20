import { Button } from '@mui/material';
import type { Viewport } from 'next';
import { Metadata } from 'next';
import Link from 'next/link';
import MinimalFooter from '../components/minimal-footer';
import styles from '../styles/pages/Home.module.scss';

export const metadata: Metadata = {
    title: 'La Pâtisse',
    description:
        "La Pâtisse n'est rien d'autre qu'un simple recueil de mes recettes favorites. Elle est née de ma volonté d'en faire l'inventaire et de la partager avec mon entourage 😊🍰.",
    creator: 'Marc Lachartre',
    keywords: 'La Pâtisse, pâtisserie, delicatessen',

    openGraph: {
        title: 'La Pâtisse 🍰',
        images: ' https://res.cloudinary.com/dgi1q0deg/image/upload/v1697644670/La%20Patisse/1710874863717.png',
        description:
            "La Pâtisse n'est rien d'autre qu'un simple recueil de mes recettes favorites. Elle est née de ma volonté d'en faire l'inventaire et de la partager avec mon entourage 😊🍰.",
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
};

const Page = () => {
    return (
        <div className={styles.homepageContainer}>
            <div className={styles.homepageBackground}></div>
            <img
                src="/homepage-cake.png"
                alt="homepage-cake"
                className={styles.homepageImage}
            />
            <div className={styles.homepageDescriptionContainer}>
                <h1>La Pâtisse</h1>
                <h5>
                    Bienvenue! La Pâtisse est un simple recueil des recettes de
                    gâteaux et autres delicatessen dont j'ai eu la chance de
                    profiter toute mon enfance et que je compte enrichir de mes
                    différentes découvertes pâtissières! 😊🍰 Curieux?
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
