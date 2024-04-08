'use client';

import style from '@/styles/components/forms/create-recipe/CreateIngredients.module.scss';
import { CreateRecipeValidator } from '@/utils/data-validators/create-recipe-validator';
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
        // When user wants to edit an ingredient, it sets the text fields inputs to the default values to modify
        if (buttonTitle === 'Valider' && defaultValues !== undefined) {
            setQuantity(String(defaultValues.quantity));
            setPrep(String(defaultValues.preposition));
            setUnit(String(defaultValues.unit));
            setType(String(defaultValues.type));
        }
    }, []);

    const textField = (
        id: string,
        label: string,
        value: string,
        placeholder: string,
        maxLength: number,
        fieldIndex: number
    ) => {
        const error = () => {
            switch (id) {
                case 'recipe-ingredient-qty':
                    return errors.quantity !== undefined
                        ? !errors.quantity.isValid
                        : false;
                case 'recipe-ingredient-unit':
                    return errors.unit !== undefined
                        ? !errors.unit.isValid
                        : false;
                case 'recipe-ingredient-prep':
                    return errors.prep !== undefined
                        ? !errors.prep.isValid
                        : false;
                case 'recipe-ingredient-name':
                    return errors.type !== undefined
                        ? !errors.type.isValid
                        : false;
                default:
                    break;
            }
        };
        return (
            <TextField
                autoFocus
                id={id}
                label={label}
                variant="filled"
                color="primary"
                value={value}
                onChange={(e) => {
                    switch (id) {
                        case 'recipe-ingredient-qty':
                            setQuantity(e.target.value);
                            break;
                        case 'recipe-ingredient-unit':
                            setUnit(e.target.value);
                            break;
                        case 'recipe-ingredient-prep':
                            setPrep(e.target.value);
                            break;
                        case 'recipe-ingredient-name':
                            setType(e.target.value);
                            break;
                        default:
                            break;
                    }
                }}
                placeholder={placeholder}
                autoComplete="off"
                inputProps={{
                    maxLength: { maxLength },
                }}
                error={error()}
                onFocus={(e) => {
                    setFocusedFieldIndex(fieldIndex);
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
                helperText={errorToDisplay[fieldIndex]}
                sx={{
                    '.MuiFilledInput-root': { maxHeight: '59px' },
                    '.MuiFormHelperText-root ': {
                        width: '230px',
                        textWrap: 'wrap',
                    },
                }}
            />
        );
    };

    return (
        <div className={style.ingredientsInputsContainer}>
            {[
                ['recipe-ingredient-qty', 'Qté *', quantity, '100', 10, 0],
                ['recipe-ingredient-unit', 'Unité', unit, 'g', 15, 1],
                ['recipe-ingredient-prep', 'Prep', preposition, 'de', 15, 2],
                [
                    'recipe-ingredient-name',
                    'Ingrédient *',
                    type,
                    'sucre',
                    100,
                    3,
                ],
            ].map((args) => {
                return textField(
                    typeof args[0] === 'string' ? args[0] : '',
                    typeof args[1] === 'string' ? args[1] : '',
                    typeof args[2] === 'string' ? args[2] : '',
                    typeof args[3] === 'string' ? args[3] : '',
                    typeof args[4] === 'number' ? args[4] : 0,
                    typeof args[5] === 'number' ? args[5] : 0
                );
            })}

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
