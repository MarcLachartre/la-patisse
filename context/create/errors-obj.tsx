import type {
    CreateRecipeFormErrors,
    Validity,
} from 'custom-types/form-error-types';
import { createContext, type Dispatch } from 'react';

const objKeys = [
    'name',
    'description',
    'recipe',
    'ingredients',
    'tools',
    'picture',
];

const obj = objKeys.reduce(
    (o, key) => ({ ...o, [key]: { isValid: undefined, errorMessage: [] } }),
    {} as CreateRecipeFormErrors
);

export const ErrorsObjContext = createContext<CreateRecipeFormErrors>(obj);

export const ErrorsObjDispatchContext = createContext(
    (() => undefined) as Dispatch<{
        type: string;
        key?: string;
        singleError?: Validity;
        value: CreateRecipeFormErrors;
    }>
);
