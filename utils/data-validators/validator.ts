class ValidatorCheck {
	input: any;
	inputName?: string;
	readonly validity: {
		// validity is the object returned by each function to let the user know if the input is correct or not
		isValid: boolean;
		errorMessage: string[];
	};

	constructor(
		input: any,
		inputName?: string,
		{ validity } = { validity: { isValid: true, errorMessage: [] } }
	) {
		this.validity = validity;
		this.inputName = inputName;
		this.input = input;
	}

	numberType() {
		// console.log('------------');
		// console.log('numberType');

		const regex =
			/^([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?$/i;

		if (!regex.test(this.input as string)) {
			this.validity.errorMessage.push(`Veuillez saisir un nombre.`);
			this.validity.isValid = false;
		}

		return regex.test(this.input as string);
	}

	isText() {
		const regex = /\d/;
		if (regex.test(this.input as string)) {
			this.validity.errorMessage.push(
				`Veuillez saisir uniquement du texte.`
			);
			this.validity.isValid = false;
		}

		return regex.test(this.input as string);
	}

	minmaxLength(min: number, max: number) {
		// console.log('------------');
		// console.log('minmaxLength');

		if (this.input.length < min || this.input.length > max) {
			this.validity.errorMessage.push(
				`La longueur doit être comprise entre ${min} et ${max} caractères.`
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
			if (typeof this.input === 'string') {
				this.validity.errorMessage.push(
					`Ce champ doit contenir moins de ${max} charactères.`
				);
			} else if (typeof this.input === 'object') {
				this.inputName !== undefined;
				this.validity.errorMessage.push(
					`Vous avez atteint le nombre maximal d'entrées possible (${max}).`
				);
			}
			this.validity.isValid = false;
		}
	}

	isEmpty() {
		// console.log('------------');
		// console.log('isEmpty');
		if (this.input.length === 0) {
			if (typeof this.input === 'string') {
				this.validity.errorMessage.push(
					'Ce champ est obligatoire. Veuillez le renseigner.'
				);
			} else if (typeof this.input === 'object') {
				this.inputName !== undefined
					? this.validity.errorMessage.push(
							`Veuillez ajouter au moins ${this.inputName} à la liste.`
					  )
					: this.validity.errorMessage.push(
							'Veuillez ajouter au moins une valeur à la liste.'
					  );
			}
			this.validity.isValid = false;
		}
	}
}

export { ValidatorCheck };
