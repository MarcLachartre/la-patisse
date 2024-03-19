import { RecipesController } from 'controllers/recipes-controller';
import type { Recipe } from 'custom-types/recipe-types';
import Show from '../../../components/pages/recipes/show';
export const dynamic = 'force-dynamic';

const getRecipe = async (id: string) => {
    'use server';
    // Call recipe controller show method to retrieve a specific recipe with all its details
    const recipe: Recipe = await new RecipesController().show(id);
    recipe._id = JSON.stringify(recipe._id);

    return recipe;
};

const Page = async ({ params }: { params: { _id: string } }) => {
    return params._id !== 'undefined' ? (
        <Show recipe={await getRecipe(params._id)} />
    ) : (
        <div></div>
    );
};

export default Page;
