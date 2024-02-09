import { CreateRecipeValidator } from '@/utils/data-validators/create-recipe-validator';
import { v2 } from 'cloudinary';
import { RecipesController } from 'controllers/recipes-controller';
import type { RecipeToInsert } from 'custom-types/recipe-types';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    const data = await req.formData();
    const recipe = JSON.parse(`${data.get('recipe')}`);

    const pic = data.get('picture') as FormDataEntryValue;

    const response = isValidData(recipe, pic)
        ? await submitData(recipe, pic)
        : { sucess: false, error: 'Invalid data' };

    return NextResponse.json(response);
};

const submitData = async (recipe: RecipeToInsert, pic: FormDataEntryValue) => {
    const timestamp = String(Date.now());
    const uploadPicResponse = await uploadPictureToCloudinary(pic, timestamp);

    delete recipe.picture;

    recipe.pictureURL = uploadPicResponse.secure_url;
    recipe.pictureCloudinaryPublicId = String(timestamp);
    recipe.timestamp = timestamp;

    console.log('recipe upload start');
    const response = await new RecipesController().create(recipe);
    console.log('recipe upload end');

    return response;
};

const uploadPictureToCloudinary = async (
    pic: FormDataEntryValue,
    timestamp: string
) => {
    console.log('pic upload start');

    const signature = v2.utils.api_sign_request(
        {
            timestamp: timestamp,
            use_filename: false,
            public_id: timestamp,
            folder: 'La Patisse',
        },
        `${process.env.CLOUDINARY_API_SECRET}` as string
    );

    const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

    const formData = new FormData();

    formData.append('file', pic as Blob);
    formData.append('public_id', timestamp);
    formData.append('use_filename', false as any);
    formData.append('signature', signature);
    formData.append('timestamp', timestamp);
    formData.append('api_key', `${process.env.CLOUDINARY_API_KEY}`);
    formData.append('folder', 'La Patisse');

    const response = await fetch(url, {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });

    console.log('pic upload end');

    return response;
};

const isValidData = (recipe: RecipeToInsert, pic: FormDataEntryValue) => {
    const validator = CreateRecipeValidator;

    const errors = {
        name: validator.checkName(recipe.name),
        description: validator.checkDescription(recipe.description),
        ingredients: validator.checkIngredients(recipe.ingredients),
        recipe: validator.checkInstructionList(recipe.recipe),
        tools: validator.checkToolList(recipe.tools),
        picture: validator.checkPicture(pic),
    };

    const recipeIsValid = Object.values(errors).every((error) => {
        if (error.isValid === false || error.isValid === undefined) {
            return false;
        } else {
            return true;
        }
    });

    return recipeIsValid;
};
