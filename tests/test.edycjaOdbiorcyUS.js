var odbiorcyUs = require('../pageObjects/odbiorcyUs.js');
var winston = require('winston');
var loginDane = require('../npm/DaneTestowe/login.json');
describe('Odbiorcy Testy', function() {

	it('Dodanie i edycja odbiorcy us', function() {
		winston.log('info', 'TEST = Dodanie i edycja odbiorcy us');
		//rachunekNadawcy, nazwaOdbiorcy, rachunekUrzeduSkarbowego, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, symbolFormularza, typOkresu, identyfokacjaZobowiazania, hasloSms
		odbiorcyUs.edytujOdbiorceUS(loginDane.rachunekNadawcy, loginDane.nazwaOdbiorcy, loginDane.rachunekUrzeduSkarbowego, loginDane.typIdentyfikatoraUzupelniajacego, loginDane.numerIdentyfikatoraUzupelniajacego,
			loginDane.symbolFormularza, loginDane.typOkresu, loginDane.identyfokacjaZobowiazania, loginDane.hasloSms);
	});

});
