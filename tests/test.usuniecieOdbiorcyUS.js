var odbiorcyUs = require('../pageObjects/odbiorcyUs.js');
var winston = require('winston');

describe('Odbiorcy Testy', function() {

	it('Dodanie i usuniecie odbiorcy us', function() {
		winston.log('info', 'TEST = Dodanie i usuniecie odbiorcy us');
		//rachunekNadawcy, nazwaOdbiorcy, rachunekUrzeduSkarbowego, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, symbolFormularza, typOkresu, identyfokacjaZobowiazania, hasloSms
		odbiorcyUs.usunOdbiorceUS(loginDane.rachunekNadawcy);
	});

});