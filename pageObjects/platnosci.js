var platnosci = function() {
	var rachunki = require('../pageObjects/rachunkiMiniApp.js');
	var helpers = require('../pageObjects/helpers.js');
	var winston = require('winston');
	var login = require('./loginPage.js');

	var fplatnosci = element(by.cssContainingText('.widget-tile__widget-header__title', 'Płatności'));
	var fplatnosciPrzelewy = element(by.css('[ui-sref="payments.new.fill({ paymentType: \'domestic\' })"]'));
	var fMojBank = element(by.css('[class="rb-header__menu__content"]')).element(by.css('[ui-sref="dashboard"]'));
	var ftypPlatnosci = element(by.model('payment.type'));

	this.wybierzPlatnosci = function() {
		if (params.page.mobile == 'true') {
			mobileMenu.kliknijKarty();
		} else {
			helpers.waitUntilReady(fMojBank);
			fMojBank.click();
			helpers.waitUntilReady(fMojBank);
			login.kliknijWBaner();
			helpers.waitUntilReady(fplatnosci);
			fplatnosci.click();
		}
		helpers.waitUntilReady(fplatnosciPrzelewy);
		fplatnosciPrzelewy.click();
		helpers.waitUntilReady(ftypPlatnosci);
		ftypPlatnosci.click();
	}

};

module.exports = new platnosci();