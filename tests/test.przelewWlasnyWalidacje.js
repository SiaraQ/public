var payments = require('../pageObjects/przelewWlasny.js');
var winston = require('winston');

describe('Walidacje przelew wlasny', function() {

it('Walidacja pola tytulem', function() {
	winston.log('info', 'Walidacja przelew wlasny pole tytulem');
    payments.przelewWlasnyWalidacjaTytulem();
});

it('Walidacja pola kwota', function() {
	winston.log('info', 'Walidacja przelew wlasny pole kwota');
    payments.przelewWlasnyWalidacjaKwoty();
});

it('Walidacja daty', function() {
	winston.log('info', 'Walidacja przelew wlasny data');
    payments.przelewWlasnyWalidacjaDaty();
});

}); 