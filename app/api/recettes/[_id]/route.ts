import { NextRequest } from 'next/server';
import { RecipeController } from '../../../../controllers/recipe-controller';

import { NextResponse } from 'next/server';

// api route: /api/recettes/[_id]
export const GET = async (req: NextRequest, { params }: { params: { _id: string } }) => {
	const recipe = await new RecipeController().show(`${params._id}`);

    return NextResponse.json({ recipe })
};


