var cards = function () {
	var helpers = require('../pageObjects/helpers.js');
	var winston = require('winston');

	this.karty = element(by.cssContainingText('.widget-tile__widget-header__title', 'Karty'));
	this.zmienLimity = element(by.css('[ui-sref="cards.limits.fill"]'));
	this.szczegoly = element(by.buttonText('Szczegóły'));
	this.dalej = element(by.buttonText('Dalej'));
	this.zatwierdz = element(by.buttonText('Zatwierdź'));
	this.potwierdzenie=element(by.css('[class="bd-msg-panel__message"]'));
	this.usun=element(by.buttonText('Usuń'));
	this.kodSms = element(by.model('rbAuth.value'));
	//Limity karty
	this.nazwaKarty = element(by.model('cardContext.item.card'));
	this.liczbaTransakcjiBezgot = element(by.model('cardContext.item.cardDetails.cardDetails.dailyTrxLimitCount'));
	this.kwotaTransakcjiBezgot= element(by.model('cardContext.item.cardDetails.cardDetails.dailyTrxLimit'));
	this.liczbaTransakcjiGot = element(by.model('cardContext.item.cardDetails.cardDetails.dailyCashLimitCount'));
	this.kwotaTransakcjiGot = element(by.model('cardContext.item.cardDetails.cardDetails.dailyCashLimit'));
	//Limity karty strona 2
	this.numerKartyPotwierdzenie = element(by.css('[label="Numer karty"]'));
	this.numerRachunkuPotwierdzenie = element(by.css('[label="Numer rachunku"]'));
	this.liczbaTransakcjiBezgotPotwierdzenie = element(by.css('[label="Liczba transakcji bezgotówkowych"]'));
	this.kwotaTransakcjiBezgotPotwierdzenie = element(by.css('[label="Kwota transakcji bezgotówkowych"]'));
	this.liczbaTransakcjiGotPotwierdzenie = element(by.css('[label="Liczba transakcji gotówkowych"]'));
	this.kwotaTransakcjiGotPotwierdzenie = element(by.css('[label="Kwota transakcji gotówkowych"]'));

	this.zmienLimit = function (numerKartyCaly,liczbaTransakcjiBezgot,kwotaTransakcjiBezgot,liczbaTransakcjiGot,kwotaTransakcjiGot,hasloSms) {
		if (liczbaTransakcjiBezgot=="") liczbaTransakcjiBezgot="1"
		if (kwotaTransakcjiBezgot=="") kwotaTransakcjiBezgot="150"
		if (liczbaTransakcjiGot=="") liczbaTransakcjiGot="2"
		if (kwotaTransakcjiGot=="") kwotaTransakcjiGot="250"
		if (hasloSms=="") hasloSms="1111"
		var numerKarty=helpers.zamienRachunekKarty(numerKartyCaly);
		winston.log('info', "Dane testu: numerKarty="+numerKarty+"= liczbaTransakcjiBezgot="+liczbaTransakcjiBezgot+" kwotaTransakcjiBezgot="+kwotaTransakcjiBezgot);
		winston.log('info', "Dane testu: liczbaTransakcjiGot="+liczbaTransakcjiGot+" kwotaTransakcjiGot="+kwotaTransakcjiGot);
		helpers.waitUntilReady(this.karty);
		this.karty.click();
		helpers.waitUntilReady(this.zmienLimity);
		this.zmienLimity.click();
		helpers.waitUntilReady(this.nazwaKarty);
		this.nazwaKarty.click();

		// ng-repeat="cardItem in $select.items track by $index"
		helpers.wybierzElementZListyPoTekscie('cardItem in $select.items track by $index',numerKarty);
		helpers.waitUntilReady(this.liczbaTransakcjiBezgot);
		this.liczbaTransakcjiBezgot.clear();
		this.liczbaTransakcjiBezgot.sendKeys(liczbaTransakcjiBezgot);
		this.kwotaTransakcjiBezgot.clear();
		this.kwotaTransakcjiBezgot.sendKeys(kwotaTransakcjiBezgot);
		this.liczbaTransakcjiGot.clear();
		this.liczbaTransakcjiGot.sendKeys(liczbaTransakcjiGot);
		this.kwotaTransakcjiGot.clear();
		this.kwotaTransakcjiGot.sendKeys(kwotaTransakcjiGot);
		helpers.waitUntilReady(this.dalej);
		this.dalej.click();
		helpers.waitUntilReady(this.numerKartyPotwierdzenie);
		//strona 2
		expect(this.numerKartyPotwierdzenie.getText()).toEqual('Numer karty\n'+numerKarty);
		expect(this.numerRachunkuPotwierdzenie.getText()).toContain('Numer rachunku');
		expect(this.liczbaTransakcjiBezgotPotwierdzenie.getText()).toEqual('Liczba transakcji bezgotówkowych\n'+liczbaTransakcjiBezgot);
		expect(this.kwotaTransakcjiBezgotPotwierdzenie.getText()).toEqual('Kwota transakcji bezgotówkowych\n'+kwotaTransakcjiBezgot);
		expect(this.liczbaTransakcjiGotPotwierdzenie.getText()).toEqual('Liczba transakcji gotówkowych\n'+liczbaTransakcjiGot);
		expect(this.kwotaTransakcjiGotPotwierdzenie.getText()).toEqual('Kwota transakcji gotówkowych\n'+kwotaTransakcjiGot);
		helpers.waitUntilReady(this.kodSms);
		this.kodSms.sendKeys(hasloSms);
		this.zatwierdz.click().then(function(){
				winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
			});
		helpers.waitUntilReady(this.potwierdzenie);
		expect(this.potwierdzenie.getText()).not.toContain("odrzuc");
		expect(this.potwierdzenie.getText()).not.toContain("nie");
	};



};
module.exports = new cards();