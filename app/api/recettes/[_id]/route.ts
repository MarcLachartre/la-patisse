import {
    NextRequest,
    NextResponse,
    type NextRequest as NextRequestType,
} from 'next/server';
import { RecipesController } from '../../../../controllers/recipes-controller';
// api route: /api/recettes/[_id]

export const GET = async ({
    params,
}: {
    NextRequest: NextRequestType;
    params: { _id: string };
}) => {
    console.log(NextRequest);
    const recipe = await new RecipesController().show(`${params._id}`);

    return NextResponse.json({ recipe });
};
