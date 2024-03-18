// import {
//     NextRequest,
//     NextResponse,
//     type NextRequest as NextRequestType,
// } from 'next/server';
// import { RecipesController } from '../../../../controllers/recipes-controller';

// // api route: /api/recettes/[_id]

// export const GET = async ({
//     req,
//     params,
// }: {
//     req: NextRequestType;
//     // NextRequest: NextRequestType;
//     params: { _id: string };
// }) => {
//     const recipe = await new RecipesController().show(`${params._id}`);
//     console.log(1);
//     console.log(req);
//     return NextResponse.json({ recipe });
// };
