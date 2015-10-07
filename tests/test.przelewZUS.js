var payments = require('../pageObjects/przelewZus.js');
var winston = require('winston');

describe('Testy platnosci', function() {

it('Dodaj nowy przelew ZUS', function() {
	winston.log('info', 'TEST = Dodaj nowy przelew ZUS');
	// rachunekNadawcy,nazwaOdbiorcy,nipPlatnika,typDrugiegoIdentyfikatora,drugiIdentyfikator,typWpłaty,deklaracja,numerDeklaracji,informacjeDodatkowe,dataRealizacji,kwotaUbezpieczenieSpoleczne,kwotaubezpieczenieZdrowotne,kwotaubezpieczenieFPiFGSP,kwotafunduszEmeryturPomostowych,dataRealizacji,hasloSms
    payments.przelewDoZUS(loginDane.rachunekNadawcy,loginDane.nazwaOdbiorcy,loginDane.nipPlatnika,loginDane.typDrugiegoIdentyfikatora,loginDane.drugiIdentyfikator,loginDane.typWpłaty,loginDane.deklaracja,loginDane.numerDeklaracji,loginDane.informacjeDodatkowe,loginDane.dataRealizacji,loginDane.kwotaUbezpieczenieSpoleczne,loginDane.kwotaubezpieczenieZdrowotne,loginDane.kwotaubezpieczenieFPiFGSP,loginDane.kwotafunduszEmeryturPomostowych,loginDane.dataRealizacji,loginDane.hasloSms);
});

});