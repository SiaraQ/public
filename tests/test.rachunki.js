var accounts = require('../pageObjects/rachunkiMiniApp.js');
var winston = require('winston');

describe('Testy rachunku', function() {

it('Test rachunku na liscie oraz po wybraniu szczegolow ', function() {
	winston.log('info', 'TEST = Test rachunku na liscie oraz po wybraniu szczegolow');
	accounts.testRachunku(loginDane.rachunekNadawcy);
});

}); 