import style from '@/styles/components/forms/create-recipe/CreateIntroduction.module.scss';

import { TextField, Popover, dividerClasses } from '@mui/material';

import { useContext, useEffect } from 'react';

import {
	RecipeObjContext,
	RecipeObjDispatchContext,
} from '@context/create/recipe-obj';
import { RecipeFormErrorContext } from '@context/create/recipe-form-error';

import type { CreateRecipeFormErrors } from 'custom-types/form-error-types';

const CreateIntroduction = () => {
	const recipeObj = useContext(RecipeObjContext);
	const dispatch = useContext(RecipeObjDispatchContext);

	const errors = useContext<CreateRecipeFormErrors>(RecipeFormErrorContext);

	const handleChange = (e: any, key: string) => {
		dispatch({
			type: 'changed',
			key: key,
			value: e.target.value,
		});

		// if (errors.name.isValid === false) {
		// 	//revalidate input
		// }
	};

	useEffect(() => {
		console.log(errors);
	});

	return (
		<div className={style.introductionContainer}>
			<TextField
				id="filled-basic"
				label="Titre *"
				variant="filled"
				color="primary"
				value={recipeObj.name}
				onChange={(e) => {
					handleChange(e, 'name');
				}}
				error={
					errors.name.isValid !== undefined
						? !errors.name.isValid
						: undefined
				}
				helperText={
					errors.name.errorMessage !== undefined
						? errors.name.errorMessage[0]
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
					errors.description.isValid !== undefined
						? !errors.description.isValid
						: undefined
				}
				helperText={
					errors.description.errorMessage !== undefined
						? errors.description.errorMessage[0]
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
