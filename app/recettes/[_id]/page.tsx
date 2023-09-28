import { RecipeController } from '../../../controllers/recipe-controller';
import type { Recipe } from 'custom-types/recipes';
import Recette from '../../../components/pages/recette';

const getRecipe = async (id: string) => {
	// Call recipe controller show method to retrieve a specific recipe with all its details
	const recipe: Recipe = await new RecipeController().show(id);
	// Converting id from mongoId object to string
	recipe._id = JSON.stringify(recipe._id);

	return recipe;
};

const Page = async ({ params }: { params: { _id: string } }) => {
	return <Recette recipe={await getRecipe(params._id)} />;
};

export default Page;
