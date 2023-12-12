'use client';

import CreateIntroduction from '@/components/forms/recipe/createIntroduction';
import CreateIngredients from '@/components/forms/recipe/createIngredients';
import CreateTools from '@/components/forms/recipe/createTools';
import CreateInstructions from '@/components/forms/recipe/createInstructions';

import type { RecipeToInsert } from 'custom-types/recipe-types';
import type { CreateRecipeFormErrors } from 'custom-types/form-error-types';

import { recipeObjReducer } from 'reducers/create/recipe-obj-reducer';
import { errorsObjReducer } from 'reducers/create/errors-obj-reducer';

import {
	RecipeObjContext,
	RecipeObjDispatchContext,
} from '@context/create/recipe-obj';
import {
	ErrorsObjContext,
	ErrorsObjDispatchContext,
} from '@context/create/errors-obj';

import { useReducer, type SyntheticEvent, useEffect } from 'react';

import { Button } from '@mui/material';

import { CreateRecipeValidator } from 'utils/create-recipe/create-recipe-validation';

import createStyle from '@/styles/pages/Create.module.scss';
import style from '@/styles/pages/Show.module.scss';

const Create = () => {
	const initialErrorsObj: CreateRecipeFormErrors = {
		name: {},
		description: {},
		recipe: {},
		ingredients: {},
		tools: {},
		pictureURL: {},
	};

	const [errorsObj, dispatchErrorsObj] = useReducer(
		errorsObjReducer,
		initialErrorsObj
	);

	const initialRecipeObj: RecipeToInsert = {
		name: '',
		description: '',
		recipe: [],
		ingredients: [],
		tools: [],
		pictureURL: '',
	};
	const [recipeObj, dispatchRecipeObj] = useReducer(
		recipeObjReducer,
		initialRecipeObj
	);

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		validateInputs();
	};

	const validateInputs = () => {
		const validator = CreateRecipeValidator;
		const newErrors = {
			name: validator.checkName(recipeObj.name),
			description: validator.checkDescription(recipeObj.description),
			ingredients: validator.checkIngredients(recipeObj.ingredients),
			recipe: {},
			tools: {},
			pictureURL: {},
		};

		dispatchErrorsObj({
			type: 'update errors',
			value: newErrors,
		});
	};

	useEffect(() => {}, [recipeObj]);

	return (
		<RecipeObjContext.Provider value={recipeObj}>
			<RecipeObjDispatchContext.Provider value={dispatchRecipeObj}>
				<ErrorsObjContext.Provider value={errorsObj}>
					<ErrorsObjDispatchContext.Provider
						value={dispatchErrorsObj}
					>
						<div className="pageContainer">
							<h2 className="page-title">Create recipe</h2>
							<form
								className={createStyle.addRecipeForm}
								onKeyDown={(e) => {
									e.key === 'Enter'
										? e.preventDefault()
										: false;
								}}
								onKeyUp={(e) => {
									e.key === 'Enter'
										? e.preventDefault()
										: false;
								}}
							>
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
					</ErrorsObjDispatchContext.Provider>
				</ErrorsObjContext.Provider>
			</RecipeObjDispatchContext.Provider>
		</RecipeObjContext.Provider>
	);
};

export default Create;
