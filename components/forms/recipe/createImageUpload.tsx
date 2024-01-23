import style from '@/styles/components/forms/create-recipe/createUploadImage.module.scss';
import { CreateRecipeValidator } from '@/utils/data-validators/create-recipe-validator';
import { ErrorsObjContext } from '@context/create/errors-obj-context';
import {
    RecipeObjContext,
    RecipeObjDispatchContext,
} from '@context/create/recipe-obj-context';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, FormHelperText, Input } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { FormEvent } from 'react';
import { useContext, useState } from 'react';
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const CreateImageUpload = () => {
    const recipeObj = useContext(RecipeObjContext);
    const dispatchRecipeObj = useContext(RecipeObjDispatchContext);
    const errors = useContext(ErrorsObjContext);

    const [imagePreview, setImagePreview] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isValidImage, setIsValidImage] = useState<boolean>(true);

    const handleImageUpload = (e: FormEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files as FileList;
        const imageValidity = validateImage(files);

        if (imageValidity.isValid) {
            setImagePreview(URL.createObjectURL(files[0]));
            setIsValidImage(true);
            setErrorMessage('');
        } else {
            setImagePreview('');
            setIsValidImage(false);
        }

        dispatchRecipeObj({
            type: 'changed',
            key: 'picture',
            value: files[0],
        });
    };

    const validateImage = (image: FileList) => {
        const validator = CreateRecipeValidator;

        const imageValidity = validator.checkPicture(image[0]);
        setIsValidImage(imageValidity.isValid);
        setErrorMessage(imageValidity.errorMessage[0]);

        return imageValidity;
    };

    return (
        <div className={style.addRecipePicContainer}>
            <Box
                className={style.addRecipePic}
                key="ajoute-une-image-box"
                sx={{
                    backgroundImage: `url(${imagePreview})`,
                    border: `solid 1px var(--${
                        isValidImage === false ||
                        errors.picture.isValid === false
                            ? 'red'
                            : 'border-grey'
                    })`,
                    '&:hover': {
                        bgcolor: 'var(--light-grey)',
                        border: `solid 1px var(--${
                            isValidImage === false ||
                            errors.picture.isValid === false
                                ? 'red'
                                : 'grey'
                        })`,
                    },
                }}
            >
                <Button
                    component="label"
                    color="secondary"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                >
                    Ajoute une image
                    <VisuallyHiddenInput
                        type="file"
                        name="file"
                        multiple={false}
                        accept=".png, .jpeg, .jpg"
                        onChange={(e) => {
                            handleImageUpload(e);
                        }}
                    />
                </Button>

                {!isValidImage ? (
                    <FormHelperText
                        error={!isValidImage}
                        key="ajoute-un-image-error-message"
                    >
                        {errorMessage}
                    </FormHelperText>
                ) : (
                    ''
                )}
            </Box>
            {errors.picture.isValid === false ? (
                <FormHelperText
                    key="ajoute-unz-image-error-message"
                    style={{
                        // display: `${
                        //     errors.picture.errorMessage !== undefined
                        //         ? errors.picture.errorMessage[0]
                        //         : ''
                        // }`,
                        marginTop: '3px',
                        marginRight: '14px',
                        marginBottom: '0',
                        marginLeft: '14px',
                        color: 'var(--red)',
                    }}
                >
                    {errors.picture.errorMessage !== undefined
                        ? errors.picture.errorMessage[0]
                        : ''}
                </FormHelperText>
            ) : (
                ''
            )}
        </div>
    );
};

export default CreateImageUpload;
