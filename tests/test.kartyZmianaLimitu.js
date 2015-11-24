var cards = require('../pageObjects/kartyLimity.js');
var winston = require('winston');

describe('Testy Kart', function() {

it('Dodanie Automatycznej splaty calkowitej', function() {
	winston.log('info', 'TEST = Dodanie Automatycznej splaty calkowitej');
	// numerKarty,liczbaTransakcjiBezgot,kwotaTransakcjiBezgot,liczbaTransakcjiGot,kwotaTransakcjiGot,hasloSms
	cards.zmienLimit(loginDane.numerKarty,loginDane.liczbaTransakcjiBezgot,loginDane.kwotaTransakcjiBezgot,loginDane.liczbaTransakcjiGot,loginDane.kwotaTransakcjiGot,loginDane.hasloSms);
});

});