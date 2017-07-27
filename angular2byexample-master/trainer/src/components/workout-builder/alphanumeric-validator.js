"use strict";
var AlphaNumericValidator = (function () {
    function AlphaNumericValidator() {
    }
    AlphaNumericValidator.invalidAlphaNumeric = function (control) {
        if (control.value.length && !control.value.match(/^[a-z0-9]+$/i)) {
            return { invalidAlphaNumeric: true };
        }
        return null;
    };
    return AlphaNumericValidator;
}());
exports.AlphaNumericValidator = AlphaNumericValidator;
