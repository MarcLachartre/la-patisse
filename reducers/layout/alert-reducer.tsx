import type { AlertAction, AlertState } from 'custom-types/layout-types';

export const alertReducer = (
    state: AlertState,
    action: AlertAction
): AlertState => {
    switch (action.type) {
        case 'set alert': {
            return action.value;
        }
        case 'close alert': {
            return { ...state, display: action.value.display };
        }
        default: {
            return state;
        }
    }
};
