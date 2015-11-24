var mifid = require('../pageObjects/mifid.js');
var winston = require('winston');

describe('Testy MIFID', function() {

it('uzupelnij Mifid', function() {
	winston.log('info', 'TEST = uzupelnij Mifid');
	mifid.uzupelnijMifid(false);
});

});