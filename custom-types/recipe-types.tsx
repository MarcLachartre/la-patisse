interface Recipe {
	_id: string;
	name: string;
	description: string;
	recipe: string[];
	ingredients: Ingredient[];
	tools: string[];
	pictureURL: string;
}

interface RecipeToInsert {
	name: string;
	description: string;
	recipe: string[];
	ingredients: Ingredient[];
	tools: string[];
	pictureURL: string;
}

interface Ingredient {
	quantity: number;
	unit?: string;
	preposition?: string;
	type: string;
}

type Recipes = Recipe[];

type ShortRecipes = {
	_id: string;
	name: string;
	description: string;
	pictureURL: string;
}[];

export type { Recipes, Recipe, ShortRecipes, Ingredient, RecipeToInsert };
