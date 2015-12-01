var platnicy = require('../pageObjects/platnicy.js');
var winston = require('winston');
var loginDane = require('../npm/DaneTestowe/login.json');
describe('Platnicy Testy', function() {

	it('Dodanie platnika ZUS', function() {
		winston.log('info', 'TEST = Dodanie platnika ZUS');
		//twojaNazwaPlatnika, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms
		platnicy.dodajPlatnikaZUS(loginDane.twojaNazwaPlatnika, loginDane.nazwaPlatnika, loginDane.nipPlatnika, loginDane.typIdentyfikatoraUzupelniajacego, loginDane.numerIdentyfikatoraUzupelniajacego, loginDane.hasloSms);
	});

});
