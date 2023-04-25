import type { NextApiRequest, NextApiResponse } from 'next';
import { RecipeController } from '../../../controllers/recipe-controller';

// api route: /api/recipes
export default async function getAllRecipes(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const recipes = await new RecipeController().index();
	res.status(200).json({ recipes });
}
