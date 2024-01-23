'use client';

import createInstructionsStyle from '@/styles/components/forms/create-recipe/CreateInstructions.module.scss';
import instructionStyle from '@/styles/components/Instructions.module.scss';
import style from '@/styles/pages/Create.module.scss';
import { CreateRecipeValidator } from '@/utils/data-validators/create-recipe-validator';
import { ErrorsObjContext } from '@context/create/errors-obj-context';
import {
    RecipeObjContext,
    RecipeObjDispatchContext,
} from '@context/create/recipe-obj-context';
import { Button, FormHelperText, TextField, Tooltip } from '@mui/material';
import { Validity } from 'custom-types/form-error-types';
import { useContext, useEffect, useState } from 'react';

const CreateInstruction = () => {
    const recipeObj = useContext(RecipeObjContext);
    const dispatchRecipeObj = useContext(RecipeObjDispatchContext);
    const errorsObj = useContext(ErrorsObjContext);

    const [instruction, setInstruction] = useState<string>('');
    const [editingMode, setEditingMode] = useState<boolean>(false);
    const [instructionIndex, setInstructionIndex] = useState<number>(9999);
    const [instructionError, setInstructionError] = useState<Validity>({});

    const addInstruction = () => {
        const inputValidity = validateInput();
        inputValidity.isValid ? saveInstruction() : false;
    };

    const saveInstruction = () => {
        const instructionsList = recipeObj.recipe;

        if (editingMode === true) {
            instructionsList[instructionIndex] = instruction;
            setInstructionIndex(9999);
            setEditingMode(false);
        } else {
            instructionsList.push(instruction);
        }

        dispatchRecipeObj({
            type: 'changed',
            key: 'recipe',
            value: instructionsList,
        });

        setInstructionError({});
        setInstruction('');
    };

    const removeInstruction = (index: number) => {
        const instructionsList = recipeObj.recipe;

        const newInstructionList = instructionsList.filter((instruction, i) => {
            return i !== index;
        });

        dispatchRecipeObj({
            type: 'changed',
            key: 'recipe',
            value: newInstructionList,
        });
    };

    const validateInput = () => {
        const validator = CreateRecipeValidator;
        const instructionValidity = validator.checkInstruction(instruction);

        setInstructionError(instructionValidity);
        return instructionValidity;
    };

    useEffect(() => {
        instructionError.isValid !== undefined || editingMode === true
            ? validateInput()
            : false;
    }, [instruction]);

    const textfield = (key: string | undefined) => {
        return (
            <TextField
                id="filled-basic"
                key={key}
                label="Instructions *"
                variant="filled"
                color="primary"
                placeholder="Mélanger d'abord les oeufs et la farine..."
                autoComplete="off"
                multiline={true}
                value={instruction}
                minRows={1}
                onKeyDown={(e) => {
                    e.code === 'Enter' ? addInstruction() : false;
                }}
                onChange={(e) => {
                    setInstruction(e.target.value);
                }}
                error={
                    instructionError.isValid !== undefined
                        ? !instructionError.isValid
                        : false
                }
                helperText={
                    !instructionError.isValid
                        ? instructionError.errorMessage
                        : ''
                }
                inputProps={{
                    maxLength: 700,
                }}
                style={{
                    minHeight: '59px !important',
                }}
            ></TextField>
        );
    };

    const button = (name: string) => {
        return (
            <Button
                variant="contained"
                onClick={() => {
                    addInstruction();
                }}
                onKeyDown={(e) => {
                    e.preventDefault();
                }}
                color="secondary"
            >
                {name}
            </Button>
        );
    };

    return (
        <div className={instructionStyle.instructionsContainer}>
            <h3 className={errorsObj.recipe.isValid === false ? 'error' : ''}>
                Instructions
                <FormHelperText error={!errorsObj.recipe.isValid}>
                    {errorsObj.recipe.errorMessage
                        ? `${errorsObj.recipe.errorMessage}`
                        : ''}
                </FormHelperText>
            </h3>
            <ul
                style={{
                    display: `${
                        recipeObj.recipe.length === 0 ? 'none' : 'flex'
                    }`,
                }}
            >
                {recipeObj.recipe.map((i, index) => (
                    <div key={`instruction${index + 1}`}>
                        {index !== instructionIndex ? (
                            <li
                                className={style.listContainer}
                                id={`instruction${index + 1}`}
                                data-hide={
                                    index === instructionIndex ? true : false
                                }
                            >
                                <div
                                    className={style.list}
                                    data-hide={
                                        index === instructionIndex
                                            ? editingMode
                                            : false
                                    }
                                >
                                    <Tooltip title="Editer" arrow>
                                        <p
                                            onClick={() => {
                                                setInstructionIndex(index);
                                                setEditingMode(true);
                                                setInstruction(i);
                                            }}
                                        >
                                            {i}
                                        </p>
                                    </Tooltip>
                                    <Tooltip title="Supprimer" arrow>
                                        <img
                                            src="/icons/cross.png"
                                            alt="cross"
                                            className="cross"
                                            onClick={() => {
                                                removeInstruction(index);
                                            }}
                                            data-hide={
                                                editingMode
                                                    ? editingMode
                                                    : false
                                            }
                                        />
                                    </Tooltip>
                                </div>
                            </li>
                        ) : (
                            <li className={style.listInputs}>
                                {textfield('valider')}

                                <div
                                    className={
                                        createInstructionsStyle.addInstructionBtn
                                    }
                                >
                                    {button('valider')}
                                </div>
                            </li>
                        )}
                    </div>
                ))}
            </ul>
            {!editingMode
                ? [
                      textfield('Ajouter une instruction'),
                      <div
                          key={'btn-instructions'}
                          className={createInstructionsStyle.addInstructionBtn}
                      >
                          {button('Ajouter une instruction')}
                          <FormHelperText>
                              {recipeObj.recipe.length >= 50
                                  ? "Quantité maximale d'instructions atteinte."
                                  : ''}
                          </FormHelperText>
                      </div>,
                  ]
                : false}
        </div>
    );
};

export default CreateInstruction;
