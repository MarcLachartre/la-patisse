import { ObjectId } from 'mongodb';
import {
    Recipe,
    Recipes,
    RecipeToSave,
    ShortRecipe,
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
        recipes.forEach((recipe: ShortRecipe) => {
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
        try {
            const _id = new ObjectId(id);
            // Find the one requested recipe
            const recipe: Recipe = await data.recipes.findOne({
                _id: _id,
            });

            recipe !== null
                ? recipe
                : { error: 'No record found in db', success: false };
        } catch (e) {
            console.log(e);
            return { error: e, success: false };
        }
    }

    static async findBySearchName(name: string) {
        // Connect to myCakes db and point to the cakes collection
        const data: any = await Database.getData('cakes');

        try {
            // Find the one requested recipe
            const recipe = await data.recipes.findOne({
                searchName: name,
            });

            return recipe !== null
                ? recipe
                : { error: 'No record found in db', success: false };
        } catch (e) {
            console.log(e);
            return { error: e, success: false };
        }
    }

    static async saveRecipe(recipe: RecipeToSave) {
        recipe.searchName = recipe.name
            .split(' ')
            .map((word) => {
                return word.toLowerCase();
            })
            .join('_')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\//g, '')
            .trim();
        const response = await Database.insertData('cakes', recipe);
        return response;
    }

    static async updateRecipe(recipe: UpdatedRecipe, id: string) {
        const filter = { _id: new ObjectId(id) };

        recipe.searchName = recipe.name
            .split(' ')
            .map((word) => {
                return word.toLowerCase();
            })
            .join('_')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9_]/g, '')
            .trim();

        const response = await Database.updateData(filter, recipe, 'cakes');
        return response;
    }
}

export { RecipeModel };
