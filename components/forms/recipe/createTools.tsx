'use client';

import createToolsStyle from '@/styles/components/forms/create-recipe/CreateTools.module.scss';
import toolsStyle from '@/styles/components/Tools.module.scss';
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

const CreateTool = () => {
    const recipeObj = useContext(RecipeObjContext);
    const dispatchRecipeObj = useContext(RecipeObjDispatchContext);
    const errorsObj = useContext(ErrorsObjContext);

    const [tool, setTool] = useState<string>('');
    const [editingMode, setEditingMode] = useState<boolean>(false);
    const [toolIndex, setToolIndex] = useState<number>(9999);
    const [toolError, setToolError] = useState<Validity>({});

    const addTool = () => {
        const inputValidity = validateInput();
        inputValidity.isValid ? saveTool() : false;
    };

    const saveTool = () => {
        const toolsList = recipeObj.tools;

        if (editingMode === true) {
            toolsList[toolIndex] = tool;
            setToolIndex(9999);
            setEditingMode(false);
        } else {
            toolsList.push(tool);
        }

        dispatchRecipeObj({
            type: 'changed',
            key: 'tools',
            value: toolsList,
        });

        setToolError({});
        setTool('');
    };

    const removeTool = (index: number) => {
        const toolsList = recipeObj.tools;

        const newToolsList = toolsList.filter((tool, i) => {
            return i !== index;
        });

        dispatchRecipeObj({
            type: 'changed',
            key: 'tools',
            value: newToolsList,
        });
    };

    const validateInput = () => {
        const validator = CreateRecipeValidator;
        const toolValidity = validator.checkInstruction(tool);

        setToolError(toolValidity);
        return toolValidity;
    };

    useEffect(() => {
        toolError.isValid !== undefined || editingMode === true
            ? validateInput()
            : false;
    }, [tool]);

    const textfield = (key: string | undefined) => {
        return (
            <TextField
                autoFocus
                id="filled-basic"
                key={key}
                label="Matériel *"
                variant="filled"
                color="primary"
                placeholder="Un four"
                autoComplete="off"
                onKeyDown={(e) => {
                    e.code === 'Enter' ? addTool() : false;
                }}
                value={tool}
                minRows={1}
                onChange={(e) => {
                    setTool(e.target.value);
                }}
                error={
                    toolError.isValid !== undefined ? !toolError.isValid : false
                }
                helperText={!toolError.isValid ? toolError.errorMessage : ''}
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
                    addTool();
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
        <div className={createToolsStyle.toolsContainer}>
            <h3 className={errorsObj.tools.isValid === false ? 'error' : ''}>
                Matériel
                <FormHelperText error={!errorsObj.tools.isValid}>
                    {errorsObj.tools.errorMessage
                        ? `${errorsObj.tools.errorMessage}`
                        : ''}
                </FormHelperText>
            </h3>
            <ul
                style={{
                    display: `${
                        recipeObj.tools.length === 0 ? 'none' : 'flex'
                    }`,
                }}
            >
                {recipeObj.tools.map((tool, index) => (
                    <div key={`tool${index + 1}`}>
                        {index !== toolIndex ? (
                            <li
                                className={style.listContainer}
                                id={`tool${index + 1}`}
                                data-hide={index === toolIndex ? true : false}
                            >
                                <div
                                    className={style.list}
                                    data-hide={
                                        index === toolIndex
                                            ? editingMode
                                            : false
                                    }
                                >
                                    <Tooltip title="Editer" arrow>
                                        <p
                                            onClick={() => {
                                                setToolIndex(index);
                                                setEditingMode(true);
                                                setTool(tool);
                                            }}
                                        >
                                            {tool}
                                        </p>
                                    </Tooltip>
                                    <Tooltip title="Supprimer" arrow>
                                        <img
                                            src="/icons/cross.png"
                                            alt="cross"
                                            className="cross"
                                            onClick={() => {
                                                removeTool(index);
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

                                <div className={createToolsStyle.addToolBtn}>
                                    {button('valider')}
                                </div>
                            </li>
                        )}
                    </div>
                ))}
            </ul>
            {!editingMode
                ? [
                      textfield('Ajouter un outil'),
                      <div
                          key={'btn-tools'}
                          className={createToolsStyle.addToolBtn}
                      >
                          {button('Ajouter un outil')}
                          <FormHelperText>
                              {recipeObj.tools.length >= 50
                                  ? 'Quantité maximale de matériel atteinte.'
                                  : ''}
                          </FormHelperText>
                      </div>,
                  ]
                : false}
        </div>
    );
};

export default CreateTool;
