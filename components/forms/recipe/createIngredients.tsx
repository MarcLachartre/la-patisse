'use client';
import createIngredientsStyle from '@/styles/components/forms/create-recipe/CreateIngredients.module.scss';
import style from '@/styles/pages/Create.module.scss';
import { ErrorsObjContext } from '@context/create/errors-obj-context';
import { RecipeObjDispatchContext } from '@context/create/recipe-obj-context';
import { FormHelperText, Tooltip } from '@mui/material';
import type { CreateRecipeFormErrors } from 'custom-types/form-error-types';
import type { Ingredient, RecipeToInsert } from 'custom-types/recipe-types';
import { useContext, useEffect, useState } from 'react';
import IngredientInputs from './ingredientInputs';

const CreateIngredients = () => {
    const dispatchRecipeObj = useContext(RecipeObjDispatchContext);
    const errorsObj = useContext<CreateRecipeFormErrors>(ErrorsObjContext);

    const [editingMode, setEditingMode] = useState(false);
    const [ingredientsArray, setIngredientsArray] = useState<Ingredient[]>([]);
    const [ingredientIndex, setIngredientIndex] = useState<number>(9999);

    const removeIngredient = (index: number) => {
        setIngredientsArray(
            ingredientsArray.filter(
                (ingredient) => ingredient !== ingredientsArray[index]
            )
        );
    };

    const editIngredient = (index: number) => {
        setEditingMode(true);
        setIngredientIndex(index);
    };

    useEffect(() => {
        dispatchRecipeObj({
            type: 'changed',
            key: 'ingredients',
            value: ingredientsArray,
        });
    }, [ingredientsArray]);

    return (
        <div className={createIngredientsStyle.createIngredientsContainer}>
            <h3
                className={
                    errorsObj.ingredients.isValid === false ? 'error' : ''
                }
            >
                Ingrédients
                <FormHelperText error={!errorsObj.ingredients.isValid}>
                    {errorsObj.ingredients.errorMessage
                        ? `${errorsObj.ingredients.errorMessage}`
                        : ''}
                </FormHelperText>
            </h3>

            <ul
                style={{
                    display: `${
                        ingredientsArray.length === 0 ? 'none' : 'flex'
                    }`,
                }}
            >
                {ingredientsArray.map((ingr, index) => (
                    <li
                        id={`ingredient${index + 1}`}
                        key={`ingredient${index + 1}`}
                        className={style.listContainer}
                        data-hide={
                            index === ingredientIndex ? editingMode : false
                        }
                    >
                        <div
                            className={style.list}
                            data-hide={
                                editingMode && index === ingredientIndex
                                    ? editingMode
                                    : false
                            }
                        >
                            <Tooltip title="Editer" arrow>
                                <div
                                    onClick={() => {
                                        editIngredient(index);
                                    }}
                                >
                                    {String(Object.values(ingr)[0])}{' '}
                                    {Object.values(ingr)[1] !== undefined
                                        ? Object.values(ingr)[1]
                                        : ''}{' '}
                                    {Object.values(ingr)[2]}{' '}
                                    {Object.values(ingr)[3]}
                                </div>
                            </Tooltip>
                            <Tooltip title="Supprimer" arrow>
                                <img
                                    src="/icons/cross.png"
                                    alt="cross"
                                    className="cross"
                                    onClick={() => {
                                        removeIngredient(index);
                                    }}
                                    data-hide={
                                        editingMode ? editingMode : false
                                    }
                                />
                            </Tooltip>
                        </div>

                        {editingMode && index === ingredientIndex ? (
                            <IngredientInputs
                                buttonTitle={'Valider'}
                                defaultValues={ingr}
                                ingredientIndex={ingredientIndex}
                                editing={editingMode}
                                setEditing={setEditingMode}
                                setIngredientsArray={setIngredientsArray}
                            />
                        ) : (
                            false
                        )}
                    </li>
                ))}
            </ul>
            {!editingMode ? (
                <IngredientInputs
                    buttonTitle={'Ajouter un ingrédient'}
                    setIngredientsArray={setIngredientsArray}
                />
            ) : (
                false
            )}
        </div>
    );
};

export default CreateIngredients;
