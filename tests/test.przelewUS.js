var payments = require('../pageObjects/przelewUs.js');
var winston = require('winston');

describe('Testy platnosci', function() {

it('Dodaj nowy przelew US', function() {
	winston.log('info', 'TEST = Dodaj nowy przelew US');
	// rachunekNadawcy,rachunekUrzeduSkarbowego,nazwaPlatnika,typIdentyfikatoraUzupelniajacego,numerIdentyfikatoraUzupelniajacego,symbolFormularza,typOkresu,numerOkresu,rokOkresu,identyfokacjaZobowiazania,dataRealizacji,kwota,hasloSms
    payments.przelewDoUS(loginDane.rachunekNadawcy,loginDane.rachunekUrzeduSkarbowego,loginDane.nazwaPlatnika,loginDane.typIdentyfikatoraUzupelniajacego,loginDane.numerIdentyfikatoraUzupelniajacego,loginDane.symbolFormularza,loginDane.typOkresu,loginDane.numerOkresu,loginDane.rokOkresu,loginDane.identyfokacjaZobowiazania,loginDane.dataRealizacji,loginDane.kwota,loginDane.hasloSms);
});


}); 