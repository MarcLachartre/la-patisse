import { NextApiRequest} from 'next';
import { RecipeController } from '../../../../controllers/recipe-controller';

import { NextResponse } from 'next/server';

// api route: /api/recettes/[_id]
export const GET = async (req: NextApiRequest, { params }: { params: { _id: string } }) => {
	const recipe = await new RecipeController().show(`${params._id}`);

    return NextResponse.json({ recipe })
};


