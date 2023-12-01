class ValidatorCheck {
	input: string;
	// inputName?: string;
	readonly validity: {
		// validity is the object returned by each function to let the user know if the input is correct or not
		isValid: boolean;
		errorMessage: string[];
	};

	constructor(
		input: string,
		// inputName?: string,
		{ validity } = { validity: { isValid: true, errorMessage: [] } }
	) {
		this.validity = validity;
		// this.inputName = inputName;
		this.input = input;
	}

	numberType() {
		console.log('------------');
		console.log('numberType');

		const regex =
			/^([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?$/i;

		if (!regex.test(this.input)) {
			this.validity.errorMessage.push(`Veuillez saisir un nombre`);
			this.validity.isValid = false;
		}

		console.log(this.validity);

		return regex.test(this.input);
	}

	minmaxLength(min: number, max: number) {
		// console.log('------------');
		// console.log('minmaxLength');

		if (this.input.length < min || this.input.length > max) {
			this.validity.errorMessage.push(
				`La longueur doit être comprise entre ${min} et ${max} caractères`
			);
			this.validity.isValid = false;
		}
	}

	minLength(min: number) {
		// console.log('------------');
		// console.log('minLength');
		if (this.input.length < min) {
			this.validity.errorMessage.push(
				`Ce champ doit contenir plus de ${min} charactères.`
			);
			this.validity.isValid = false;
		}
	}

	maxLength(max: number) {
		// console.log('------------');
		// console.log('maxLength');
		if (this.input.length > max) {
			this.validity.errorMessage.push(
				`Ce champ doit contenir moins de ${max} charactères.`
			);
			this.validity.isValid = false;
		}
	}

	isEmpty() {
		// console.log('------------');
		// console.log('isEmpty');
		if (this.input.length === 0) {
			this.validity.errorMessage.push(
				'Ce champ est obligatoire. Veuillez le renseigner.'
			);
			this.validity.isValid = false;
		}
	}
}

export { ValidatorCheck };
