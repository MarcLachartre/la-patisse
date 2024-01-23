import type { Ingredient, RecipeToInsert } from 'custom-types/recipe-types';
import { createContext, type Dispatch } from 'react';

export const RecipeObjContext = createContext<RecipeToInsert>({
    name: '',
    description: '',
    recipe: [],
    ingredients: [],
    tools: [],
    picture: {} as File,
});

export const RecipeObjDispatchContext = createContext(
    (() => undefined) as Dispatch<{
        type: string;
        key: string;
        value: string | Ingredient[] | string[] | File;
    }>
);
