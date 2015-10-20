var cards = function () {
	var helpers = require('../pageObjects/helpers.js');
	var winston = require('winston');
	var karty = require('../pageObjects/kartyMiniApp.js');
	
	this.zastrzez = element(by.css('[ui-sref="cards.restrict.fill"]'));
	this.szczegoly = element(by.buttonText('Szczegóły'));
	this.dalej = element(by.buttonText('Dalej'));
	this.zatwierdz = element(by.buttonText('Zastrzeż'));
	this.potwierdzenie=element(by.css('[class="bd-msg-panel__message"]'));
	this.kodSms = element(by.model('rbAuth.value'));
	//splata karty
	this.numerKarty = element(by.model('cardContext.item.card'));
	this.numerRachunku = element(by.model('cardContext.item.accountFrom'));
	//DOSTEPNE SORKDI
	this.zgubionaKarta = element(by.repeater('reason in cardContext.meta.restrictReasons').row(0)).element(by.css('[class="bd-radio-option__marker"]'));
	this.skradzionaKarta = element(by.repeater('reason in cardContext.meta.restrictReasons').row(1)).element(by.css('[class="bd-radio-option__marker"]'));
	this.checkboxNowaKarta = element(by.model('cardContext.formData.sendNew'));
	//splata karty strona 2
	this.numerKartyPotwierdzenie = element(by.css('[label="Numer karty"]'));
	this.numerRachunkuPotwierdzenie = element(by.css('[label="Numer rachunku"]'));
	this.powodZastrzezeniaPotwierdzenie = element(by.css('[label="Powód zastrzeżenia"]'));
	this.checkboxNowaKartaPotwierdzenie = element(by.css('[label="Proszę o wydanie nowej karty w miejsce zastrzeżonej"]'));

	this.zastrzezenieKarty = function (powodZastrzezenia,numerKartyCaly,hasloSms) {

		if (powodZastrzezenia=="")	powodZastrzezenia="zgubiona karta";
		if (hasloSms=="")	hasloSms="1111";
		var numerKarty=helpers.zamienRachunekKarty(numerKartyCaly);
		winston.log('info', "Dane testu: numerKarty="+numerKartyCaly+" powodZastrzezenia="+powodZastrzezenia);

		karty.wybierzKarty();
		// browser.driver.sleep(12000);
			helpers.waitUntilReady(this.zastrzez);	
		this.zastrzez.click();
		// browser.driver.sleep(1000);
			helpers.waitUntilReady(this.numerKarty);	
		this.numerKarty.click();
		// browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoTekscie('cardItem in $select.items track by $index',numerKarty);
		// browser.driver.sleep(8000);
		if (powodZastrzezenia=="zgubiona karta") {
			helpers.waitUntilReady(this.zgubionaKarta);	
			this.zgubionaKarta.click();
		}
		if (powodZastrzezenia=="skradziona karta") {
			helpers.waitUntilReady(this.skradzionaKarta);	
			this.skradzionaKarta.click();
		}
			helpers.waitUntilReady(this.checkboxNowaKarta);	
		this.checkboxNowaKarta.click();
		// browser.driver.sleep(1000);
			helpers.waitUntilReady(this.dalej);	
		this.dalej.click();
		//strona 2
		expect(this.numerKartyPotwierdzenie.getText()).toEqual('Numer karty\n'+numerKarty);
		expect(this.numerRachunkuPotwierdzenie.getText()).toContain('Numer rachunku');
		expect(this.powodZastrzezeniaPotwierdzenie.getText()).toEqual('Powód zastrzeżenia\n'+powodZastrzezenia);
		expect(this.checkboxNowaKartaPotwierdzenie.getText()).toEqual('Proszę o wydanie nowej karty w miejsce zastrzeżonej\ntak');
		// browser.driver.sleep(1000);
			helpers.waitUntilReady(this.kodSms);	
		this.kodSms.sendKeys(hasloSms);
			helpers.waitUntilReady(this.zatwierdz);	
		this.zatwierdz.click().then(function(){
				winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
			});
		// browser.driver.sleep(1000);
			helpers.waitUntilReady(this.potwierdzenie);	
			expect(this.potwierdzenie.getText()).not.toContain("odrzuc");
	};

	
};
module.exports = new cards();