import { AlertColor } from '@mui/material';

interface AlertState {
    display: boolean;
    type?: AlertColor | undefined;
    text?: string;
}

interface AlertAction {
    type: string;
    value: AlertState;
}

export type { AlertAction, AlertState };
