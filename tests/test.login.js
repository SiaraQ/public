var loginPage = require('../pageObjects/loginPage.js');
var winston = require('winston');

describe('Logowanie', function() {

it('zalogowanie do aplikacji', function() {
	winston.log('info', 'logowanie');
	loginPage.navigate();
	loginPage.logIn(loginDane.usrLogin,loginDane.usrPassword);
	winston.log('info', 'poprawnie zalogowalo uzytkownika Login='+loginDane.usrLogin+" haslo="+loginDane.usrPassword);
});

}); 