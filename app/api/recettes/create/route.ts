import { RecipeController } from 'controllers/recipe-controller';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
export const POST = async (req: NextRequest) => {
    const recipeToInsert = req.body;
    console.log(req);
    // const response = await new RecipeController().create(recipeToInsert)
    // return Response.json({cul: "cul" })
    return NextResponse.json({ cul: 'cul' });
};
