var mifid = require('../pageObjects/mifid.js');
var winston = require('winston');

describe('Testy MIFID', function() {

it('uzupelnij Mifid rezygnacja', function() {
	winston.log('info', 'TEST = uzupelnij Mifid rezygnacja');
	mifid.uzupelnijMifid(true);
});

});