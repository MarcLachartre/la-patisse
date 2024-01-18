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
                    Bienvenu! La Pâtisse est un simple recueil des recettes de
                    gâteaux et autres delicatessens dont j'ai eu la chance de
                    profiter toute mon enfance et que je compte enrichir de mes
                    différentes découvertes pâtissières. 😊 🍰. Curieux?
                </h5>
                <div className={styles.buttonContainer}>
                    <Link href="/recettes">
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth={true}
                            size="large"
                            // href="/recettes"
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
