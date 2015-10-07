var odbiorcy = require('../pageObjects/odbiorcyMiniApp.js');
var winston = require('winston');

describe('Odbiorcy Testy', function() {

it('Edycja odbiorcy krajowego', function() {
	winston.log('info', 'TEST = Dodanie odbiorcy krajowego');
    odbiorcy.edytujOdbiorce(loginDane.rachunekNadawcy,loginDane.nazwaOdbiorcy,loginDane.rachunekOdbiorcy,loginDane.daneOdbiorcy,loginDane.tytulPrzelewu,loginDane.hasloSms);
});

});