import style from '@/styles/components/forms/create-recipe/CreateIntroduction.module.scss';

import { TextField } from '@mui/material';

import { useContext } from 'react';

import {
	RecipeObjContext,
	RecipeObjDispatchContext,
} from '@context/create/recipe-obj';
import {
	ErrorsObjContext,
	ErrorsObjDispatchContext,
} from '@context/create/errors-obj';

import type {
	CreateRecipeFormErrors,
	Validity,
} from 'custom-types/form-error-types';

import { CreateRecipeValidator } from 'utils/create-recipe/create-recipe-validation';
import { RecipeToInsert } from 'custom-types/recipe-types';

const CreateIntroduction = () => {
	// Recipe obj state
	const recipeObj = useContext<RecipeToInsert>(RecipeObjContext);
	const dispatchRecipeObj = useContext(RecipeObjDispatchContext);

	// Errors obj state
	const errorsObj = useContext<CreateRecipeFormErrors>(ErrorsObjContext);
	const dispatchErrorsObj = useContext(ErrorsObjDispatchContext);

	const handleChange = (e: any, key: string) => {
		dispatchRecipeObj({
			type: 'changed',
			key: key,
			value: e.target.value,
		});

		if (errorsObj.name.isValid !== undefined && key === 'name') {
			// This conditional statement means user tried to save recipe once. If he didn't errorsObj.name.isValid is undefined.
			const validator = CreateRecipeValidator;
			const errorTempState = validator.checkName(e.target.value);

			updateErrorsObj(key, errorsObj, errorTempState);
		} else if (
			// This conditional statement means user tried to save recipe once. If he didn't errorsObj.description.isValid is undefined.
			errorsObj.description.isValid !== undefined &&
			key === 'description'
		) {
			const validator = CreateRecipeValidator;
			const errorTempState = validator.checkDescription(e.target.value);

			updateErrorsObj(key, errorsObj, errorTempState);
		}
	};

	const updateErrorsObj = (
		key: string,
		errorsObj: CreateRecipeFormErrors,
		errorTempState: Validity
	) => {
		dispatchErrorsObj({
			type: 'update one error',
			key: key,
			singleError: errorTempState,
			value: errorsObj,
		});
	};

	return (
		<div className={style.introductionContainer}>
			<TextField
				id="filled-basic"
				label="Titre *"
				variant="filled"
				color="primary"
				value={recipeObj.name}
				autoComplete="off"
				onChange={(e) => {
					handleChange(e, 'name');
				}}
				error={
					errorsObj.name.isValid !== undefined
						? !errorsObj.name.isValid
						: undefined
				}
				helperText={
					errorsObj.name.errorMessage !== undefined
						? errorsObj.name.errorMessage[0]
						: undefined
				}
				inputProps={{
					maxLength: 40,
					style: {
						height: '4.5rem !important',
						fontSize: '2.5rem !important',
						lineHeight: '4.5rem !important',
					},
				}}
				InputLabelProps={{
					sx: {
						fontSize: '2.5rem !important',
						lineHeight: '4.5rem !important',
						'&.MuiInputLabel-shrink': {
							fontSize: '1.6rem !important',
							lineHeight: '2.5rem !important',
						},
					},
				}}
			/>

			<TextField
				id="filled-basic"
				label="Description *"
				variant="filled"
				value={recipeObj.description}
				onChange={(e) => {
					handleChange(e, 'description');
				}}
				multiline
				error={
					errorsObj.description.isValid !== undefined
						? !errorsObj.description.isValid
						: undefined
				}
				helperText={
					errorsObj.description.errorMessage !== undefined
						? errorsObj.description.errorMessage[0]
						: undefined
				}
				inputProps={{
					maxLength: 400,
				}}
				sx={{
					'.MuiFilledInput-root': {
						height: '100% !important',
						textAlign: 'start',
					},
					'.MuiFilledInput-root textarea': {
						height: '100% !important',
						overflow: 'scroll !important',
						scrollbarWidth: 'none !important',
					},
					'.MuiFilledInput-root textarea::-webkit-scrollbar': {
						display: 'none !important',
					},
				}}
				color="primary"
			/>
			<div className={style.addRecipePicContainer}>
				<img src="/icons/plus.png" alt="add" />
				<p> Ajoute une image </p>
			</div>
		</div>
	);
};

export default CreateIntroduction;
