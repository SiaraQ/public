var odbiorcyUs = require('../pageObjects/odbiorcyZUs.js');
var winston = require('winston');

describe('Odbiorcy Testy', function() {

	it('Dodanie i usuniecie odbiorcy Zus', function() {
		winston.log('info', 'TEST = Dodanie i usuniecie odbiorcy Zus');
		//rachunekNadawcy, nazwaOdbiorcy, rachunekUrzeduSkarbowego, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, symbolFormularza, typOkresu, identyfokacjaZobowiazania, hasloSms
		odbiorcyUs.usunOdbiorceZUS(loginDane.rachunekNadawcy);
	});

});