var platnicy = require('../pageObjects/platnicy.js');
var winston = require('winston');
var loginDane = require('../npm/DaneTestowe/login.json');
describe('Platnicy Testy', function() {

	it('Dodanie platnika US', function() {
		winston.log('info', 'TEST = Dodanie platnika US');
		//twojaNazwaPlatnika, nazwaPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms
		winston.log('info', 'TEST = Dodanie platnika US '+loginDane.twojaNazwaPlatnika, loginDane.nazwaPlatnika, loginDane.typIdentyfikatoraUzupelniajacego, loginDane.numerIdentyfikatoraUzupelniajacego, loginDane.hasloSms);
		platnicy.dodajPlatnikaUS(loginDane.twojaNazwaPlatnika, loginDane.nazwaPlatnika, loginDane.typIdentyfikatoraUzupelniajacego, loginDane.numerIdentyfikatoraUzupelniajacego, loginDane.hasloSms);
	});

});
