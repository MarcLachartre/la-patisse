class RecipeValidate {
	constructor() {}


	static quantity(input: string) { 
        const validity = {isValid: true, error: []}
		const regex = /^([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?$/i;
        console.log(input)
        console.log(regex.test(input))
        !regex.test(input) ? validity.error.push("is not a number") : false
		return regex.test(input);
	}
}

RecipeValidate.quantity("12.8798763978639877209870387638");

