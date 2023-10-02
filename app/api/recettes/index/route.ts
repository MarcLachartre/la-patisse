import { RecipeController } from '../../../../controllers/recipe-controller';
import {  NextResponse } from 'next/server';

// api route: /api/recipes/index
export const GET = async () => {
	const response = await new RecipeController().index();

    return NextResponse.json(response)
}
