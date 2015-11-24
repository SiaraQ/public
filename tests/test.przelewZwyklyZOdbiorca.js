var payments = require('../pageObjects/przelewZwykly.js');
var odbiorcy = require('../pageObjects/odbiorcyMiniApp.js');
var winston = require('winston');

describe('Testy platnosci', function() {

it('Dodanie przelewu zwyklego', function() {
	winston.log('info', 'TEST = Dodanie przelewu krajowego');
	var random = Math.random();
	var nazwaOdbiorcy="nazwaOdbiorcy"+random;
	var tytulPrzelewu=tytulPrzelewu="tytul"+random;
	//rachunekNadawcy,nazwaOdbiorcy,rachunekOdbiorcy,tytulPrzelewu,kwota,dataRealizacji,hasloSms
	odbiorcy.dodajOdbiorceKrajowego(loginDane.rachunekNadawcy,nazwaOdbiorcy,"","",tytulPrzelewu,"");
    payments.tworzPrzelewZwykly(loginDane.rachunekNadawcy,nazwaOdbiorcy,"",tytulPrzelewu,loginDane.kwota,loginDane.dataRealizacji,loginDane.hasloSms,true);
});


}); 