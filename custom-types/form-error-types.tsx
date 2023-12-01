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

export type { CreateRecipeFormErrors, Validity };
