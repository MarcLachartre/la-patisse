import type { Ingredient, RecipeToInsert } from 'custom-types/recipe-types';

interface Action {
    type: string;
    key: string;
    value: File | string | Ingredient[] | string[];
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
