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
} from '@context/create/errors-obj-context';
import {
    RecipeObjContext,
    RecipeObjDispatchContext,
} from '@context/create/recipe-obj-context';
import { AlertDispatchContext } from '@context/layout/alert-context';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import type { CreateRecipeFormErrors } from 'custom-types/form-error-types';
import type { RecipeToInsert } from 'custom-types/recipe-types';
import { useRouter } from 'next/navigation';
import {
    useContext,
    useEffect,
    useReducer,
    useState,
    type SyntheticEvent,
} from 'react';
import { errorsObjReducer } from 'reducers/create/errors-obj-reducer';
import { recipeObjReducer } from 'reducers/create/recipe-obj-reducer';

const Create = () => {
    const router = useRouter();

    const { alertDispatch } = useContext(AlertDispatchContext);

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
    const [loadingState, setLoadingState] = useState<boolean>(false);

    const handleSubmit = async (e: SyntheticEvent) => {
        console.log('start submit');
        e.preventDefault();
        setSubmitTry(true);
        const validInputs = validateInputs();
        validInputs ? await submitRecipe() : console.log(false);
    };

    const submitRecipe = async () => {
        setLoadingState(true); // user clicked the submit button, while recipe is being saved, a loading screen should be displayed until sucess or error.
        const data = new FormData();

        data.append('recipe', JSON.stringify(recipeObj));
        data.append('picture', recipeObj.picture as Blob);

        await fetch('../../api/recettes/create', {
            method: 'POST',
            body: data,
        }).then((x) => {
            if (x.status !== 200) {
                setLoadingState(false);
                alertDispatch({
                    type: 'set alert',
                    value: {
                        type: 'error',
                        text: "Oups! Il semblerait qu'une erreur se soit produite. Veuillez réessayer plus tard",
                        display: true,
                    },
                });
            } else {
                setLoadingState(false);
                alertDispatch({
                    type: 'set alert',
                    value: {
                        type: 'success',
                        text: 'Recette sauvegardée avec succès!',
                        display: true,
                    },
                });
                router.push(window.location.origin + '/recettes');
            }
        });
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
                        <Backdrop
                            sx={{
                                color: '#fff',
                                zIndex: '99999',
                            }}
                            open={loadingState}
                        >
                            <CircularProgress color="secondary" />
                        </Backdrop>
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
                                    disabled={loadingState}
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
