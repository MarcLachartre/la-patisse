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

        // return regex.test(this.input as string);
    }

    isText() {
        const regex = /\d/;
        if (regex.test(this.input as string)) {
            this.validity.errorMessage.push(
                `Veuillez saisir uniquement du texte.`
            );
            this.validity.isValid = false;
        }

        // return regex.test(this.input as string);
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
                `Ce champ doit contenir plus de ${min} caractères.`
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
                    `Ce champ doit contenir moins de ${max} caractères.`
                );
            } else if (typeof this.input === 'object') {
                this.validity.errorMessage.push(
                    `Vous avez atteint le nombre maximal d'entrées possibles (${max}).`
                );
            }
            this.validity.isValid = false;
        }
    }

    async isEmpty() {
        // console.log('------------');
        // console.log('isEmpty');

        if (typeof this.input === 'string') {
            if (this.input.trim().length === 0) {
                this.validity.errorMessage.push(
                    'Ce champ est obligatoire. Veuillez le renseigner.'
                );
                this.validity.isValid = false;
            }
        } else if (typeof this.input === 'object') {
            let empty;
            if (!Array.isArray(this.input)) {
                for (let key in this.input) {
                    empty = false;
                    break;
                }
            }

            if (this.input.length === 0 || empty) {
                this.inputName !== undefined
                    ? this.validity.errorMessage.push(
                          `Veuillez ajouter ${this.inputName}`
                      )
                    : this.validity.errorMessage.push(
                          'Veuillez ajouter au moins une valeur à la liste.'
                      );
                this.validity.isValid = false;
            }
        }
    }

    maxImageSize(max: number) {
        // error for max file size
        if (this.input.size / 1024 / 1024 > max) {
            this.validity.errorMessage.push(
                `L'image doit faire moins de ${max} Mb.`
            );
            this.validity.isValid = false;
        }
    }

    isImage() {
        if (
            this.input.type !== 'image/png' &&
            this.input.type !== 'image/jpg' &&
            this.input.type !== 'image/jpeg'
        ) {
            this.validity.errorMessage.push(
                'Veuillez ajouter une image au format .jpeg, .jpg, .png.'
            );
            this.validity.isValid = false;
        }
    }

    isURL() {
        const regex =
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

        if (!regex.test(this.input)) {
            this.validity.errorMessage.push(
                "L'URL renseignée est incorrect. Veuillez de nouveau renseigner ce champ."
            );
            this.validity.isValid = false;
        }
    }
}

export { ValidatorCheck };
