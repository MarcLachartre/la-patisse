import type { Recipe } from 'custom-types/recipes';
import Recette from '../../../components/pages/recette';

import { NextRequest } from 'next/server';

const getRecipe = async (id: string) => {
	// Call recipe controller show method to retrieve a specific recipe with all its details

	const domain: string = `${process.env.DOMAIN}`;
	const path: string = '/api/recettes/' + id;
	const url = domain + path;
	const req = new NextRequest(url);

	const response = await fetch(req.url, {
		cache: 'no-store',
	});
	const r = await response.json();
	const recipe: Recipe = r.recipe;

	return recipe;
};

const Page = async ({ params }: { params: { _id: string } }) => {
	return <Recette recipe={await getRecipe(params._id)} />;
};

export default Page;
