var cards = require('../pageObjects/kartyAktywacjaKarty.js');
var winston = require('winston');

describe('Testy Kart', function() {

it('Aktywacja karty', function() {
	winston.log('info', 'TEST = Aktywacja karty');
	//numerKarty,hasloSms
	cards.aktywacjaKarty(loginDane.numerKarty,loginDane.hasloSms);
});

});