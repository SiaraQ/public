var cards = function () {
	var helpers = require('../pageObjects/helpers.js');
	var winston = require('winston');
	
	this.karty = element(by.cssContainingText('.widget-tile__widget-header__title', 'Karty'));
	this.szczegoly = element(by.buttonText('Szczegóły'));
	this.dalej = element(by.buttonText('Dalej'));
	this.zatwierdz = element(by.buttonText('Zatwierdź'));
	this.potwierdzenie=element(by.css('[class="bd-msg-panel__message"]'));
	this.usun=element(by.buttonText('Usuń'));
	//rachunek karty
	this.rachunekKarty = element(by.model('cardContext.item.card'));
	this.numerRachunku = element(by.model('cardContext.item.accountFrom'));
	//DOSTEPNE SORKDI
	// label="Dostępne środki"	//class="bd-item-property__value"
	this.typSplaty0 = element(by.repeater('type in cardContext.meta.repaymentType').row(0)).element(by.css('[class="bd-radio-option__marker"]'));
	this.typSplaty1 = element(by.repeater('type in cardContext.meta.repaymentType').row(1)).element(by.css('[class="bd-radio-option__marker"]'));
	this.typSplaty2 = element(by.repeater('type in cardContext.meta.repaymentType').row(2)).element(by.css('[class="bd-radio-option__marker"]'));
	this.typSplaty3 = element(by.repeater('type in cardContext.meta.repaymentType').row(3)).element(by.css('[class="bd-radio-option__marker"]'));
	//inna kwota
	this.innaKwota = element(by.model('cardContext.formData.otherAmount'));
	this.tytulem = element(by.model('cardContext.formData.transactionTitle'));
	//zastrzezenie karty
	// ui-sref="cards.restrict.fill"
	this.nazwaKarty = element(by.model('cardContext.item.card'));
	this.zgubionaKarta = element(by.repeater('reason in cardContext.meta.restrictReasons').row(0)).element(by.css('[class="bd-radio-option__marker"]'));
	this.skradzionaKarta = element(by.repeater('reason in cardContext.meta.restrictReasons').row(1)).element(by.css('[class="bd-radio-option__marker"]'));
	// Proszę o wydanie nowej karty w miejsce zastrzeżonej
	this.checkbox = element(by.model('cardContext.formData.sendNew"'));	
	this.sms = element(by.model('rbAuth.value"'));	
	//automatyczna splata
	this.automatycznaSplata=element(by.css('[ui-sref="cards.autorepayment"]'));
	this.nowaSplata = element(by.buttonText('Nowa spłata'));
	//automatyczna splata szczegoly
	this.numerRachunkuKartyOpis = element(by.css('[label="Numer rachunku karty"]'));
	this.numerRachunkuOpis = element(by.css('[label="Numer rachunku"]'));
	this.typSplatyOpis = element(by.css('[label="Typ spłaty"]'));

	this.splataCalkowita = element(by.repeater('type in cardContext.meta.autoRepaymentType').row(0)).element(by.css('[class="bd-radio-option__marker"]'));
	this.splataMinimalna = element(by.repeater('type in cardContext.meta.autoRepaymentType').row(1)).element(by.css('[class="bd-radio-option__marker"]'));
	

	this.dodanieAutomatycznejSplaty = function (rodzajSplaty,rachunekKarty,rachunekNadawcy) {
		winston.log('info', "Dane testu: rachunekKarty="+rachunekKarty+" rachunekNadawcy="+rachunekNadawcy);
		var rachunekKarty = helpers.zamienRachunekNaNrbZeSpacjami(rachunekKarty);
		var rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);

		helpers.waitUntilReady(this.karty);
		this.karty.click();
		helpers.waitUntilReady(this.automatycznaSplata);
		this.automatycznaSplata.click();
		helpers.waitUntilReady(this.nowaSplata);
		this.nowaSplata.click();
		helpers.waitUntilReady(this.rachunekKarty);
		this.rachunekKarty.click();
		browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoTekscie('cardItem in $select.items track by $index',rachunekKarty);
		helpers.waitUntilReady(this.potwierdzenie);
		this.numerRachunku.click();
		browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by $index',rachunekNadawcy);
		if (rodzajSplaty==1) {
			helpers.waitUntilReady(this.splataCalkowita);
			this.splataCalkowita.click();
		}
		if (rodzajSplaty==2) {
			helpers.waitUntilReady(this.splataMinimalna);
			this.splataMinimalna.click();
		}
		helpers.waitUntilReady(this.dalej);
		this.dalej.click();
		//strona 2
		helpers.waitUntilReady(this.numerRachunkuKartyOpis);
		expect(this.numerRachunkuKartyOpis.getText()).toContain('Numer rachunku karty');
		expect(this.numerRachunkuKartyOpis.getText()).toContain(rachunekKarty);
		expect(this.numerRachunkuOpis.getText()).toContain('Numer rachunku');
		expect(this.numerRachunkuOpis.getText()).toContain(rachunekNadawcy);
		if (rodzajSplaty==1) {
			expect(this.typSplatyOpis.getText()).toEqual('Typ spłaty\nSpłata całkowita');
		}
		if (rodzajSplaty==2) {
			expect(this.typSplatyOpis.getText()).toEqual('Typ spłaty\nSpłata minimalna');
		}
		helpers.waitUntilReady(this.zatwierdz);
		this.zatwierdz.click().then(function(){
				winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
			});
		helpers.waitUntilReady(this.numerRachunkuKartyOpis);
		expect(this.numerRachunkuKartyOpis.getText()).toEqual('Automatyczna spłata karty kredytowej została pomyślnie dodana');
	};

	this.usuniecieAutomatycznejSplaty = function (rodzajSplaty,rachunekKarty,rachunekNadawcy) {
		winston.log('info', "Dane testu: rachunekKarty="+rachunekKarty+" rachunekNadawcy="+rachunekNadawcy);
		helpers.waitUntilReady(this.automatycznaSplata);
		this.automatycznaSplata.click();
		helpers.waitUntilReady(this.usun);
		this.usun.click();
		helpers.waitUntilReady(this.numerRachunkuKartyOpis);
		//strona 2
		expect(this.numerRachunkuKartyOpis.getText()).toContain('Numer rachunku karty');
		expect(this.numerRachunkuKartyOpis.getText()).toContain(rachunekKarty);
		expect(this.numerRachunkuOpis.getText()).toContain('Numer rachunku');
		expect(this.numerRachunkuOpis.getText()).toContain(rachunekNadawcy);
		if (rodzajSplaty==1) {
			expect(this.typSplatyOpis.getText()).toEqual('Typ spłaty\nSpłata całkowita');
		}
		if (rodzajSplaty==2) {
			expect(this.typSplatyOpis.getText()).toEqual('Typ spłaty\nSpłata minimalna');
		}
		this.zatwierdz.click().then(function(){
				winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
			});
		helpers.waitUntilReady(this.potwierdzenie);
		expect(this.potwierdzenie.getText()).toEqual('Automatyczna spłata karty kredytowej została pomyślnie usunięta');
	};

	this.dodanieAutomatycznejSplatyCalkowitej = function (rachunekKarty,rachunekNadawcy) {
		this.dodanieAutomatycznejSplaty(1,rachunekKarty,rachunekNadawcy);
	};

	this.usuniecieAutomatycznejSplatyCalkowitej = function (rachunekKarty,rachunekNadawcy) {
		this.dodanieAutomatycznejSplatyCalkowitej(rachunekKarty,rachunekNadawcy);
		this.usuniecieAutomatycznejSplaty(1,rachunekKarty,rachunekNadawcy);
	};

	this.dodanieAutomatycznejSplatyMinimalnej= function (rachunekKarty,rachunekNadawcy) {
		this.dodanieAutomatycznejSplaty(2,rachunekKarty,rachunekNadawcy);
	};

	this.usuniecieAutomatycznejSplatyMinimalnej = function (rachunekKarty,rachunekNadawcy) {
		this.dodanieAutomatycznejSplatyMinimalnej(rachunekKarty,rachunekNadawcy);
		this.usuniecieAutomatycznejSplaty(2,rachunekKarty,rachunekNadawcy);
	};

};
module.exports = new cards();