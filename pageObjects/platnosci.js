var platnosci = function() {
	var rachunki = require('../pageObjects/rachunkiMiniApp.js');
	var mobileMenu = require('../pageObjects/mobileMenu.js');
	var helpers = require('../pageObjects/helpers.js');
	var winston = require('winston');
	var login = require('./loginPage.js');
	var params = browser.params;

	var pplatnosci = element(by.cssContainingText('.widget-tile__widget-header__title', 'Płatności'));
	var pplatnosciPrzelewy = element(by.css('[ui-sref="payments.new.fill({ paymentType: \'domestic\' })"]'));
	var pMojBank = element(by.css('[class="rb-header__menu__content"]')).element(by.css('[ui-sref="dashboard"]'));
	var ptypPlatnosci = element(by.model('payment.type'));

	this.wybierzPlatnosci = function() {
		if (params.page.mobile == 'true') {
			browser.waitForAngular();
			browser.refresh();
			browser.refresh();
			browser.refresh();
			browser.refresh();
			mobileMenu.kliknijPlatnosci();
		} else {
			helpers.waitUntilReady(pMojBank);
			pMojBank.click();
			helpers.waitUntilReady(pMojBank);
			login.kliknijWBaner();
			helpers.waitUntilReady(pplatnosci);
			pplatnosci.click();
		}
		helpers.waitUntilReady(pplatnosciPrzelewy);
		pplatnosciPrzelewy.click();
		helpers.waitUntilReady(ptypPlatnosci);
		ptypPlatnosci.click();
	}

};

module.exports = new platnosci();