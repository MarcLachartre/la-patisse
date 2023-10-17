import Recettes from '../../components/pages/recettes';

import { RecipeController } from 'controllers/recipe-controller';

interface Recipe {
	_id: string;
	name: string;
	description: string;
}

const getRecipes = async () => {
	// Retrieve all recipes to populate the recettes page
	console.log(await new RecipeController().index());

	const a = await fetch('http://api.open-notify.org/iss-now.json');
	console.log(await a.json());

	// Call recipe controller index method to retrieve all recipes with a short descrition
	const recipes = await new RecipeController().index();

	// Converting id from mongoId object to string
	const r = await recipes.map((recipe: Recipe) => {
		recipe._id = JSON.stringify(recipe._id);
		return recipe;
	});

	return r;
};

const Page = async () => {
	return <Recettes recipes={await getRecipes()} />;
};

export default Page;
