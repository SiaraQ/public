var util = require('./util.js');

exports.pesel = function (value) {

    var WEIGHTS = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3],
        LENGTH = 11,
        MODULO = 10;

    var Pesel = function (value) {
        this.value = value;
    };

    Pesel.prototype.decode = function () {
        return {
            ordinal: +this.value.substring(6, 10),
            checksum: +this.value[10],
            sex: (this.value[9] % 2 === 0 ? 'F' : 'M')
        };
        // TODO YEAR, MONTH, DAY
    };

    Pesel.prototype.isValid = function () {
        if (util.isString(this.value) && this.value.length === LENGTH) {
            var i, sum = 0, checksum, digits = [];
            for (i = 0; i < WEIGHTS.length; i++) {
                digits.push(+this.value[i]);
                sum += digits[i] * WEIGHTS[i];
            }
            checksum = (10 - sum % MODULO) % 10;
            return checksum === (+this.value[LENGTH - 1]);
        }
        return false;
    };

    Pesel.prototype.random = function () {
        // FIXME Implement this guy
        return 'ABC';
    };

    return new Pesel(value);

};