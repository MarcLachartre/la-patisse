var RecipeValidate = /** @class */ (function () {
    function RecipeValidate() {
    }
    RecipeValidate.quantity = function (input) {
        var regex = /^([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?{3,}$/i;
        console.log(input);
        console.log(regex.test(input));
        return regex.test(input);
    };
    return RecipeValidate;
}());
RecipeValidate.quantity("12.8798763978639877209870387638");
