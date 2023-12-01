import { createContext } from 'react';
import type { CreateRecipeFormErrors } from 'custom-types/form-error-types';

const objKeys = [
	'name',
	'description',
	'recipe',
	'ingredients',
	'tools',
	'pictureURL',
];

const obj = objKeys.reduce(
	(o, key) => ({ ...o, [key]: { isValid: undefined, errorMessage: [] } }),
	{} as CreateRecipeFormErrors
);

console.log(obj);

export const RecipeFormErrorContext =
	createContext<CreateRecipeFormErrors>(obj);
