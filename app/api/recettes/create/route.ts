import { CreateRecipeValidator } from '@/utils/data-validators/create-recipe-validator';
import { uploadPictureToCloudinary } from 'app/api/_lib/cloudinary/upload';
import { RecipesController } from 'controllers/recipes-controller';
import type { RecipeToInsert } from 'custom-types/recipe-types';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    const token = await getToken({ req }); // get token from user to protect route
    if (token) {
        const data = await req.formData();
        const recipe = JSON.parse(`${data.get('recipe')}`);

        const pic = data.get('picture') as FormDataEntryValue;

        const response = isValidData(recipe, pic)
            ? await submitData(recipe, pic)
            : { success: false, error: 'Invalid data' };

        return NextResponse.json(response);
    } else {
        return NextResponse.json({
            success: false,
            error: 'Unauthorized',
            status: 401,
        });
    }
};

const submitData = async (recipe: RecipeToInsert, pic: FormDataEntryValue) => {
    const timestamp = String(Date.now());
    const uploadPicResponse = await uploadPictureToCloudinary(pic, {
        timeout: 120000,
        public_id: timestamp,
        folder: 'La Patisse',
    });

    delete recipe.picture;

    recipe.pictureURL = uploadPicResponse.secure_url;
    recipe.pictureCloudinaryPublicId = String(timestamp);
    recipe.timestamp = timestamp;

    console.log('recipe upload start');
    const response =
        uploadPicResponse.error !== undefined
            ? { success: false, message: uploadPicResponse.error.name }
            : await new RecipesController().create(recipe);
    console.log('recipe upload end');

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
