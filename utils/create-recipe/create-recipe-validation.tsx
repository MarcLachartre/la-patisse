import { ValidatorCheck } from '@validator/validator';
import type { Ingredient } from 'custom-types/recipe-types';

export class CreateRecipeValidator {
	static checkName(name: string) {
		const isValidName = new ValidatorCheck(name);

		isValidName.isEmpty();
		isValidName.maxLength(40);

		return isValidName.validity;
	}

	static checkDescription(description: string) {
		const isValidDescription = new ValidatorCheck(description);

		isValidDescription.isEmpty();
		isValidDescription.maxLength(400);

		return isValidDescription.validity;
	}

	static checkQuantity(quantity: string) {
		const isValidQuantity = new ValidatorCheck(quantity);

		isValidQuantity.isEmpty();
		isValidQuantity.numberType();
		isValidQuantity.maxLength(10);

		return isValidQuantity.validity;
	}

	static checkUnit(unit: string) {
		const isValidUnit = new ValidatorCheck(unit);

		isValidUnit.isText();
		isValidUnit.maxLength(15);

		return isValidUnit.validity;
	}

	static checkPrep(prep: string) {
		const isValidPrep = new ValidatorCheck(prep);

		isValidPrep.isText();
		isValidPrep.maxLength(15);

		return isValidPrep.validity;
	}

	static checkType(type: string) {
		const isValidType = new ValidatorCheck(type);

		isValidType.isEmpty();
		isValidType.maxLength(400);

		return isValidType.validity;
	}

	static checkIngredients(ingredientList: Ingredient[], inputName?: string) {
		const isValidType = new ValidatorCheck(ingredientList, inputName);

		isValidType.isEmpty();
		isValidType.maxLength(1);

		return isValidType.validity;
	}
}
