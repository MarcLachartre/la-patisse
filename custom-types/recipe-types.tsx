// import type { Files } from "node-mocks-http";
interface Recipe {
    _id: string;
    name: string;
    description: string;
    recipe: string[];
    ingredients: Ingredient[];
    tools: string[];
    pictureURL: string;
    timestamp: string;
}

interface RecipeToInsert {
    name: string;
    description: string;
    recipe: string[];
    ingredients: Ingredient[];
    tools: string[];
    picture?: Blob;
    pictureURL?: string;
    pictureCloudinaryPublicId: string;
    timestamp: string;
}

interface RecipeToSave {
    name: string;
    description: string;
    recipe: string[];
    ingredients: Ingredient[];
    tools: string[];
    pictureURL?: string;
    timestamp: string;
    searchName: string;
}

interface UpdatedRecipe {
    name: string;
    description: string;
    recipe: string[];
    ingredients: Ingredient[];
    tools: string[];
    pictureURL: string;
    timestamp: string;
    searchName: string;
}

interface Ingredient {
    quantity: number;
    unit?: string;
    preposition?: string;
    type: string;
}

type Recipes = Recipe[];

type ShortRecipes = ShortRecipe[];

type ShortRecipe = {
    _id: string;
    name: string;
    description: string;
    pictureURL: string;
    timestamp: string;
};

export type {
    Recipes,
    Recipe,
    ShortRecipe,
    ShortRecipes,
    Ingredient,
    RecipeToSave,
    RecipeToInsert,
    UpdatedRecipe,
};
