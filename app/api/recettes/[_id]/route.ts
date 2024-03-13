import { NextRequest, NextResponse } from 'next/server';
import { RecipesController } from '../../../../controllers/recipes-controller';

// api route: /api/recettes/[_id]

const GET = async ({ params }: { params: { _id: string } }) => {
    console.log(NextRequest);
    const recipe = await new RecipesController().show(`${params._id}`);

    return NextResponse.json({ recipe });
};

export default GET;
