import { RecipesController } from 'controllers/recipes-controller';
import type { Recipe } from 'custom-types/recipe-types';
import type { Metadata, ResolvingMetadata } from 'next';
import Show from '../../../components/pages/recipes/show';
export const dynamic = 'force-dynamic';

export async function generateMetadata(
    { params }: { params: { _id: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    // fetch data
    const recipe = await getRecipe(params._id);

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || [];

    return {
        title: 'La Pâtisse 🍰 - ' + recipe.name,
        description:
            "La Pâtisse n'est rien d'autre qu'un simple recueil de mes recettes favorites. Elle est née de ma volonté d'en faire l'inventaire et de la partager avec mon entourage 😊🍰.",
        creator: 'Marc Lachartre',
        keywords: 'La Pâtisse, pâtisserie, delicatessen',
        openGraph: {
            title: 'La Pâtisse 🍰 - ' + recipe.name,
            images: recipe.pictureURL,
            description: recipe.name,
        },
    };
}

const getRecipe = async (id: string) => {
    'use server';
    // Call recipe controller show method to retrieve a specific recipe with all its details
    const recipe: Recipe = await new RecipesController().show(id);
    recipe._id = JSON.stringify(recipe._id);

    return recipe;
};

const Page = async ({ params }: { params: { _id: string } }) => {
    return params._id !== 'undefined' ? (
        <Show recipe={await getRecipe(params._id)} />
    ) : (
        <div></div>
    );
};

export default Page;
