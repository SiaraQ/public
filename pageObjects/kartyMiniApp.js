var cards = function() {
	var helpers = require('../pageObjects/helpers.js');
	var winston = require('winston');
	var login = require('./loginPage.js');

	var fMojBank = element(by.css('[class="rb-header__menu__content"]')).element(by.css('[ui-sref="dashboard"]'));
	var karty = element(by.cssContainingText('.widget-tile__widget-header__title', 'Karty'));

	this.wybierzKarty = function() {
		if (params.page.mobile == 'true') {
			mobileMenu.kliknijKarty();
		} else {
			helpers.waitUntilReady(fMojBank);
			fMojBank.click();
			helpers.waitUntilReady(fMojBank);
			login.kliknijWBaner();
			helpers.waitUntilReady(karty);
			karty.click();
		}
	}

};
module.exports = new cards();