'use client';

import style from '@/styles/components/forms/create-recipe/CreateIngredients.module.scss';
import { CreateRecipeValidator } from '@/utils/data-validators/create-recipe-validator';
import { ErrorsObjContext } from '@context/create/errors-obj-context';
import { RecipeObjContext } from '@context/create/recipe-obj-context';
import { Button, FormHelperText, TextField } from '@mui/material';
import { type CreateIngredientErrors } from 'custom-types/form-error-types';
import { type Ingredient } from 'custom-types/recipe-types';
import { useContext, useEffect, useState } from 'react';

const IngredientInputs = ({
    buttonTitle,
    defaultValues,
    ingredientIndex,
    editing,
    setEditing,
    setIngredientsArray,
}: {
    buttonTitle: string;
    defaultValues?: Ingredient;
    ingredientIndex?: number;
    editing?: boolean;
    setEditing?: (editing: boolean | ((prevVar: boolean) => boolean)) => void;
    setIngredientsArray: (
        ingredientsArray:
            | Ingredient[]
            | ((prevVar: Ingredient[]) => Ingredient[])
    ) => void;
}) => {
    const ingredientsList = useContext(RecipeObjContext).ingredients;
    // const ingredientsError = useContext(ErrorsObjContext).ingredients;

    const [quantity, setQuantity] = useState<string>('');
    const [unit, setUnit] = useState<string>('');
    const [preposition, setPrep] = useState<string>('');
    const [type, setType] = useState<string>('');

    const [focusedFieldIndex, setFocusedFieldIndex] = useState<number>(9999);

    const [errorsArray, setErrorsArray] = useState<string[]>(['', '', '', '']);
    const [errorToDisplay, setErrorToDisplay] = useState<string[]>([
        '',
        '',
        '',
        '',
    ]);

    const [errors, setErrors] = useState<CreateIngredientErrors>(
        {} as CreateIngredientErrors
    );

    const addIngredient = () => {
        console.log(1);
        const ingredientObj = {
            quantity: Number(quantity),
            unit: unit,
            preposition: preposition,
            type: type,
        };

        const inputsAreValid = validateInput(); // also sets errors

        if (inputsAreValid) {
            setIngredientsArray((current: any) => [...current, ingredientObj]);
            setErrors({} as CreateIngredientErrors);
            setQuantity('');
            setUnit('');
            setPrep('');
            setType('');
        }
    };

    const updateIngredient = () => {
        const inputsAreValid = validateInput();

        if (inputsAreValid) {
            setIngredientsArray((ingredientsArray) =>
                ingredientsArray.map((ingredient, i) => {
                    if (ingredientIndex === i) {
                        ingredient = {
                            quantity: Number(quantity),
                            unit: unit,
                            preposition: preposition,
                            type: type,
                        };
                        return ingredient;
                    } else {
                        return ingredient;
                    }
                })
            );
            setEditing ? setEditing(false) : false;
        }
    };

    const validateInput = () => {
        let inputsAreValid = true;
        const validator = CreateRecipeValidator;

        const tempErrors = {
            quantity: validator.checkQuantity(quantity),
            unit: validator.checkUnit(unit),
            prep: validator.checkPrep(preposition),
            type: validator.checkType(type),
        };

        for (let i = 0; i < Object.values(tempErrors).length; i++) {
            if (Object.values(tempErrors)[i].isValid === false) {
                inputsAreValid = false;
                break;
            }
        }

        setErrors(tempErrors); // creates an array containing the errors

        return inputsAreValid;
    };

    useEffect(() => {
        const tempErrorsArray: string[] = [];

        for (let i = 0; i < Object.values(errors).length; i++) {
            if (Object.values(errors)[i].isValid === false) {
                tempErrorsArray.push(Object.values(errors)[i].errorMessage[0]);
            } else {
                tempErrorsArray.push('');
            }
        }

        setErrorsArray(tempErrorsArray); // creates and array with the errors
    }, [errors]); // each time the error updates (on submit validation), we set the helperText array to store the error to display, at the right position in the array

    useEffect(() => {
        if (focusedFieldIndex !== 9999 && Object.values(errors).length !== 0) {
            setErrorToDisplay(
                errorToDisplay.map((e, i) => {
                    if (i === focusedFieldIndex) {
                        e = errorsArray[focusedFieldIndex];
                        return e;
                    } else {
                        return '';
                    }
                })
            );
        } else if (
            focusedFieldIndex === 9999 &&
            Object.values(errors).length !== 0
        ) {
            let tempErrorToDisplay;
            const errorToDisplayIndex = errorsArray.findIndex((e) => e !== '');

            tempErrorToDisplay = errorsArray.map((e, i) => {
                if (i === errorToDisplayIndex) {
                    return e;
                } else {
                    return '';
                }
            });

            setErrorToDisplay(tempErrorToDisplay);
        }
    }, [focusedFieldIndex, errorsArray]);

    useEffect(() => {
        if (Object.values(errors).length !== 0 || editing === true) {
            validateInput();
        }
    }, [quantity, unit, preposition, type]); // if user submit failed, each time he types in the text field, it will validate the imput and redispalay errors

    useEffect(() => {
        // When use want to edit an ingredient, it sets the text fields inputs to the default values to modify
        if (buttonTitle === 'Valider' && defaultValues !== undefined) {
            setQuantity(String(defaultValues.quantity));
            setPrep(String(defaultValues.preposition));
            setUnit(String(defaultValues.unit));
            setType(String(defaultValues.type));
        }
    }, []);

    return (
        <div
            className={style.ingredientsInputsContainer}
            // onKeyUp={(e) => {
            //     e.preventDefault();
            //     e.code === 'Enter'
            //         ? buttonTitle === 'Ajouter un ingrédient'
            //             ? addIngredient()
            //             : updateIngredient()
            //         : false;
            // }}
        >
            <TextField
                autoFocus
                id="filled-basic"
                label="Qté *"
                variant="filled"
                color="primary"
                value={quantity}
                onChange={(e) => {
                    setQuantity(e.target.value);
                }}
                placeholder="100"
                autoComplete="off"
                inputProps={{
                    maxLength: 10,
                }}
                error={
                    errors.quantity !== undefined
                        ? !errors.quantity.isValid
                        : false
                }
                onFocus={(e) => {
                    setFocusedFieldIndex(0);
                }}
                onBlur={() => {
                    setFocusedFieldIndex(9999);
                }}
                onKeyDown={(e) => {
                    e.code === 'Enter'
                        ? buttonTitle === 'Ajouter un ingrédient'
                            ? addIngredient()
                            : updateIngredient()
                        : false;
                }}
                helperText={errorToDisplay[0]}
                sx={{
                    '.MuiFilledInput-root': { maxHeight: '59px' },
                    '.MuiFormHelperText-root ': {
                        width: '230px',
                        textWrap: 'wrap',
                    },
                }}
            />
            <TextField
                id="filled-basic"
                label="Unité"
                variant="filled"
                color="primary"
                value={unit}
                placeholder="g"
                onChange={(e) => {
                    setUnit(e.target.value);
                }}
                onBlur={() => {
                    setFocusedFieldIndex(9999);
                }}
                onKeyDown={(e) => {
                    e.code === 'Enter'
                        ? buttonTitle === 'Ajouter un ingrédient'
                            ? addIngredient()
                            : updateIngredient()
                        : false;
                }}
                autoComplete="off"
                inputProps={{
                    maxLength: 15,
                }}
                error={errors.unit !== undefined ? !errors.unit.isValid : false}
                onFocus={() => {
                    setFocusedFieldIndex(1);
                }}
                helperText={errorToDisplay[1]}
                sx={{
                    '.MuiFilledInput-root': { maxHeight: '59px' },
                    '.MuiFormHelperText-root ': {
                        width: '230px',
                        textWrap: 'wrap',
                    },
                }}
            />
            <TextField
                id="filled-basic"
                label="Prep"
                variant="filled"
                color="primary"
                value={preposition}
                placeholder="de"
                onChange={(e) => {
                    setPrep(e.target.value);
                }}
                error={errors.prep !== undefined ? !errors.prep.isValid : false}
                onFocus={() => {
                    setFocusedFieldIndex(2);
                }}
                onBlur={() => {
                    setFocusedFieldIndex(9999);
                }}
                onKeyDown={(e) => {
                    e.code === 'Enter'
                        ? buttonTitle === 'Ajouter un ingrédient'
                            ? addIngredient()
                            : updateIngredient()
                        : false;
                }}
                inputProps={{
                    maxLength: 15,
                }}
                autoComplete="off"
                helperText={errorToDisplay[2]}
                sx={{
                    '.MuiFilledInput-root': { maxHeight: '59px' },
                    '.MuiFormHelperText-root ': {
                        width: '230px',
                        textWrap: 'wrap',
                    },
                }}
            />
            <TextField
                className={style.ingredientInput}
                id="filled-basic"
                label="Ingrédient *"
                variant="filled"
                color="primary"
                value={type}
                onChange={(e) => {
                    setType(e.target.value);
                }}
                placeholder="sucre"
                error={errors.type !== undefined ? !errors.type.isValid : false}
                onFocus={() => {
                    setFocusedFieldIndex(3);
                }}
                onBlur={() => {
                    setFocusedFieldIndex(9999);
                }}
                onKeyDown={(e) => {
                    e.code === 'Enter'
                        ? buttonTitle === 'Ajouter un ingrédient'
                            ? addIngredient()
                            : updateIngredient()
                        : false;
                }}
                inputProps={{
                    maxLength: 100,
                }}
                autoComplete="off"
                helperText={errorToDisplay[3]}
                sx={{
                    '.MuiFilledInput-root': { maxHeight: '59px' },

                    '.MuiFormHelperText-root ': {
                        width: '200px',
                        textWrap: 'wrap',
                    },
                }}
            />

            <div className={style.addIngredientBtn}>
                <Button
                    variant="contained"
                    disabled={
                        ingredientsList.length > 0 &&
                        ingredientsList.length >= 50 &&
                        buttonTitle === 'Ajouter un ingrédient'
                    }
                    onClick={() => {
                        buttonTitle === 'Ajouter un ingrédient'
                            ? addIngredient()
                            : updateIngredient();
                    }}
                    onKeyDown={(e) => {
                        e.preventDefault();
                    }}
                    color="secondary"
                >
                    {buttonTitle}
                </Button>
                <FormHelperText>
                    {ingredientsList.length >= 50 &&
                    buttonTitle === 'Ajouter un ingrédient'
                        ? "Quantité maximale d'ingrédients atteinte."
                        : ''}
                </FormHelperText>
            </div>
        </div>
    );
};

export default IngredientInputs;
