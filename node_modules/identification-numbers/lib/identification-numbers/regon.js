var util = require('./util.js');

exports.regon = function (value) {

    var WEIGHTS = [8, 9, 2, 3, 4, 5, 6, 7],
        MODULO = 11;

    var Regon = function (value) {
        this.value = value;
    };

    Regon.prototype.random = function () {
        var i, sum = 0, checksum, digits = [];

        for (i = 0; i < WEIGHTS.length; i++) {
            digits.push(util.randomInt(1, 9));
            sum += digits[i] * WEIGHTS[i];
        }

        checksum = (sum % MODULO) % 10;
        return digits.join('') + checksum;
    };

    Regon.prototype.isValid = function () {
        if (util.isString(this.value) && this.value.length === 9) {
            var i, sum = 0, checksum, digits = [];
            for (i = 0; i < WEIGHTS.length; i++) {
                digits.push(+this.value[i]);
                sum += digits[i] * WEIGHTS[i];
            }
            checksum = sum % MODULO;
            return checksum === (+this.value[8]);
        }
        return false;
    };

    return new Regon(value);

};