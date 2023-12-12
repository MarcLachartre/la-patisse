interface Validity {
	isValid?: boolean;
	errorMessage?: string[];
}

interface CreateRecipeFormErrors {
	name: Validity;
	description: Validity;
	recipe: Validity;
	ingredients: Validity;
	tools: Validity;
	pictureURL: Validity;
}

interface CreateIngredientErrors {
	quantity: Validity;
	unit: Validity;
	prep: Validity;
	type: Validity;
}

export type { CreateRecipeFormErrors, Validity, CreateIngredientErrors };
