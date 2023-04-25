import { RecipeModel } from '../models/recipe-model';

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
}

export { RecipeController };
