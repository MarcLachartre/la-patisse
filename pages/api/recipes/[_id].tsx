import { NextApiRequest, NextApiResponse } from 'next';
import { RecipeController } from '../../../controllers/recipe-controller';

const getRecipe = async (req: NextApiRequest, res: NextApiResponse) => {
	// console.log(req.query);
	res.setHeader('Content-Type', 'application/json');
	const recipe = await new RecipeController().show(`${req.query._id}`);
	res.status(200).json(recipe);
};

export default getRecipe;
