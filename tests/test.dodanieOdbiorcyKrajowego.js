var odbiorcy = require('../pageObjects/odbiorcyMiniApp.js');
var winston = require('winston');

describe('Odbiorcy Testy', function() {

it('Dodanie odbiorcy krajowego', function() {
	winston.log('info', 'TEST = Dodanie odbiorcy krajowego');
	// rachunekNadawcy,nazwaOdbiorcy,rachunekOdbiorcy,daneOdbiorcy,tytulPrzelewu,hasloSms
    odbiorcy.dodajOdbiorceKrajowego(loginDane.rachunekNadawcy,loginDane.nazwaOdbiorcy,loginDane.rachunekOdbiorcy,loginDane.daneOdbiorcy,loginDane.tytulPrzelewu,loginDane.hasloSms);
});

});