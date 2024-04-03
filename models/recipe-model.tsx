'use server';
import { ObjectId } from 'mongodb';
import {
    Recipe,
    Recipes,
    RecipeToSave,
    ShortRecipes,
    UpdatedRecipe,
} from '../custom-types/recipe-types';
import { Database } from '../database/database';

class RecipeModel {
    static async all() {
        // Connect to myCakes db and point to the cakes collection
        const data: any = await Database.getData('cakes');

        const recipes: Recipes = await data.recipes
            .find()
            .sort({ name: 1 })
            .collation({ locale: 'fr', caseLevel: true })
            .toArray();
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
            const {
                _id,
                name,
                description,
                pictureURL,
                timestamp,
                ...recipeRest
            } = recipe; // Destructure the recipe objects

            const shortRecipe = {
                _id,
                name,
                description,
                pictureURL,
                timestamp,
            }; // Keep the id, name and description properties in an object

            shortRecipes.push(shortRecipe); // Push it in the shortRecipes array.
        });

        return shortRecipes;
    }

    static async findById(id: string) {
        // Connect to myCakes db and point to the cakes collection
        const data: any = await Database.getData('cakes');
        const _id = new ObjectId(id);
        // Find the one requested recipe
        const recipe: Recipe = await data.recipes.findOne({
            _id: _id,
        });

        return recipe;
    }

    static async saveRecipe(recipe: RecipeToSave) {
        const response = await Database.insertData('cakes', recipe);
        return response;
    }

    static async updateRecipe(recipe: UpdatedRecipe, id: string) {
        const filter = { _id: new ObjectId(id) };

        const response = await Database.updateData(filter, recipe, 'cakes');
        return response;
    }
}

export { RecipeModel };
