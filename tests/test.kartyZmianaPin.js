var cards = require('../pageObjects/kartyPIN.js');
var winston = require('winston');

describe('Testy Kart', function() {

it('Nadanie/zmiana PIN\'u dla karty', function() {
	winston.log('info', 'TEST = Nadanie/zmiana PIN dla karty');
	//numerKarty,pin,hasloSms
	cards.zmienPin(loginDane.numerKarty,loginDane.pin,loginDane.hasloSms);
});

});