import type { Recipe } from 'custom-types/recipe-types';
import Show from '../../../components/pages/recipes/show';

import { RecipeController } from 'controllers/recipe-controller';

const getRecipe = async (id: string) => {
	// Call recipe controller show method to retrieve a specific recipe with all its details
	const recipe: Recipe = await new RecipeController().show(id);
	recipe._id = JSON.stringify(recipe._id);

	return recipe;
};

const Page = async ({ params }: { params: { _id: string } }) => {
	return <Show recipe={await getRecipe(params._id)} />;
};

export default Page;
