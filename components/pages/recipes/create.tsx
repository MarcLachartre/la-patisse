'use client';

import CreateIntroduction from '@/components/forms/recipe/createIntroduction';
import CreateIngredients from '@/components/forms/recipe/createIngredients';
import CreateTools from '@/components/forms/recipe/createTools';
import CreateInstructions from '@/components/forms/recipe/createInstructions';

import type { RecipeToInsert } from 'custom-types/recipe-types';
import type { CreateRecipeFormErrors } from 'custom-types/form-error-types';

import { recipeObjReducer } from 'reducers/create/recipe-obj-reducer';

import {
	RecipeObjContext,
	RecipeObjDispatchContext,
} from '@context/create/recipe-obj';
import { RecipeFormErrorContext } from '@context/create/recipe-form-error';

import { useReducer, useState, useEffect, type SyntheticEvent } from 'react';

import { Button } from '@mui/material';

import { CreateRecipeValidator } from 'utils/create-recipe/create-recipe-validation';

import createStyle from '@/styles/pages/Create.module.scss';
import style from '@/styles/pages/Show.module.scss';

const Create = () => {
	const [errors, setErrors] = useState<CreateRecipeFormErrors>({
		name: {},
		description: {},
		recipe: {},
		ingredients: {},
		tools: {},
		pictureURL: {},
	});

	const initialRecipeObj: RecipeToInsert = {
		name: '',
		description: '',
		recipe: [],
		ingredients: [],
		tools: [],
		pictureURL: '',
	};
	const [recipeObj, dispatch] = useReducer(
		recipeObjReducer,
		initialRecipeObj
	);

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		validateInputs();
	};

	const validateInputs = () => {
		console.log('validate inputs');
		const validator = CreateRecipeValidator;
		setErrors({
			...errors,
			name: validator.checkName(recipeObj.name),
			description: validator.checkDescription(recipeObj.description),
		});
	};

	return (
		<RecipeObjContext.Provider value={recipeObj}>
			<RecipeObjDispatchContext.Provider value={dispatch}>
				<RecipeFormErrorContext.Provider value={errors}>
					<div className="pageContainer">
						<h2 className="page-title">Create recipe</h2>
						<form className={createStyle.addRecipeForm}>
							<CreateIntroduction />
							<section>
								<div
									className={
										style.instructionsIngredientsToolsContainer
									}
								>
									<div
										className={
											style.ingredientsToolsContainer
										}
									>
										<CreateIngredients />
										<CreateTools />
									</div>
									<CreateInstructions />
								</div>
							</section>
							<Button
								variant="contained"
								onClick={handleSubmit}
								type="submit"
								size="large"
								color="secondary"
							>
								{'Sauvegarder la recette'}
							</Button>
						</form>
					</div>
				</RecipeFormErrorContext.Provider>
			</RecipeObjDispatchContext.Provider>
		</RecipeObjContext.Provider>
	);
};

export default Create;
