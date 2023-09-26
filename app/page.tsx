import styles from '../styles/pages/Home.module.scss';
import button from '../styles/components/Button.module.scss';
import MinimalFooter from '../components/minimal-footer';
import Link from 'next/link';

const Home = () => {
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
					<Link href="/recettes" className={button.button}>
						Patisser
					</Link>
				</div>
			</div>
			<MinimalFooter />
		</div>
	);
};

export default Home;
