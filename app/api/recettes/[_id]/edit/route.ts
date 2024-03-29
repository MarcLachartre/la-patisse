import { CreateRecipeValidator } from '@/utils/data-validators/create-recipe-validator';
import { uploadPictureToCloudinary } from 'app/api/_lib/cloudinary/upload';
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
    const picResponse =
        typeof pic !== 'string'
            ? // If it is not a string, it means that the user updated the pic and a file object is sent to the backhand. We will use that file to update the pic in cloudinary.
              //   await updatePic(
              //       pic,
              //       recipe.pictureCloudinaryPublicId,
              //       recipe.name
              //   )
              await uploadPictureToCloudinary(pic, {
                  timeout: 120000,
                  public_id: recipe.pictureCloudinaryPublicId,
                  folder: 'La Patisse',
                  invalidate: true,
                  overwrite: true,
              })
            : // If it is a string then it corresponds to the url to the pic. It means that the user didn't uplaod any new file. No action required.
              false;

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

// const updatePic = async (pic: File, cloudinaryId: string, cakeName: string) => {
//     console.log('pic upload start');

//     const formData = new FormData();

//     v2.config({
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET,
//     });

//     // formData.append('file', pic);
//     const file = pic as File;
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = new Uint8Array(arrayBuffer);

//     const response = (await new Promise((resolve, reject) => {
//         v2.uploader
//             .upload_stream(
//                 {
//                     public_id: cloudinaryId,
//                     folder: 'La Patisse',
//                     invalidate: true,
//                     overwrite: true,
//                     timeout: 120000,
//                     timestamp: Date.now(),
//                 },
//                 function (error, result) {
//                     if (error) {
//                         console.log(error);
//                         reject(error);
//                         return error;
//                     }
//                     resolve(result);
//                 }
//             )
//             .end(buffer);
//     }).catch((error) => {
//         console.error(error);
//         return {
//             success: false,
//             message: `Picture upload error: ${error.name}`,
//         };
//     })) as any;

//     console.log('pic upload end');

//     return response;
// };

export async function PATCH(request: Request) {
    const data = await request.formData();
    const recipe = JSON.parse(`${data.get('recipe')}`);
    console.log(recipe._id);

    const pic =
        recipe.picture !== undefined
            ? (data.get('picture') as FormDataEntryValue)
            : recipe.pictureURL;

    if (pic) {
    }

    const response = isValidData(recipe, pic)
        ? await editData(recipe, pic)
        : { sucess: false, error: 'Invalid data' };

    return NextResponse.json(response);
}
