var payments = require('../pageObjects/przelewWlasny.js');
var winston = require('winston');

describe('Testy platnosci', function() {

it('Dodanie przelewu wlasnego', function() {
	winston.log('info', 'TEST = Dodanie przelewu wlasnego');
	//rachunekNadawcy,naRachunek,tytulPrzelewu,kwota,hasloSms
    payments.tworzPrzelewWlasny(loginDane.rachunekNadawcy,loginDane.rachunekOdbiorcy,loginDane.typIdentyfikatoraUzupelniajacego,loginDane.tytulPrzelewu,loginDane.hasloSms);
});

}); 