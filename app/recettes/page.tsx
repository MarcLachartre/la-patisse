import { RecipeController } from '../../controllers/recipe-controller';
import Recettes from '../../components/pages/recettes';

interface Recipe {
	_id: string;
	name: string;
	description: string;
}

const getRecipes = async () => {
	// Retrieve all recipes to populate the recettes page
	const recipes: Recipe[] = await new RecipeController().index();
	// Converting id from mongoId object to string
	const r = recipes.map((recipe) => {
		recipe._id = JSON.stringify(recipe._id);
		return recipe;
	});

	return r;
};

const Page = async () => {
	return <Recettes recipes={await getRecipes()} />;
};

export default Page;
