var odbiorcy = require('../pageObjects/odbiorcyMiniApp.js');
var winston = require('winston');

describe('Odbiorcy Testy', function() {

it('Usuniecie odbiorcy krajowego', function() {
	winston.log('info', 'TEST = Usuniecie odbiorcy krajowego');
    odbiorcy.usunOdbiorce(loginDane.rachunekNadawcy);
});

});