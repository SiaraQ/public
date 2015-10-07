var loginPage = require('../pageObjects/loginPage.js');
var protractor = require('protractor');
var winston = require('winston');


describe('Walidacje logowania', function() {

it('błedne hasło', function() {
	winston.log('info', 'Walidacje logowania błedne hasło');
	loginPage.navigate();
	loginPage.bledneHaslo(loginDane.usrLogin,'bledne_haslo');
	winston.log('info', 'test pozytywnie zakonczony');
});

it('krótkie hasło', function() {
	winston.log('info', 'Walidacje logowania krótkie hasło');
	loginPage.navigate();
	loginPage.krotkieHaslo(loginDane.usrLogin,'a');
	loginPage.krotkieHaslo(loginDane.usrLogin,'aa');
	loginPage.krotkieHaslo(loginDane.usrLogin,'aaa');
	loginPage.krotkieHaslo(loginDane.usrLogin,'aaaa');
	winston.log('info', 'test pozytywnie zakonczony');
});

}); 