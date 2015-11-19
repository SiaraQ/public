var odbiorcyZus = require('../pageObjects/odbiorcyZus.js');
var winston = require('winston');

describe('Odbiorcy Testy', function() {

	it('Dodanie i edycja odbiorcy zus', function() {
		winston.log('info', 'TEST = Dodanie i edycja odbiorcy zus');
		//rachunekNadawcy, nazwaOdbiorcy, rachunekOdbiorcy, nipPlatnika, typDrugiegoIdentyf, drugiIdentyf, typWplaty, hasloSms
		odbiorcyZus.edytujOdbiorceZUS(loginDane.rachunekNadawcy, loginDane.nazwaOdbiorcy, loginDane.rachunekOdbiorcy, loginDane.nipPlatnika, loginDane.typDrugiegoIdentyfikatora, loginDane.drugiIdentyfikator, loginDane.typWplaty, loginDane.hasloSms);
	});

});