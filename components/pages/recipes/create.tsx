'use client';

import CreateIngredients from '@/components/forms/recipe/createIngredients';
import CreateInstructions from '@/components/forms/recipe/createInstructions';
import CreateIntroduction from '@/components/forms/recipe/createIntroduction';
import CreateTools from '@/components/forms/recipe/createTools';
import createStyle from '@/styles/pages/Create.module.scss';
import style from '@/styles/pages/Show.module.scss';
import { CreateRecipeValidator } from '@/utils/data-validators/create-recipe-validator';
import {
    ErrorsObjContext,
    ErrorsObjDispatchContext,
} from '@context/create/errors-obj';
import {
    RecipeObjContext,
    RecipeObjDispatchContext,
} from '@context/create/recipe-obj';
import { Button } from '@mui/material';
import type { CreateRecipeFormErrors } from 'custom-types/form-error-types';
import type { RecipeToInsert } from 'custom-types/recipe-types';
import { useEffect, useReducer, useState, type SyntheticEvent } from 'react';
import { errorsObjReducer } from 'reducers/create/errors-obj-reducer';
import { recipeObjReducer } from 'reducers/create/recipe-obj-reducer';

const Create = () => {
    const initialErrorsObj: CreateRecipeFormErrors = {
        name: {},
        description: {},
        recipe: {},
        ingredients: {},
        tools: {},
        picture: {},
    };

    const [errorsObj, dispatchErrorsObj] = useReducer(
        errorsObjReducer,
        initialErrorsObj
    );

    const initialRecipeObj: RecipeToInsert = {
        name: '',
        description: '',
        recipe: [],
        ingredients: [],
        tools: [],
        picture: {} as File,
    };
    const [recipeObj, dispatchRecipeObj] = useReducer(
        recipeObjReducer,
        initialRecipeObj
    );

    const [submitTry, setSubmitTry] = useState<boolean>(false);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setSubmitTry(true);
        const validInputs = validateInputs();
        validInputs ? submitRecipe() : console.log(false);
    };

    const submitRecipe = () => {
        console.log('initiateSubmit');
    };

    const validateInputs = () => {
        const validator = CreateRecipeValidator;
        const newErrors = {
            name: validator.checkName(recipeObj.name),
            description: validator.checkDescription(recipeObj.description),
            ingredients: validator.checkIngredients(recipeObj.ingredients),
            recipe: validator.checkInstructionList(recipeObj.recipe),
            tools: validator.checkToolList(recipeObj.tools),
            picture: validator.checkPicture(recipeObj.picture),
        };

        dispatchErrorsObj({
            type: 'update errors',
            value: newErrors,
        });

        const recipeIsValid = Object.values(newErrors).every((error) => {
            if (error.isValid === false || error.isValid === undefined) {
                return false;
            } else {
                return true;
            }
        });
        return recipeIsValid;
    };

    useEffect(() => {
        submitTry ? validateInputs() : false;
    }, [recipeObj]);

    return (
        <RecipeObjContext.Provider value={recipeObj}>
            <RecipeObjDispatchContext.Provider value={dispatchRecipeObj}>
                <ErrorsObjContext.Provider value={errorsObj}>
                    <ErrorsObjDispatchContext.Provider
                        value={dispatchErrorsObj}
                    >
                        <div className="pageContainer">
                            <h2 className="page-title">Create recipe</h2>
                            <form
                                className={createStyle.addRecipeForm}
                                onKeyDown={(e) => {
                                    e.key === 'Enter'
                                        ? e.preventDefault()
                                        : false;
                                }}
                                onKeyUp={(e) => {
                                    e.key === 'Enter'
                                        ? e.preventDefault()
                                        : false;
                                }}
                            >
                                <CreateIntroduction />
                                <section>
                                    <div
                                        className={
                                            style.instructionsIngredientsToolsContainer
                                        }
                                    >
                                        <div
                                            className={
                                                style.ingredientsToolsContainer
                                            }
                                        >
                                            <CreateIngredients />
                                            <CreateTools />
                                        </div>
                                        <CreateInstructions />
                                    </div>
                                </section>
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    type="submit"
                                    size="large"
                                    color="secondary"
                                >
                                    {'Sauvegarder la recette'}
                                </Button>
                            </form>
                        </div>
                    </ErrorsObjDispatchContext.Provider>
                </ErrorsObjContext.Provider>
            </RecipeObjDispatchContext.Provider>
        </RecipeObjContext.Provider>
    );
};

export default Create;
