'use client';
import style from '@/styles/components/forms/create-recipe/CreateIntroduction.module.scss';
import { ErrorsObjContext } from '@context/create/errors-obj';
import {
    RecipeObjContext,
    RecipeObjDispatchContext,
} from '@context/create/recipe-obj';
import { TextField } from '@mui/material';
import type { CreateRecipeFormErrors } from 'custom-types/form-error-types';
import { RecipeToInsert } from 'custom-types/recipe-types';
import { useContext, useEffect } from 'react';

const CreateIntroduction = () => {
    // Recipe obj state
    const recipeObj = useContext<RecipeToInsert>(RecipeObjContext);
    const dispatchRecipeObj = useContext(RecipeObjDispatchContext);

    // Errors obj state
    const errorsObj = useContext<CreateRecipeFormErrors>(ErrorsObjContext);

    const handleChange = (e: any, key: string) => {
        dispatchRecipeObj({
            type: 'changed',
            key: key,
            value: e.target.value,
        });
    };

    return (
        <div className={style.introductionContainer}>
            <TextField
                id="filled-basic"
                label="Titre *"
                variant="filled"
                color="primary"
                value={recipeObj.name}
                autoComplete="off"
                onChange={(e) => {
                    handleChange(e, 'name');
                }}
                error={
                    errorsObj.name.isValid !== undefined
                        ? !errorsObj.name.isValid
                        : undefined
                }
                helperText={
                    errorsObj.name.errorMessage !== undefined
                        ? errorsObj.name.errorMessage[0]
                        : undefined
                }
                sx={{
                    '.MuiInputBase-root': {
                        height: 'auto',
                    },
                }}
                inputProps={{
                    maxLength: 40,
                    style: {
                        height: '4.5rem !important',
                        fontSize: '2.5rem !important',
                        lineHeight: '4.5rem !important',
                    },
                }}
                InputLabelProps={{
                    sx: {
                        fontSize: '2.5rem !important',
                        lineHeight: '4.5rem !important',
                        '&.MuiInputLabel-shrink': {
                            fontSize: '1.6rem !important',
                            lineHeight: '2.5rem !important',
                        },
                    },
                }}
            />

            <TextField
                id="filled-basic"
                label="Description *"
                variant="filled"
                value={recipeObj.description}
                onChange={(e) => {
                    handleChange(e, 'description');
                }}
                multiline
                error={
                    errorsObj.description.isValid !== undefined
                        ? !errorsObj.description.isValid
                        : undefined
                }
                helperText={
                    errorsObj.description.errorMessage !== undefined
                        ? errorsObj.description.errorMessage[0]
                        : undefined
                }
                inputProps={{
                    maxLength: 400,
                }}
                sx={{
                    '.MuiFilledInput-root': {
                        height: '100% !important',
                        textAlign: 'start',
                    },
                    '.MuiFilledInput-root textarea': {
                        height: '100% !important',
                        overflow: 'scroll !important',
                        scrollbarWidth: 'none !important',
                    },
                    '.MuiFilledInput-root textarea::-webkit-scrollbar': {
                        display: 'none !important',
                    },
                }}
                color="primary"
            />
            <div className={style.addRecipePicContainer}>
                <img src="/icons/plus.png" alt="add" />
                <p> Ajoute une image </p>
            </div>
        </div>
    );
};

export default CreateIntroduction;
