import { CreateRecipeValidator } from '@/utils/data-validators/create-recipe-validator';
import { uploadPictureToCloudinary } from 'app/api/_lib/cloudinary/upload';
import { RecipesController } from 'controllers/recipes-controller';
import { RecipeToInsert } from 'custom-types/recipe-types';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

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

const editData = async (recipe: any, pic: File | string) => {
    // To know if we need to update the pic in cloudinary, we check the type of the recipe.pic value.
    const picResponse =
        typeof pic !== 'string'
            ? await uploadPictureToCloudinary(pic, {
                  timeout: 120000,
                  public_id: recipe.pictureCloudinaryPublicId,
                  folder: 'La Patisse',
                  invalidate: true,
                  overwrite: true,
                  version: Date.now(),
              })
            : // If it is a string then it corresponds to the url to the pic. It means that the user didn't uplaod any new file. No action required.
              false;
    picResponse === false ? true : (recipe.pictureURL = picResponse.secure_url); // Sets the current version of the pic

    const id = recipe._id;

    delete recipe.picture;
    delete recipe._id;

    recipe.timestamp = String(Date.now());

    console.log('recipe upload start');
    const response =
        picResponse.success !== false
            ? await new RecipesController().update(id, recipe)
            : picResponse;

    console.log('recipe upload end');

    return response;
};

export async function PATCH(req: NextRequest) {
    const token = await getToken({ req }); // get token from user to protect route
    if (token) {
        const data = await req.formData();
        const recipe = JSON.parse(`${data.get('recipe')}`);

        const pic =
            recipe.picture !== undefined
                ? (data.get('picture') as FormDataEntryValue)
                : recipe.pictureURL;

        const response = isValidData(recipe, pic)
            ? await editData(recipe, pic)
            : { sucess: false, error: 'Invalid data' };

        return NextResponse.json(response);
    } else {
        return NextResponse.json({
            success: false,
            error: 'Unauthorized',
            status: 401,
        });
    }
}
