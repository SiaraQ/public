var cards = function() {
	var helpers = require('../pageObjects/helpers.js');
	var buttons = require('../pageObjects/buttons.js');
	var winston = require('winston');
	var karty = require('../pageObjects/kartyMiniApp.js');

	this.aktywuj = element(by.css('[ui-sref="cards.activate.fill"]'));
	this.szczegoly = buttons.szczegoly;
	this.dalej = buttons.dalej;
	this.zatwierdz = buttons.aktywuj;
	this.potwierdzenie = element(by.css('[class="bd-msg-panel__message"]'));
	this.kodSms = element(by.model('rbAuth.value'));
	//splata karty
	this.numerKarty = element(by.model('cardContext.item.card'));
	this.numerRachunku = element(by.model('cardContext.item.accountFrom'));
	//splata karty strona 2
	this.numerKartyPotwierdzenie = element(by.css('[label="Nazwa karty"]'));
	this.dataWaznosci = element(by.css('[label="Data ważności"]'));

	this.aktywacjaKarty = function(numerKartyCaly, hasloSms) {
		if (hasloSms == "") hasloSms = "1111";
		var numerKarty = helpers.zamienRachunekKarty(numerKartyCaly);
		winston.log('info', "Dane testu: numerKarty=" + numerKarty + " hasloSms=" + hasloSms);

		karty.wybierzKarty();
		helpers.waitUntilReady(this.aktywuj);
		this.aktywuj.click();
		helpers.waitUntilReady(this.numerKarty);
		this.numerKarty.click();
		helpers.wybierzElementZListyPoTekscie('cardItem in $select.items track by $index', numerKarty);
		helpers.waitUntilReady(this.numerKartyPotwierdzenie);
		expect(this.numerKartyPotwierdzenie.getText()).toContain('Nazwa karty');
		expect(this.numerKartyPotwierdzenie.getText()).toContain(numerKarty);
		expect(this.dataWaznosci.getText()).toContain('Data ważności');
		this.dalej.click();
		//strona 2
		helpers.waitUntilReady(this.numerKartyPotwierdzenie);
		expect(this.numerKartyPotwierdzenie.getText()).toContain('Nazwa karty');
		expect(this.numerKartyPotwierdzenie.getText()).toContain(numerKarty);
		expect(this.dataWaznosci.getText()).toContain('Data ważności');
		helpers.waitUntilReady(this.kodSms);
		this.kodSms.sendKeys(hasloSms);
		this.zatwierdz.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
		});
		helpers.waitUntilReady(this.potwierdzenie);
		expect(this.potwierdzenie.getText()).not.toContain("odrzuc");
		expect(this.potwierdzenie.getText()).not.toContain("Operacja odrzucona");
	};


};
module.exports = new cards();