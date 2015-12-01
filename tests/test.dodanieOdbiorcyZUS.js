var odbiorcyZus = require('../pageObjects/odbiorcyZus.js');
var winston = require('winston');
var loginDane = require('../npm/DaneTestowe/login.json');
describe('Odbiorcy Testy', function() {

	it('Dodanie odbiorcy zus', function() {
		winston.log('info', 'TEST = Dodanie odbiorcy zus');
		//rachunekNadawcy, nazwaOdbiorcy, rachunekOdbiorcy, nipPlatnika, typDrugiegoIdentyf, drugiIdentyf, typWplaty, hasloSms
		odbiorcyZus.dodajOdbiorceZUS(loginDane.rachunekNadawcy, loginDane.nazwaOdbiorcy, loginDane.rachunekOdbiorcy, loginDane.nipPlatnika, loginDane.typDrugiegoIdentyfikatora, loginDane.drugiIdentyfikator, loginDane.typWplaty, loginDane.hasloSms);
	});

});
