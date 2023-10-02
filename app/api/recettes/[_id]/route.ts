import { NextApiRequest} from 'next';
import { RecipeController } from '../../../../controllers/recipe-controller';

import { NextResponse } from 'next/server';

export const GET = async (req: NextApiRequest) => {
	const recipe = await new RecipeController().show(`${req.query._id}`);
	
    return NextResponse.json({ recipe })
};

export default GET;
