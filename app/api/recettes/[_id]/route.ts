import { NextRequest, NextResponse } from 'next/server';
import { RecipesController } from '../../../../controllers/recipes-controller';

// api route: /api/recettes/[_id]
export const GET = async (
    req: NextRequest,
    { params }: { params: { _id: string } }
) => {
    const recipe = await new RecipesController().show(`${params._id}`);

    return NextResponse.json({ recipe });
};
