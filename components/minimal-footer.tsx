import styles from '../styles/components/MinimalFooter.module.scss';
import ContactIcons from './contact-icons';

const MinimalFooter = () => {
	return (
		<div className={styles.minimalFooterContainer}>
			<p className={styles.contactContainer}>Contact me</p>
			<div className={styles.contactLine}></div>
			<ContactIcons color="white" />
		</div>
	);
};

export default MinimalFooter;
