var cards = function () {
	var helpers = require('../pageObjects/helpers.js');
	var winston = require('winston');

	this.karty = element(by.cssContainingText('.widget-tile__widget-header__title', 'Karty'));
	this.aktywuj = element(by.css('[ui-sref="cards.activate.fill"]'));
	this.szczegoly = element(by.buttonText('Szczegóły'));
	this.dalej = element(by.buttonText('Dalej'));
	this.zatwierdz = element(by.buttonText('Aktywuj'));
	this.potwierdzenie=element(by.css('[class="bd-msg-panel__message"]'));
	this.kodSms = element(by.model('rbAuth.value'));
	//splata karty
	this.numerKarty = element(by.model('cardContext.item.card'));
	this.numerRachunku = element(by.model('cardContext.item.accountFrom'));
	//splata karty strona 2
	this.numerKartyPotwierdzenie = element(by.css('[label="Nazwa karty"]'));
	this.dataWaznosci = element(by.css('[label="Data ważności"]'));

	this.aktywacjaKarty = function (numerKarty,hasloSms) {
		if (hasloSms=="")	hasloSms="1111";

		winston.log('info', "Dane testu: numerKarty="+numerKarty+" hasloSms="+hasloSms);

		helpers.waitUntilReady(this.karty);
		this.karty.click();
		helpers.waitUntilReady(this.aktywuj);
		this.aktywuj.click();
		helpers.waitUntilReady(this.numerKarty);
		this.numerKarty.click();
		helpers.wybierzElementZListyPoTekscie('cardItem in $select.items track by $index',numerKarty);
		helpers.waitUntilReady(this.numerKartyPotwierdzenie);
		expect(this.numerKartyPotwierdzenie.getText()).toEqual('Nazwa karty\n'+numerKarty);
		expect(this.dataWaznosci.getText()).toContain('Data ważności');
		this.dalej.click();
		//strona 2
		helpers.waitUntilReady(this.numerKartyPotwierdzenie);
		expect(this.numerKartyPotwierdzenie.getText()).toEqual('Nazwa karty\n'+numerKarty);
		expect(this.dataWaznosci.getText()).toContain('Data ważności');
		helpers.waitUntilReady(this.kodSms);
		this.kodSms.sendKeys(hasloSms);
		this.zatwierdz.click();
		helpers.waitUntilReady(this.potwierdzenie);
		expect(this.potwierdzenie.getText()).toContain('Karta');
		expect(this.potwierdzenie.getText()).toContain('została aktywowana');
	};

	
};
module.exports = new cards();