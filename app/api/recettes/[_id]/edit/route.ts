import { CreateRecipeValidator } from '@/utils/data-validators/create-recipe-validator';
import { v2 } from 'cloudinary';
import { RecipesController } from 'controllers/recipes-controller';
import { RecipeToInsert } from 'custom-types/recipe-types';
import { NextResponse } from 'next/server';

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
    typeof pic !== 'string'
        ? // If it is not a string, it means that the user updated the pic and a file object is sent to the backhand. We will use that file to update the pic in cloudinary.
          await updatePic(pic, recipe.pictureCloudinaryPublicId, recipe.name)
        : // If it is a string then it corresponds to the url to the pic. It means that the user didn't uplaod any new file. No action required.
          false;

    const id = recipe._id;

    delete recipe.picture;
    delete recipe._id;
    console.log(recipe.timestamp);
    recipe.timestamp = String(Date.now());

    console.log('recipe upload start');
    const response = await new RecipesController().update(id, recipe);
    console.log('recipe upload end');

    return response;
};

const updatePic = async (pic: File, cloudinaryId: string, cakeName: string) => {
    console.log('pic upload start');
    const timestamp = Date.now();

    const signature = v2.utils.api_sign_request(
        {
            timestamp: timestamp,
            use_filename: false,
            public_id: cloudinaryId,
            folder: 'La Patisse',
            invalidate: true,
            overwrite: true,
        },
        `${process.env.CLOUDINARY_API_SECRET}` as string
    );

    const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

    const formData = new FormData();

    formData.append('file', pic as Blob);

    formData.append('public_id', cloudinaryId);
    formData.append('use_filename', false as any);
    formData.append('signature', signature);
    formData.append('timestamp', timestamp as any);
    formData.append('api_key', `${process.env.CLOUDINARY_API_KEY}`);
    formData.append('folder', 'La Patisse');
    formData.append('invalidate', true as any);
    formData.append('overwrite', true as any);

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

export async function PATCH(request: Request) {
    const data = await request.formData();
    const recipe = JSON.parse(`${data.get('recipe')}`);
    console.log(recipe._id);

    const pic =
        recipe.picture !== undefined
            ? (data.get('picture') as FormDataEntryValue)
            : recipe.pictureURL;

    const response = isValidData(recipe, pic)
        ? await editData(recipe, pic)
        : { sucess: false, error: 'Invalid data' };
    console.log(response);
    return NextResponse.json(response);
}
