var odbiorcyUs = require('../pageObjects/odbiorcyUs.js');
var winston = require('winston');
var loginDane = require('../npm/DaneTestowe/login.json');
describe('Odbiorcy Testy', function() {

	it('Dodanie odbiorcy us', function() {
		winston.log('info', 'TEST = Dodanie odbiorcy us');
		//rachunekNadawcy, nazwaOdbiorcy, rachunekUrzeduSkarbowego, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, symbolFormularza, typOkresu, identyfokacjaZobowiazania, hasloSms
		odbiorcyUs.dodajOdbiorceUS(loginDane.rachunekNadawcy, loginDane.nazwaOdbiorcy, loginDane.rachunekUrzeduSkarbowego, loginDane.typIdentyfikatoraUzupelniajacego, loginDane.numerIdentyfikatoraUzupelniajacego,
			loginDane.symbolFormularza, loginDane.typOkresu, loginDane.identyfokacjaZobowiazania, loginDane.hasloSms);
	});

});
