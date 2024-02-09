import { NextResponse } from 'next/server';
import { RecipesController } from '../../../../controllers/recipes-controller';

// api route: /api/recettes/index
export const GET = async () => {
    const response = await new RecipesController().index();
    return NextResponse.json(response);
};
