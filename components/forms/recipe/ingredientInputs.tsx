'use client';

import style from '@/styles/components/forms/create-recipe/CreateIngredients.module.scss';
import type { Ingredient } from 'custom-types/recipe-types';
import { TextField, Button, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

const IngredientInputs = ({
	buttonTitle,
	defaultValues,
	ingredientIndex,
	setEditing,
	setIngredientsArray,
}: {
	buttonTitle: string;
	defaultValues?: Ingredient;
	ingredientIndex?: number;
	setEditing?: (editing: boolean | ((prevVar: boolean) => boolean)) => void;
	setIngredientsArray: (
		ingredientsArray:
			| Ingredient[]
			| ((prevVar: Ingredient[]) => Ingredient[])
	) => void;
}) => {
	const [quantity, setQuantity] = useState<string>('');
	const [unit, setUnit] = useState<string>('');
	const [preposition, setPrep] = useState<string>('');
	const [type, setType] = useState<string>('');

	const addIngredient = () => {
		const ingredientObj = {
			quantity: quantity,
			unit: unit,
			preposition: preposition,
			type: type,
		};

		setIngredientsArray((current: any) => [...current, ingredientObj]);
		setQuantity('');
		setUnit('');
		setPrep('');
		setType('');
	};

	const updateIngredient = () => {
		if (defaultValues !== undefined) {
			setQuantity(String(defaultValues.quantity));
			setUnit(String(defaultValues.preposition));
			setPrep(String(defaultValues.unit));
			setType(String(defaultValues.type));

			setIngredientsArray((ingredientsArray) =>
				ingredientsArray.map((ingredient, i) => {
					if (ingredientIndex === i) {
						ingredient = {
							quantity: Number(quantity),
							unit: unit,
							preposition: preposition,
							type: type,
						};
						return ingredient;
					} else {
						return ingredient;
					}
				})
			);
		}

		setEditing ? setEditing(false) : false;
	};

	useEffect(() => {
		if (buttonTitle === 'Valider' && defaultValues !== undefined) {
			setQuantity(String(defaultValues.quantity));
			setPrep(String(defaultValues.preposition));
			setUnit(String(defaultValues.unit));
			setType(String(defaultValues.type));
		}
	}, []);

	return (
		<div
			className={style.ingredientsInputsContainer}
			onKeyUp={(e) => {
				e.preventDefault();
				e.code === 'Enter'
					? buttonTitle === 'Ajoute un ingrédient'
						? addIngredient()
						: updateIngredient()
					: false;
			}}
		>
			<TextField
				id="filled-basic"
				label="Qté *"
				variant="filled"
				color="primary"
				value={quantity}
				onChange={(e) => {
					setQuantity(e.target.value);
				}}
				// required
				autoComplete="off"
				// error={true}
				// helperText="Expecting number"
			/>
			<TextField
				id="filled-basic"
				label="Unité"
				variant="filled"
				color="primary"
				value={unit}
				onChange={(e) => {
					setUnit(e.target.value);
				}}
				// helperText="is not a number"
			/>
			<TextField
				id="filled-basic"
				label="Prep"
				variant="filled"
				color="primary"
				value={preposition}
				onChange={(e) => {
					setPrep(e.target.value);
				}}
			/>
			<TextField
				id="filled-basic"
				label="Ingrédient *"
				variant="filled"
				color="primary"
				value={type}
				onChange={(e) => {
					setType(e.target.value);
				}}
				// required
			/>

			<div className={style.addIngredient}>
				<Button
					variant="contained"
					onClick={() => {
						buttonTitle === 'Ajoute un ingrédient'
							? addIngredient()
							: updateIngredient();
					}}
					onKeyDown={(e) => {
						e.preventDefault();
					}}
					color="secondary"
					// fullWidth={true}
				>
					{buttonTitle}
				</Button>
			</div>
		</div>
	);
};

export default IngredientInputs;
