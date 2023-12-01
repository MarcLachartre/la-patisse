import type { RecipeToInsert, Ingredient } from 'custom-types/recipe-types';
import { ReducerStateWithoutAction, ReducerState } from 'react';

interface Action {
	type: string;
	key: string;
	value: RecipeToInsert;
}

export const recipeObjReducer = (state: RecipeToInsert, action: Action) => {
	switch (action.type) {
		case 'changed': {
			return { ...state, [action.key]: action.value }; // Takes key and value to modify the right key value pair in the recipe object
		}
		default: {
			return state;
		}
	}
};
