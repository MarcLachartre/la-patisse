import type {
	CreateRecipeFormErrors,
	Validity,
} from 'custom-types/form-error-types';

interface Action {
	type: string;
	key?: string; // Corresponds to the key of the errorsObj
	singleError?: Validity; // Corresponds to the updated error
	value: CreateRecipeFormErrors;
}

export const errorsObjReducer = (
	state: CreateRecipeFormErrors,
	action: Action
) => {
	switch (action.type) {
		case 'update errors': {
			return action.value;
		}
		case 'update one error': {
			console.log('update one error');
			return action.key !== undefined
				? { ...state, [action.key]: action.singleError }
				: state;
		}
		default: {
			return state;
		}
	}
};
