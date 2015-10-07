var cards = require('../pageObjects/kartyAutomatycznaSplata.js');
var winston = require('winston');

describe('Testy Kart', function() {

it('Dodanie i usuniecie Automatycznej splaty calkowitej', function() {
	winston.log('info', 'TEST = Dodanie i usuniecie Automatycznej splaty calkowitej');
	cards.usuniecieAutomatycznejSplatyMinimalnej(loginDane.rachunekKarty,loginDane.rachunekNadawcy);
});

});