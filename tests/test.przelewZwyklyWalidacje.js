var payments = require('../pageObjects/przelewZwykly.js');
var winston = require('winston');

describe('Przelew zwykly walidacje', function() {

it('Walidacja tytulem', function() {
	winston.log('info', 'Przelew zwykly walidacje - Walidacja tytulem');
    payments.przelewKrajowyWalidacjaTytulem();
});

it('Walidacja kwoty', function() {
	winston.log('info', 'Przelew zwykly walidacje - Walidacja kwoty');
    payments.przelewKrajowyWalidacjaKwoty();
});

it('Walidacja daty', function() {
	winston.log('info', 'Przelew zwykly walidacje - Walidacja daty');
    payments.przelewKrajowyWalidacjaDaty();
});

}); 