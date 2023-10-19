import type { Recipe } from 'custom-types/recipe-types';
import Recette from '../../../components/pages/recette';

import { RecipeController } from 'controllers/recipe-controller';

import { NextRequest } from 'next/server';

const getRecipe = async (id: string) => {
	// Call recipe controller show method to retrieve a specific recipe with all its details
	const recipe: Recipe = await new RecipeController().show(id);
	recipe._id = JSON.stringify(recipe._id);

	return recipe;
};

const Page = async ({ params }: { params: { _id: string } }) => {
	return <Recette recipe={await getRecipe(params._id)} />;
};

export default Page;
