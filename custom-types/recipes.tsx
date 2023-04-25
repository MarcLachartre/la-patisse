interface Recipe {
	_id: string;
	name: string;
	description: string;
	recipe: string[];
	ingredients: {
		quantity: number;
		unit: string;
		preposition: string;
		type: string;
	}[];
	tools: string[];
}

type Recipes = Recipe[];

type ShortRecipes = {
	_id: string;
	name: string;
	description: string;
}[];

export type { Recipes, Recipe, ShortRecipes };
