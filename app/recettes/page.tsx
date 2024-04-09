import { RecipesController } from 'controllers/recipes-controller';
import { Recipe } from 'custom-types/recipe-types';
import { Metadata } from 'next';
import Index from '../../components/pages/recipes/index';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'La Pâtisse 🍰',
    description:
        "La Pâtisse n'est rien d'autre qu'un simple recueil de mes recettes favorites. Elle est née de ma volonté d'en faire l'inventaire et de la partager avec mon entourage 😊🍰.",
    creator: 'Marc Lachartre',
    keywords:
        'La Pâtisse, pâtisserie, delicatessen, recette, recettes, gateaux, entremets, ',

    openGraph: {
        title: 'La Pâtisse 🍰',
        images: ' https://res.cloudinary.com/dgi1q0deg/image/upload/v1697644670/La%20Patisse/1710874863717.png',
        description:
            "La Pâtisse n'est rien d'autre qu'un simple recueil de mes recettes favorites. Elle est née de ma volonté d'en faire l'inventaire et de la partager avec mon entourage 😊🍰.",
    },
};

const getRecipes = async () => {
    'use server';
    // Call recipe controller index method to retrieve all recipes with a short descrition to populate the recettes page
    const recipes = await new RecipesController().index();

    // Converting id from mongoId object to string
    const r = await recipes.map((recipe: Recipe) => {
        recipe._id = JSON.stringify(recipe._id);
        return recipe;
    });

    return r;
};

const Page = async () => {
    return <Index recipes={await getRecipes()} />;
};

export default Page;
