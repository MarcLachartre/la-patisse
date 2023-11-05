import Index from '../../components/pages/recipes/index';

import { RecipeController } from 'controllers/recipe-controller';

import { Recipe } from 'custom-types/recipe-types';

const getRecipes = async () => {
	// Call recipe controller index method to retrieve all recipes with a short descrition to populate the recettes page
	const recipes = await new RecipeController().index();

	// Converting id from mongoId object to string
	const r = await recipes.map((recipe: Recipe) => {
		recipe._id = JSON.stringify(recipe._id);
		return recipe;
	});

	return r;
};

const Page = async () => {
	return <Index recipes={await getRecipes()} />;
};

export default Page;
