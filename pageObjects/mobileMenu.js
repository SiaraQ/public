var mobileMenu = function () {
	var params = browser.params;
	var helpers = require('../pageObjects/helpers.js');
	
	this.menu=element(by.css('[ng-click="leftMenu.opened = !leftMenu.opened"]'));
	// ng-repeat="item in menuItems | orderBy:'priority'"
	this.mojBank=helpers.wybierzElementZListyPoTekscie("item in menuItems | orderBy:'priority'",'Mój bank');
	this.rachunki=helpers.wybierzElementZListyPoTekscie("item in menuItems | orderBy:'priority'",'Rachunki');
	this.karty=helpers.wybierzElementZListyPoTekscie("item in menuItems | orderBy:'priority'",'Karty');
	this.platnosci=helpers.wybierzElementZListyPoTekscie("item in menuItems | orderBy:'priority'",'Płatności');
	this.lokaty=helpers.wybierzElementZListyPoTekscie("item in menuItems | orderBy:'priority'",'Lokaty');
	this.wnioski=helpers.wybierzElementZListyPoTekscie("item in menuItems | orderBy:'priority'",'Wnioski i umowy');
	this.inne=helpers.wybierzElementZListyPoTekscie("item in menuItems | orderBy:'priority'",'Inne usługi');	

};
module.exports = new mobileMenu();