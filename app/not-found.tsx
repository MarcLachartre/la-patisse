import { Button, Link } from '@mui/material';
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
