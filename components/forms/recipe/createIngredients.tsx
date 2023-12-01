'use client';
import type { Ingredient } from 'custom-types/recipe-types';

import style from '@/styles/components/forms/create-recipe/CreateIngredients.module.scss';
import createStyle from '@/styles/pages/Create.module.scss';

import { Tooltip } from '@mui/material';
import IngredientInputs from './ingredientInputs';

import { useState } from 'react';

const CreateIngredients = () => {
	const [editingMode, setEditingMode] = useState(false);
	const [ingredientsArray, setIngredientsArray] = useState<Ingredient[]>([]);
	const [ingredientIndex, setIngredientIndex] = useState<number>(9999);

	const removeIngredient = (index: number) => {
		setIngredientsArray(
			ingredientsArray.filter(
				(ingredient) => ingredient !== ingredientsArray[index]
			)
		);
	};

	const editIngredient = (index: number) => {
		setEditingMode(true);
		setIngredientIndex(index);
	};

	return (
		<div className={style.createIngredientsContainer}>
			<h3>Ingrédients</h3>
			<ul>
				{ingredientsArray.map((ingr, index) => (
					<li
						id={`ingredient${index + 1}`}
						key={`ingredient${index + 1}`}
						className={createStyle.listIngredientContainer}
						data-hide={
							index === ingredientIndex ? editingMode : false
						}
					>
						<div
							className={createStyle.listIngredient}
							data-hide={
								editingMode && index === ingredientIndex
									? editingMode
									: false
							}
						>
							<Tooltip title="Editer" arrow>
								<div
									onClick={() => {
										editIngredient(index);
									}}
								>
									{String(Object.values(ingr)[0])}{' '}
									{Object.values(ingr)[1] !== undefined
										? Object.values(ingr)[1]
										: ''}{' '}
									{Object.values(ingr)[2]}{' '}
									{Object.values(ingr)[3]}
								</div>
							</Tooltip>
							<Tooltip title="Supprimer" arrow>
								<img
									src="/icons/cross.png"
									alt="cross"
									className="cross"
									onClick={() => {
										removeIngredient(index);
									}}
									data-hide={
										editingMode ? editingMode : false
									}
								/>
							</Tooltip>
						</div>

						{editingMode && index === ingredientIndex ? (
							<IngredientInputs
								buttonTitle={'Valider'}
								defaultValues={ingr}
								ingredientIndex={ingredientIndex}
								setEditing={setEditingMode}
								setIngredientsArray={setIngredientsArray}
							/>
						) : (
							false
						)}
					</li>
				))}
			</ul>
			{!editingMode ? (
				<IngredientInputs
					buttonTitle={'Ajoute un ingrédient'}
					setIngredientsArray={setIngredientsArray}
				/>
			) : (
				false
			)}
		</div>
	);
};

export default CreateIngredients;

{
	/* add ingredients pseudo code => 
// Create 4text inputs (quantity, Ref.current, preposition, ingredient) and validate btn
On validate btn click create an object with the values and push it in an ingredients array

This array should be used to display what has been inserted (.map).
    
On ingredient click:
    hide ingredient inputs at bottom
    replace div with ingredients inputs containing values

replace div with with text areas containing precedent values with a validate box
On validate replace the object in the array with the new object thanks to the index
*/
}
