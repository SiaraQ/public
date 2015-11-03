var mobileMenu = function() {
	var params = browser.params;
	var helpers = require('../pageObjects/helpers.js');

	this.menu = element(by.css('[ng-click="leftMenu.opened = !leftMenu.opened"]'));
	// this.clickSmallElement
	this.mojBank = element(by.repeater('item in menuItems | orderBy:\'priority\'').row(0));
	this.rachunki = element(by.repeater('item in menuItems | orderBy:\'priority\'').row(1));
	this.karty = helpers.wybierzElementZListyPoTekscie('item in menuItems | orderBy:\'priority\'', 'Karty');
	this.platnosci = helpers.wybierzElementZListyPoTekscie('item in menuItems | orderBy:\'priority\'', 'Płatności');
	this.lokaty = helpers.wybierzElementZListyPoTekscie('item in menuItems | orderBy:\'priority\'', 'Lokaty');
	this.wnioski = helpers.wybierzElementZListyPoTekscie('item in menuItems | orderBy:\'priority\'', 'Wnioski i umowy');
	this.inne = helpers.wybierzElementZListyPoTekscie('item in menuItems | orderBy:\'priority\'', 'Inne usługi');

	this.kliknijRachunki = function() {
		helpers.waitUntilReady(this.menu);
		this.menu.click();
		helpers.clickSmallElement(this.rachunki);
	}

};
module.exports = new mobileMenu();