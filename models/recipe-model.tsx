import { getData } from '../database/database';
import { ObjectId } from 'mongodb';
import { Recipes, Recipe, ShortRecipes } from '../custom-types/recipe-types';

class RecipeModel {
	static async all() {
		// Connect to myCakes db and point to the cakes collection
		const data: any = await getData();

		const recipes: Recipes = await data.recipes.find().toArray();
		// await data.client.close();
		return recipes;
	}

	static async shortRecipes() {
		// Sends back all the recipes objects in an array with only _id, name, description properties...
		// Retrieve all recipes
		const recipes = await this.all();

		// Create a shortRecipes array
		const shortRecipes: ShortRecipes = [];

		// Iterate in the recipe array
		recipes.forEach((recipe) => {
			const { _id, name, description, pictureURL, ...recipeRest } =
				recipe; // Destructure the recipe objects
			const shortRecipe = { _id, name, description, pictureURL }; // Keep the id, name and description properties in an object
			shortRecipes.push(shortRecipe); // Push it in the shortRecipes array.
		});

		return shortRecipes;
	}

	static async findById(id: string) {
		// Connect to myCakes db and point to the cakes collection
		const data: any = await getData();

		// Find the one requested recipe
		const recipe: Recipe = await data.recipes.findOne({
			_id: new ObjectId(id),
		});

		return recipe;
	}
}

export { RecipeModel };
