'use client';

import style from '../styles/components/IngredientsList.module.scss';

interface Data {
	ingredients: {
		quantity: number;
		unit?: string;
		preposition?: string;
		type: string;
	}[];
}

const IngredientsList = (props: Data) => {
	const ingredientList = () => {
		return (
			<div className={style.ILContainer}>
				<h3>Ingrédients</h3>
				<ul>
					{props.ingredients.map((i, index) => (
						<li key={`ingredients${index}`}>
							{String(Object.values(i)[0])}{' '}
							{Object.values(i)[1] !== undefined
								? Object.values(i)[1]
								: ''}{' '}
							{Object.values(i)[2]} {Object.values(i)[3]}
						</li>
					))}
				</ul>
			</div>
		);
	};

	return ingredientList();
};

export default IngredientsList;
