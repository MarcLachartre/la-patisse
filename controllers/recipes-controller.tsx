'use server';
import type { RecipeToSave, UpdatedRecipe } from 'custom-types/recipe-types';
import { RecipeModel } from '../models/recipe-model';

class RecipesController {
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

    async create(recipe: RecipeToSave) {
        // Create a recipe and save it in the database
        const response = await this.recipeModel.saveRecipe(recipe);
        return response;
    }

    async update(id: string, recipe: UpdatedRecipe) {
        // Update a recipe and save changes in the database
        const response = await this.recipeModel.updateRecipe(recipe, id);
        return response;
    }
}

export { RecipesController };
