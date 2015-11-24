var cards = require('../pageObjects/kartySplataKarty.js');
var winston = require('winston');

describe('Testy Kart', function() {

it('Dodanie splaty karty', function() {
	winston.log('info', 'TEST = Dodanie splaty karty');
	//rachunekNadawcy,rachunekKarty,typSplaty,innaKwota,tytul
	cards.dodanieSplaty(loginDane.rachunekNadawcy,loginDane.rachunekKarty,loginDane.typSplaty,loginDane.innaKwota,loginDane.tytulPrzelewu);
});

});