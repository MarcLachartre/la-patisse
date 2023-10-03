import Recettes from '../../components/pages/recettes';

interface Recipe {
	_id: string;
	name: string;
	description: string;
}

const getRecipes = async () => {
	// Retrieve all recipes to populate the recettes page
	const response = await fetch('http://localhost:3000/api/recettes/index', {
		cache: 'no-store',
	});

	const recipes = await response.json();

	// Converting id from mongoId object to string
	const r = recipes.map((recipe: Recipe) => {
		recipe._id = JSON.stringify(recipe._id);
		return recipe;
	});

	return r;
};

const Page = async () => {
	return <Recettes recipes={await getRecipes()} />;
};

export default Page;
