var lokaty = require('../pageObjects/lokaty.js');
var winston = require('winston');

describe('Lokaty Testy', function() {

	it('zalozenie lokaty', function() {
		winston.log('info', 'TEST = zalozenie lokaty');
		//rachunekNadawcy, kwota, lokata, okres, automatyczneOdnowienie, nazwaWlasnaLokaty, rachunekKwotyKapitalu, rachunekKwotyOdsetek, liczbaOtwieranychLokat
		lokaty.dodajLokate(loginDane.rachunekNadawcy, loginDane.kwota, loginDane.rachunekOdbiorcy, loginDane.lokata, loginDane.okres, loginDane.automatyczneOdnowienie,
			loginDane.nazwaWlasnaLokaty, loginDane.rachunekKwotyKapitalu, loginDane.rachunekKwotyOdsetek, loginDane.liczbaOtwieranychLokat);
	});

});