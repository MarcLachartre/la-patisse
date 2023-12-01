import { ValidatorCheck } from '@validator/validator';

export class CreateRecipeValidator {
	static checkName(name: string) {
		const isValidName = new ValidatorCheck(name);
		isValidName.isEmpty();
		isValidName.maxLength(40);
		console.log('checkName');
		return isValidName.validity;
	}

	static checkDescription(description: string) {
		const isValidDescription = new ValidatorCheck(description);
		isValidDescription.isEmpty();
		isValidDescription.maxLength(400);
		console.log('checkDesc');
		return isValidDescription.validity;
	}
}
