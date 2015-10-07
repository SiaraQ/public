var util = require('./util.js');

exports.nip = function (value) {

    var WEIGHTS = [6, 5, 7, 2, 3, 4, 5, 6, 7],
        MODULO = 11;

    var Nip = function (value) {
        this.value = value;
    };

    Nip.prototype.isValid = function () {
        if (util.isString(this.value) && this.value.length === 10) {
            var i, sum = 0, checksum, digits = [];
            for (i = 0; i < WEIGHTS.length; i++) {
                digits.push(+this.value[i]);
                sum += digits[i] * WEIGHTS[i];
            }
            checksum = sum % MODULO;
            return checksum === (+this.value[9]);
        }
        return false;
    };

    Nip.prototype.random = function () {
        var i, sum = 0, checksum, digits = [];

        for (i = 0; i < WEIGHTS.length; i++) {
            digits.push(util.randomInt(1, 9));
            sum += digits[i] * WEIGHTS[i];
        }

        checksum = sum % MODULO;
        if (checksum === 10 || checksum === 0) {
            return this.random();
        }

        return digits.join('') + checksum;
    };

    return new Nip(value);

};