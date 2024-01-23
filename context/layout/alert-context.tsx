import { AlertAction, AlertState } from 'custom-types/layout-types';
import type { Dispatch } from 'react';
import { createContext } from 'react';

export const AlertDispatchContext = createContext<{
    alert: AlertState;
    alertDispatch: Dispatch<AlertAction>;
}>({
    alert: {
        display: false,
    },
    alertDispatch: () => undefined,
});
