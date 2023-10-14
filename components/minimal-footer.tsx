'use client';

import styles from '../styles/components/MinimalFooter.module.scss';
import ContactIcons from './contact-icons';

const MinimalFooter = () => {
	return (
		<div className={styles.minimalFooterContainer}>
			<p className={styles.contactContainer}>Contact me</p>
			<div className={styles.contactLine}></div>
			<div className={styles.iconsContainerAnimation}>
				<ContactIcons color="white" />
			</div>
		</div>
	);
};

export default MinimalFooter;
