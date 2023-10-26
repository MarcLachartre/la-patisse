import { RecipeModel } from '../models/recipe-model';

import type { Recipe, RecipeToInsert } from 'custom-types/recipe-types';

class RecipeController {
	recipeModel?: any;

	constructor() {
		this.recipeModel = RecipeModel;
	}

	async index() {
		// Retrieve short recipes to display on index page cards
		const shortRecipes = await this.recipeModel.shortRecipes();
		return shortRecipes;
	}

	async show(id: string) {
		// Retrieve recipe to display on the show page
		const recipe = await this.recipeModel.findById(id);
		return recipe;
	}

	async create(recipe: RecipeToInsert) {
		// const response =  await this.recipeModel.findById(id);
		return { success: false };
	}
}

export { RecipeController };
