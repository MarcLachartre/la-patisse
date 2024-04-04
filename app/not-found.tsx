import { Button, Link } from '@mui/material';
import { Metadata } from 'next';
import styles from 'styles/pages/NotFound.module.scss';

const NotFoundPage = () => {
    return (
        <div className="pageContainer">
            <div className={styles.notFoundMsgContainer}>
                <h1>Erreur 404</h1>
                <h1>Cette page n'existe pas!</h1>
                <h1>
                    <Link href="/">
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth={true}
                            size="large"
                        >
                            retour à l'accueil
                        </Button>
                    </Link>
                </h1>
            </div>
        </div>
    );
};

export default NotFoundPage;

export const metadata: Metadata = {
    title: 'La Pâtisse 🍰',
    description:
        "La Pâtisse n'est rien d'autre qu'un simple recueil de mes recettes favorites. Elle est née de ma volonté d'en faire l'inventaire et de la partager avec mon entourage 😊🍰.",
    creator: 'Marc Lachartre',
    keywords:
        'La Pâtisse, pâtisserie, delicatessen, recette, recettes, gateaux, entremets',

    openGraph: {
        title: 'La Pâtisse 🍰',
        images: ' https://res.cloudinary.com/dgi1q0deg/image/upload/v1697644670/La%20Patisse/1710874863717.png',
        description:
            "La Pâtisse n'est rien d'autre qu'un simple recueil de mes recettes favorites. Elle est née de ma volonté d'en faire l'inventaire et de la partager avec mon entourage 😊🍰.",
    },
};
