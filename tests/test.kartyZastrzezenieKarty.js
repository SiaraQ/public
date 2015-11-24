var cards = require('../pageObjects/kartyZastrzezenieKarty.js');
var winston = require('winston');

describe('Testy Kart', function() {

it('Zastrzezenie karty', function() {
	winston.log('info', 'TEST = Zastrzezenie karty');
	//powodZastrzezenia,numerKarty,kodSms
	cards.zastrzezenieKarty(loginDane.powodZastrzezenia,loginDane.numerKarty,loginDane.hasloSms);
});

});