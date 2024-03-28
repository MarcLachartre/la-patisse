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

    const formData = new FormData();

    v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    formData.append('file', pic);
    const file = formData.get('file') as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const response = (await new Promise((resolve, reject) => {
        v2.uploader
            .upload_stream({ public_id: timestamp }, function (error, result) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            })
            .end(buffer);
    })) as any;

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
