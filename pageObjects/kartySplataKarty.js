var cards = function() {
	var helpers = require('../pageObjects/helpers.js');
	var buttons = require('../pageObjects/buttons.js');
	var winston = require('winston');
	var karty = require('../pageObjects/kartyMiniApp.js');

	this.splata = element(by.css('[ui-sref="cards.repayment.new.fill"]'))
	this.szczegoly = element(by.buttonText('Szczegóły'));
	this.dalej = element(by.buttonText('Dalej'));
	this.zatwierdz = element(by.buttonText('Zatwierdź'));
	this.potwierdzenie = element(by.css('[class="bd-msg-panel__message"]'));
	//splata karty
	this.rachunekKarty = element(by.model('cardContext.item.card'));
	this.numerRachunku = element(by.model('cardContext.item.accountFrom'));
	//DOSTEPNE SORKDI
	// label="Dostępne środki"	//class="bd-item-property__value"
	this.typSplatyMinimalna = element(by.repeater('type in cardContext.meta.repaymentType').row(0)).element(by.css('[class="bd-radio-option__marker"]'));
	this.typSplatyCalkowita = element(by.repeater('type in cardContext.meta.repaymentType').row(1)).element(by.css('[class="bd-radio-option__marker"]'));
	this.typSplatyAktualneSaldo = element(by.repeater('type in cardContext.meta.repaymentType').row(2)).element(by.css('[class="bd-radio-option__marker"]'));
	this.typSplatyInna = element(by.repeater('type in cardContext.meta.repaymentType').row(3)).element(by.css('[class="bd-radio-option__marker"]'));
	//inna kwota
	this.innaKwota = element(by.model('cardContext.formData.otherAmount'));
	this.tytulem = element(by.model('cardContext.formData.transactionTitle'));
	//splata karty strona 2
	this.numerRachunkuKartyPotwierdzenie = element(by.css('[label="Numer rachunku karty"]'));
	this.numerRachunkuPotwierdzenie = element(by.css('[label="Numer rachunku"]'));
	this.kwotaPotwierdzenie = element(by.css('[label="Kwota"]'));
	this.tytulemPotwierdzenie = element(by.css('[label="Tytułem"]'));
	this.dataRealizacjiPotwierdzenie = element(by.css('[label="Data realizacji"]'));

	this.dodanieSplaty = function(rachunekNadawcy, rachunekKarty, typSplaty, innaKwota, tytul) {
		if (innaKwota == "") innaKwota = helpers.losujKwote();
		innaKwota = innaKwota.replace(',', '.');
		if (tytul == "") tytul = "splata karty";
		if (typSplaty == "") typSplaty = "Minimalna";

		var rachunekKarty = helpers.zamienRachunekNaNrbZeSpacjami(rachunekKarty);
		var rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);

		winston.log('info', "Dane testu: rachunekKarty=" + rachunekKarty + " rachunekNadawcy=" + rachunekNadawcy);
		winston.log('info', "Dane testu: typSplaty=" + typSplaty + " innaKwota=" + innaKwota + " tytul=" + tytul);
		karty.wybierzKarty();
		helpers.waitUntilReady(this.splata);
		this.splata.click();
		helpers.waitUntilReady(this.rachunekKarty);
		this.rachunekKarty.click();
		helpers.wybierzElementZListyPoTekscie('cardItem in $select.items track by $index', rachunekKarty);
		helpers.waitUntilReady(this.numerRachunku);
		this.numerRachunku.click();
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by $index', rachunekNadawcy);
		if (typSplaty == "Minimalna") {
			helpers.waitUntilReady(this.typSplatyMinimalna);
			this.typSplatyMinimalna.click();
		}
		if (typSplaty == "Całkowita") {
			helpers.waitUntilReady(this.typSplatyCalkowita);
			this.typSplatyCalkowita.click();
		}
		if (typSplaty == "Aktualne saldo") {
			helpers.waitUntilReady(this.typSplatyAktualneSaldo);
			this.typSplatyAktualneSaldo.click();
		}
		if (typSplaty == "Inna") {
			helpers.waitUntilReady(this.typSplatyInna);
			this.typSplatyInna.click();
			helpers.waitUntilReady(this.innaKwota);
			this.innaKwota.click();
			this.innaKwota.sendKeys(innaKwota);
		}
		helpers.waitUntilReady(this.tytulem);
		this.tytulem.clear();
		this.tytulem.sendKeys(tytul);
		helpers.waitUntilReady(this.dalej);
		this.dalej.click();
		//strona 2
		helpers.waitUntilReady(this.numerRachunkuKartyPotwierdzenie);
		expect(this.numerRachunkuKartyPotwierdzenie.getText()).toContain('Numer rachunku karty');
		expect(this.numerRachunkuKartyPotwierdzenie.getText()).toContain(rachunekKarty);
		expect(this.numerRachunkuPotwierdzenie.getText()).toContain('Numer rachunku');
		expect(this.numerRachunkuPotwierdzenie.getText()).toContain(rachunekNadawcy);
		expect(this.kwotaPotwierdzenie.getText()).toContain('Kwota');
		expect(this.tytulemPotwierdzenie.getText()).toEqual('Tytułem\n' + tytul);
		// expect(this.dataRealizacjiPotwierdzenie.getText()).toContain('Data realizacji');
		helpers.waitUntilReady(this.zatwierdz);
		this.zatwierdz.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
		});
		helpers.waitUntilReady(this.potwierdzenie);
		expect(this.potwierdzenie.getText()).not.toContain("odrzuc");
	};


};
module.exports = new cards();