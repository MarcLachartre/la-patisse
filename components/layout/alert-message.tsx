'use client';
import { AlertDispatchContext } from '@context/layout/alert-context';
import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import type { AlertState } from 'custom-types/layout-types';
import { PropsWithoutRef, useContext, useState } from 'react';

const AlertMessage = (props: PropsWithoutRef<AlertState>) => {
    const [open, setOpen] = useState(true);
    const { alertDispatch } = useContext(AlertDispatchContext);
    const handleClick = () => {
        alertDispatch({
            type: 'close alert',
            value: { display: false },
        });
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        alertDispatch({
            type: 'close alert',
            value: { display: false },
        });
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
                open={props.display}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={props.type}
                    sx={{ width: '100%' }}
                >
                    {props.text}
                </Alert>
            </Snackbar>
        </Stack>
    );
};

export default AlertMessage;
