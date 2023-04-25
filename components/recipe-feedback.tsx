import React from 'react';
import recipeFeedback from '../styles/components/RecipeFeedback.module.scss';
import ContactIcons from './contact-icons';

const RecipeFeedback = () => {
	return (
		<div className={recipeFeedback.recipeFeedbackContainer}>
			<h2>C'était bon?</h2>
			<div className={recipeFeedback.giveFeedbackContainer}>
				<p>{"Dis moi comment c'était! →"}</p>
				<ContactIcons color="orange" />
			</div>
		</div>
	);
};

export default RecipeFeedback;
