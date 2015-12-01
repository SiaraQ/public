var platnicy = require('../pageObjects/platnicy.js');
var winston = require('winston');
var loginDane = require('../npm/DaneTestowe/login.json');
describe('Platnicy Testy', function() {

	it('Dodanie i edycja platnika US', function() {
		winston.log('info', 'TEST = Dodanie i edycja platnika US');
		//twojaNazwaPlatnika, nazwaPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms
		// winston.log('info', 'TEST = Dodanie i edycja platnika US '+loginDane.twojaNazwaPlatnika, loginDane.nazwaPlatnika, loginDane.typIdentyfikatoraUzupelniajacego, loginDane.numerIdentyfikatoraUzupelniajacego, loginDane.hasloSms);
		platnicy.edytujPlatnikaUS(loginDane.twojaNazwaPlatnika, loginDane.nazwaPlatnika, loginDane.typIdentyfikatoraUzupelniajacego, loginDane.numerIdentyfikatoraUzupelniajacego, loginDane.hasloSms);
	});

});
