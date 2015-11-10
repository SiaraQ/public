var mobileMenu = function() {
	var params = browser.params;
	var helpers = require('../pageObjects/helpers.js');

	this.menu = element(by.css('[ng-click="leftMenu.opened = !leftMenu.opened"]'));
	// this.clickSmallElement
	this.mojBank = element(by.repeater('item in menuItems | orderBy:\'priority\'').row(0));
	this.rachunki = element(by.repeater('item in menuItems | orderBy:\'priority\'').row(1));
	this.karty = element(by.repeater('item in menuItems | orderBy:\'priority\'').row(2));
	this.platnosci = element(by.repeater('item in menuItems | orderBy:\'priority\'').row(3));
	this.lokaty = element(by.repeater('item in menuItems | orderBy:\'priority\'').row(4));
	this.wnioski = element(by.repeater('item in menuItems | orderBy:\'priority\'').row(5));
	this.inne = element(by.repeater('item in menuItems | orderBy:\'priority\'').row(6));

	this.kliknijRachunki = function() {
		helpers.waitUntilReady(this.menu);
		this.menu.click();
		helpers.clickSmallElement(this.rachunki);
	}

	this.kliknijPlatnosci = function() {
		helpers.waitUntilReady(this.menu);
		this.menu.click();
		helpers.clickSmallElement(this.platnosci);
	}

	this.kliknijKarty = function() {
		helpers.waitUntilReady(this.menu);
		this.menu.click();
		helpers.clickSmallElement(this.karty);
	}

};
module.exports = new mobileMenu();