var cards = require('../pageObjects/kartyAutomatycznaSplata.js');
var winston = require('winston');

describe('Testy Kart', function() {

it('Dodanie Automatycznej splaty calkowitej', function() {
	winston.log('info', 'TEST = Dodanie Automatycznej splaty calkowitej');
	cards.dodanieAutomatycznejSplatyCalkowitej(loginDane.rachunekKarty,loginDane.rachunekNadawcy);
});

});