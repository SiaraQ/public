var cards = function () {
	var helpers = require('../pageObjects/helpers.js');
	var winston = require('winston');

	this.karty = element(by.cssContainingText('.widget-tile__widget-header__title', 'Karty'));
	this.zmianaPin = element(by.css('[ui-sref="cards.changepin.fill"]'));
	this.szczegoly = element(by.buttonText('Szczegóły'));
	this.dalej = element(by.buttonText('Dalej'));
	this.zatwierdz = element(by.buttonText('Zatwierdź'));
	this.potwierdzenie=element(by.css('[class="bd-msg-panel__message"]'));
	this.usun=element(by.buttonText('Usuń'));
	this.kodSms = element(by.model('rbAuth.value'));
	//zmiana PIN
	this.nazwaKarty = element(by.model('cardContext.item.card'));
	this.numerRachunkuPotwierdzenie = element(by.css('[label="Rachunek"]'));
	this.numerKartyPotwierdzenie = element(by.css('[label="Numer karty"]'));
	this.newPin = element(by.model('cardContext.formData.newPin'));
	this.newPinRetyped = element(by.model('cardContext.formData.newPinRetyped'));
	//zmiana PIN 2
	this.numerKartyPotwierdzenie = element(by.css('[label="Numer karty"]'));
	this.nowyPinPotwierdzenie = element(by.css('[label="Nowy PIN"]'));
	this.nowyPinPotPotwierdzenie = element(by.css('[label="Potwierdź nowy PIN"]'));

	this.zmienPin = function (numerKarty,pin,hasloSms) {
		if (pin=="") pin="2468"
		if (hasloSms=="") hasloSms="1111"
		winston.log('info', "Dane testu: numerKarty="+numerKarty+" pin="+pin+" hasloSms="+hasloSms);
		helpers.waitUntilReady(this.karty);
		this.karty.click();
		helpers.waitUntilReady(this.zmianaPin);
		this.zmianaPin.click();
		helpers.waitUntilReady(this.nazwaKarty);
		this.nazwaKarty.click();
		helpers.wybierzElementZListyPoTekscie('cardItem in $select.items track by $index',numerKarty);
		helpers.waitUntilReady(this.numerKartyPotwierdzenie);
		expect(this.numerKartyPotwierdzenie.getText()).toEqual('Numer karty\n'+numerKarty);
		expect(this.numerRachunkuPotwierdzenie.getText()).toContain('Rachunek');
		this.newPin.clear();
		this.newPin.sendKeys(pin);
		this.newPinRetyped.clear();
		this.newPinRetyped.sendKeys(pin);
		helpers.waitUntilReady(this.dalej);
		this.dalej.click();
		helpers.waitUntilReady(this.numerKartyPotwierdzenie);
		//strona 2
		expect(this.numerKartyPotwierdzenie.getText()).toEqual('Numer karty\n'+numerKarty);
		expect(this.numerRachunkuPotwierdzenie.getText()).toContain('Rachunek');
		expect(this.nowyPinPotwierdzenie.getText()).toEqual('Nowy PIN\n****');
		expect(this.nowyPinPotPotwierdzenie.getText()).toEqual('Potwierdź nowy PIN\n****');	
		helpers.waitUntilReady(this.kodSms);
		this.kodSms.sendKeys(hasloSms);
		this.zatwierdz.click();
		helpers.waitUntilReady(this.potwierdzenie);
		expect(this.potwierdzenie.getText()).toEqual('Operacja przyjęta do realizacji');
	};



};
module.exports = new cards();