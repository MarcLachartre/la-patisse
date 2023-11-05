import style from '@/styles/components/forms/create-recipe/Introduction.module.scss';

import Input from '@/components/forms/inputs/text';

const Introduction = () => {
	return (
		<div className={style.introductionContainer}>
			<div className={style.addTitleContainer}>
				<Input placeholder={'Ajoute un titre'} maxlength={50} />
			</div>
			<div className={style.addDescriptionContainer}>
				<Input placeholder={'Ajoute une description'} maxlength={450} />
			</div>
			<div className={style.addRecipePicContainer}>
				<img src="/icons/plus.png" alt="add" />
				<p> Ajoute une image </p>
			</div>
		</div>
	);
};

export default Introduction;
