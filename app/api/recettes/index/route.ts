import type { NextApiRequest, NextApiResponse } from 'next';
import { RecipeController } from '../../../../controllers/recipe-controller';
import { NextRequest, NextResponse } from 'next/server';

// api route: /api/recipes/index
export const GET = async () => {
    console.log("GET route")
	const response = await new RecipeController().index();

    return NextResponse.json(response)
}
