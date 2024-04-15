import { RecipesController } from 'controllers/recipes-controller';
import type { Recipe } from 'custom-types/recipe-types';
import type { Metadata, ResolvingMetadata } from 'next';
import Show from '../../../components/pages/recipes/show';

export async function generateMetadata({
    params,
}: {
    params: { name: string };
}): Promise<Metadata> {
    // fetch data
    const recipe = await getRecipe(params.name);

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || [];

    return {
        applicationName: 'La Pâtisse 🍰 - ' + recipe.name,
        title: 'La Pâtisse 🍰 - ' + recipe.name,
        description: recipe.description,
        creator: 'Marc Lachartre',
        keywords: 'La Pâtisse, pâtisserie, delicatessen',
        openGraph: {
            title: 'La Pâtisse 🍰 - ' + recipe.name,
            images: recipe.pictureURL,
            description: recipe.name,
        },
    };
}

const getRecipe = async (name: string) => {
    'use server';
    // Call recipe controller show method to retrieve a specific recipe with all its details
    const recipe: Recipe = await new RecipesController().show(name);
    recipe._id = JSON.stringify(recipe._id);
    return recipe;
};

const Page = async ({ params }: { params: { name: string } }) => {
    const recipe = await getRecipe(params.name);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: recipe.name,
        image: recipe.pictureURL,
        description: recipe.description,
    };

    return [
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />,
        <Show recipe={recipe} />,
    ];
};

export default Page;
