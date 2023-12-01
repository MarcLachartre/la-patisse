import { createContext, type Dispatch } from 'react';
import type { RecipeToInsert } from 'custom-types/recipe-types';

export const RecipeObjContext = createContext<RecipeToInsert>({
	name: '',
	description: '',
	recipe: [],
	ingredients: [],
	tools: [],
	pictureURL: '',
});
export const RecipeObjDispatchContext = createContext(
	(() => undefined) as Dispatch<{
		type: string;
		key: string;
		value: RecipeToInsert;
	}>
);
