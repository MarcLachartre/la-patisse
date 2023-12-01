var Validator = /** @class */ (function () {
    function Validator(input, _a) {
        var _b = _a === void 0 ? { validity: { isValid: true, error: [] } } : _a, validity = _b.validity;
        this.validity = validity;
        this.input = input;
    }
    Validator.prototype.checkNumberType = function () {
        console.log("------------");
        console.log("checkNumberType");
        var regex = /^([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?$/i;
        if (!regex.test(this.input)) {
            this.validity.error.push("Input should be a number");
            this.validity.isValid = false;
        }
        console.log(this.validity);
        return regex.test(this.input);
    };
    Validator.prototype.checkLength = function (min, max) {
        console.log("------------");
        console.log("checkLength");
        if (this.input.length < min || this.input.length > max) {
            this.validity.error.push("Input length should be included between ".concat(min, " and ").concat(max));
            this.validity.isValid = false;
            // return 
        }
        // else if (this.input.length < min) {
        //     this.validity.error.push(`Input length should be more than ${min} characters`)
        //     this.validity.isValid = false
        //     return
        // } else {
        //     this.validity.error.push(`Input length should be less than ${max} characters`)
        //     this.validity.isValid = false
        //     return
        // }
    };
    return Validator;
}());
var stringToTest = "a34";
console.log(stringToTest);
var recipeValidate = new Validator(stringToTest);
recipeValidate.checkNumberType();
recipeValidate.checkLength(5, 10);
console.log(recipeValidate.validity);
