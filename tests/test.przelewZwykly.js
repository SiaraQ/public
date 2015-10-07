var payments = require('../pageObjects/przelewZwykly.js');
var winston = require('winston');

describe('Testy platnosci', function() {

it('Dodanie przelewu zwyklego', function() {
	winston.log('info', 'TEST = Dodanie przelewu krajowego');
	//rachunekNadawcy,nazwaOdbiorcy,rachunekOdbiorcy,tytulPrzelewu,kwota,dataRealizacji,hasloSms
    payments.tworzPrzelewZwykly(loginDane.rachunekNadawcy,loginDane.nazwaOdbiorcy,loginDane.rachunekOdbiorcy,loginDane.tytulPrzelewu,loginDane.kwota,loginDane.dataRealizacji,loginDane.hasloSms);
});


}); 