var odbiorcyUs = function() {
	var helpers = require('../pageObjects/helpers.js');
	var buttons = require('../pageObjects/buttons.js');
	var odbiorcy = require('../pageObjects/odbiorcyMiniApp.js');
	var mobileMenu = require('../pageObjects/mobileMenu.js');
	var winston = require('winston');
	var login = require('./loginPage.js');
	var deferred = protractor.promise.defer();
	var promise = deferred.promise;
	var params = browser.params;

	var platnosci = element(by.cssContainingText('.widget-tile__widget-header__title', 'Płatności'));
	var platnosci2 = element(by.css('[ui-sref="payments.recipients.list"]'));
	var MojBank = element(by.css('[class="rb-header__menu__content"]')).element(by.css('[ui-sref="dashboard"]'));
	//powtarzalne
	var kodSms = element(by.model('rbModel.input.model'));
	var potwierdzenie = element(by.css('[class="bd-msg-panel__message"]'));
	var dalej = buttons.dalej;
	var zatwierdz = buttons.zatwierdz;
	//******** ODBIORCY
	var typPlatnosci = element(by.model('recipient.type'));
	var odbiorcyZdefiniowani = element(by.css('[ui-sref="payments.recipients.list"]'));
	var nowyOdbiorca = buttons.nowyOdbiorca;
	var szukajOdbiorcy = element(by.model('table.operationTitle'));
	var szukaj = element(by.css('[ng-click="table.tableControl.invalidate()"]'));
	var typOdbiorcy = element(by.model('types.currentType'));
	var zRachunku = element(by.model('selection.account'));
	var twojaNazwaOdbiorcy = element(by.model('recipient.formData.customName'));
	var rachunekUrzeduSkarb = element(by.name('recipientAccountNo'));
	var typIdentyfUzup = element(by.model('recipient.formData.secondaryIdType'));
	var numerIdentUzup = element(by.model('recipient.formData.idNumber'));
	var symbolForm = element(by.name('formSymbol'));
	var typOkr = element(by.model('recipient.formData.periodType'));
	var identyfZobow = element(by.model('recipient.formData.obligationId'));	
	//strona2
	var rachunekOpis = element(by.css('[label="Z rachunku"]'));
	var twojaNazwaOdbiorcyOpis = element(by.css('[label="Twoja nazwa odbiorcy"]'));
	var numerRachunkuOpis = element(by.css('[label="Numer rachunku"]'));
	var typIdentyfikatoraUzupelniajacegoOpis = element(by.css('[label="Typ identyfikatora uzupełniającego"]'));
	var numerIdentyfikatoraUzupelniajacegoOpis = element(by.css('[label="Numer identyfikatora uzupełniającego"]'));
	var symbolFormularzaOpis = element(by.css('[label="Symbol formularza"]'));
	var typOkresuOpis = element(by.css('[label="Typ okresu"]'));
	var identyfikacjaZobowiazaniaOpis = element(by.css('[label="Identyfikacja zobowiązania"]'));
	//po wyszukaniu odbiorcy 
	var pierwszyElementwTabeli = element(by.css('[bd-table-cell="first"]'));
	var edytuj = buttons.edytuj;
	var usun = buttons.usun;

	this.sprawdzDaneOdbiorcyNaSczegolach = function(nazwaOdbiorcy, rachunekUrzeduSkarbowego, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, symbolFormularza, typOkresu) {
		numerRachunku = helpers.zamienRachunekNaNrbZeSpacjami(rachunekUrzeduSkarbowego);
		expect(twojaNazwaOdbiorcyOpis.getText()).toEqual('Twoja nazwa odbiorcy\n' + nazwaOdbiorcy);
		expect(numerRachunkuOpis.getText()).toContain('Numer rachunku');
		expect(numerRachunkuOpis.getText()).toContain(numerRachunku);
		expect(typIdentyfikatoraUzupelniajacegoOpis.getText()).toEqual('Typ identyfikatora uzupełniającego\n' + typIdentyfikatoraUzupelniajacego);
		expect(numerIdentyfikatoraUzupelniajacegoOpis.getText()).toEqual('Numer identyfikatora uzupełniającego\n' + numerIdentyfikatoraUzupelniajacego);
		expect(symbolFormularzaOpis.getText()).toEqual('Symbol formularza\n' + symbolFormularza);
		expect(typOkresuOpis.getText()).toEqual('Typ okresu\n' + typOkresu);
	};

	this.sprawdzDaneOdbiorcyStronaDruga = function(rachunekNadawcy, nazwaOdbiorcy, rachunekUrzeduSkarbowego, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, symbolFormularza, typOkresu, identyfokacjaZobowiazania) {
		rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		numerRachunku = helpers.zamienRachunekNaNrbZeSpacjami(rachunekUrzeduSkarbowego);
		expect(rachunekOpis.getText()).toContain('Z rachunku');
		expect(rachunekOpis.getText()).toContain(rachunekNadawcy);
		expect(twojaNazwaOdbiorcyOpis.getText()).toEqual('Twoja nazwa odbiorcy\n' + nazwaOdbiorcy);
		expect(numerRachunkuOpis.getText()).toContain('Numer rachunku');
		expect(numerRachunkuOpis.getText()).toContain(numerRachunku);
		expect(typIdentyfikatoraUzupelniajacegoOpis.getText()).toEqual('Typ identyfikatora uzupełniającego\n' + typIdentyfikatoraUzupelniajacego);
		expect(numerIdentyfikatoraUzupelniajacegoOpis.getText()).toEqual('Numer identyfikatora uzupełniającego\n' + numerIdentyfikatoraUzupelniajacego);
		expect(symbolFormularzaOpis.getText()).toEqual('Symbol formularza\n' + symbolFormularza);
		expect(typOkresuOpis.getText()).toEqual('Typ okresu\n' + typOkresu);
		expect(identyfikacjaZobowiazaniaOpis.getText()).toEqual('Identyfikacja zobowiązania\n' + identyfokacjaZobowiazania);
	};


	this.dodajOdbiorceUS = function(rachunekNadawcy, nazwaOdbiorcy, rachunekUrzeduSkarbowego, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, symbolFormularza, typOkresu, identyfokacjaZobowiazania, hasloSms) {
		var random = Math.random();
		if (nazwaOdbiorcy === "") {
			nazwaOdbiorcy = "nazwaOdbiorcy" + random;
		}
		if ((symbolFormularza === "") && (typOkresu === "")) {
			if (typOkresu === "") typOkresu = "J - dzień";
		}
		if (typIdentyfikatoraUzupelniajacego === "") typIdentyfikatoraUzupelniajacego = "N - NIP";
		switch (typIdentyfikatoraUzupelniajacego) {
			case 'P - PESEL':
				if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = helpers.tworzPesel();
				break;
			case 'R - REGON':
				if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = helpers.tworzRegon();
				break;
			case '1 - Dowód osobisty':
				if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = helpers.tworzDowod();
				break;
			case '2 - Paszport':
				if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = "OD8008032";
				break;
			case '3 - Inny dokument tożsamości':
				if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = "Innydokument";
				break;
			default:
				//N - NIP;
				if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = helpers.tworzNip();
		}

		if (symbolFormularza === "") symbolFormularza = "CIT";
		if (identyfokacjaZobowiazania === "") identyfokacjaZobowiazania = "identfZ";
		if (hasloSms === "") hasloSms = '1111';
		if (rachunekUrzeduSkarbowego === "") rachunekUrzeduSkarbowego = '51 1010 1078 0024 1122 2100 0000';
		rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);

		// winston.log('info', "Dane testu: rachunekNadawcy=" + rachunekNadawcy + " nazwaOdbiorcy=" + nazwaOdbiorcy + " rachunekUrzeduSkarbowego" + rachunekUrzeduSkarbowego + " nipPlatnika=" + nipPlatnika + " hasloSms=" + hasloSms);
		odbiorcy.wybieranieOdbiorcy();
		helpers.waitUntilReady(typPlatnosci);
		typPlatnosci.click();
		helpers.wybierzElementZListyPoTekscie('recipientType in $select.items', 'US/IC');
		browser.driver.sleep(2000);
		helpers.waitUntilReady(zRachunku);
		zRachunku.click();
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountNo', rachunekNadawcy);
		helpers.waitUntilReady(twojaNazwaOdbiorcy);
		twojaNazwaOdbiorcy.sendKeys(nazwaOdbiorcy);
		helpers.waitUntilReady(rachunekUrzeduSkarb);
		rachunekUrzeduSkarb.sendKeys(rachunekUrzeduSkarbowego);
		typIdentyfUzup.click();
		helpers.wybierzElementZListyPoTekscie('supplementaryId in $select.items track by $index', typIdentyfikatoraUzupelniajacego);
		numerIdentUzup.sendKeys(numerIdentyfikatoraUzupelniajacego);
		symbolForm.click();
		helpers.wybierzElementZListyPoTekscie('formSymbol in $select.items track by $index', symbolFormularza);
		typOkr.click();
		helpers.wybierzElementZListyPoTekscie('periodTypeCode in $select.items track by $index', typOkresu);
		identyfZobow.sendKeys(identyfokacjaZobowiazania);
		helpers.waitUntilReady(dalej);
		dalej.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
		});
		this.sprawdzDaneOdbiorcyStronaDruga(rachunekNadawcy, nazwaOdbiorcy, rachunekUrzeduSkarbowego, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, symbolFormularza, typOkresu, identyfokacjaZobowiazania);
		helpers.waitUntilReady(kodSms);
		kodSms.sendKeys(hasloSms);
		zatwierdz.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
		});
		helpers.waitUntilReady(potwierdzenie);
		expect(potwierdzenie.getText()).not.toContain("Zlecenie odrzucone");
		expect(potwierdzenie.getText()).not.toContain("odrzuc");
	};

	this.edytujOdbiorceUS = function(rachunekNadawcy, nazwaOdbiorcy, rachunekUrzeduSkarbowego, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, symbolFormularza, typOkresu, identyfokacjaZobowiazania, hasloSms) {
		var random = Math.random();
		if (nazwaOdbiorcy === "") {
			nazwaOdbiorcy = "nazwaOdbiorcy" + random;
		}
		if ((symbolFormularza === "") && (typOkresu === "")) {
			if (typOkresu === "") typOkresu = "J - dzień";
		}
		if (typIdentyfikatoraUzupelniajacego === "") typIdentyfikatoraUzupelniajacego = "N - NIP";
		switch (typIdentyfikatoraUzupelniajacego) {
			case 'P - PESEL':
				if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = helpers.tworzPesel();
				break;
			case 'R - REGON':
				if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = helpers.tworzRegon();
				break;
			case '1 - Dowód osobisty':
				if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = helpers.tworzDowod();
				break;
			case '2 - Paszport':
				if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = "OD8008032";
				break;
			case '3 - Inny dokument tożsamości':
				if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = "Innydokument";
				break;
			default:
				//N - NIP;
				if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = helpers.tworzNip();
		}

		if (symbolFormularza === "") symbolFormularza = "CIT";
		if (identyfokacjaZobowiazania === "") identyfokacjaZobowiazania = "identfZ";
		if (hasloSms === "") hasloSms = '1111';
		if (rachunekUrzeduSkarbowego === "") rachunekUrzeduSkarbowego = '51 1010 1078 0024 1122 2100 0000';
		rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);

		// winston.log('info', "Dane testu: rachunekNadawcy=" + rachunekNadawcy + " nazwaOdbiorcy=" + nazwaOdbiorcy + " rachunekOdbiorcy" + rachunekOdbiorcy + " nipPlatnika=" + nipPlatnika + " hasloSms=" + hasloSms);
		var rachunekNadawcyNew = "";
		var nazwaOdbiorcyNew = "nazwaUNew" + random;
		var rachunekUrzeduSkarbowegoNew = "";
		var typIdentyfikatoraUzupelniajacegoNew = "";
		var numerIdentyfikatoraUzupelniajacegoNew = "";
		var symbolFormularzaNew = "";
		var typOkresuNew = "";
		var identyfokacjaZobowiazaniaNew = "";
		var hasloSmsNew = "";
		this.dodajOdbiorceUS(rachunekNadawcy, nazwaOdbiorcyNew, rachunekUrzeduSkarbowegoNew, typIdentyfikatoraUzupelniajacegoNew, numerIdentyfikatoraUzupelniajacegoNew, symbolFormularzaNew, typOkresuNew, identyfokacjaZobowiazaniaNew, hasloSmsNew);
		odbiorcy.wyszukajOdbiorce(nazwaOdbiorcyNew);
		this.sprawdzDaneOdbiorcyNaSczegolach(nazwaOdbiorcyNew, rachunekUrzeduSkarbowegoNew, typIdentyfikatoraUzupelniajacegoNew, numerIdentyfikatoraUzupelniajacegoNew, symbolFormularzaNew, typOkresuNew);
		edytuj.click();

		browser.driver.sleep(2000);
		helpers.waitUntilReady(zRachunku);
		zRachunku.click();
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountNo', rachunekNadawcy);
		helpers.waitUntilReady(twojaNazwaOdbiorcy);
		twojaNazwaOdbiorcy.sendKeys(nazwaOdbiorcy);
		helpers.waitUntilReady(rachunekUrzeduSkarb);
		rachunekUrzeduSkarb.sendKeys(rachunekUrzeduSkarbowego);
		typIdentyfUzup.click();
		helpers.wybierzElementZListyPoTekscie('supplementaryId in $select.items track by $index', typIdentyfikatoraUzupelniajacego);
		numerIdentUzup.sendKeys(numerIdentyfikatoraUzupelniajacego);
		symbolForm.click();
		helpers.wybierzElementZListyPoTekscie('formSymbol in $select.items track by $index', symbolFormularza);
		typOkr.click();
		helpers.wybierzElementZListyPoTekscie('periodTypeCode in $select.items track by $index', typOkresu);
		identyfZobow.sendKeys(identyfokacjaZobowiazania);
		helpers.waitUntilReady(dalej);
		dalej.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
		});
		this.sprawdzDaneOdbiorcyStronaDruga(rachunekNadawcy, nazwaOdbiorcy, rachunekUrzeduSkarbowego, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, symbolFormularza, typOkresu, identyfokacjaZobowiazania);
		helpers.waitUntilReady(kodSms);
		kodSms.sendKeys(hasloSms);
		zatwierdz.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
		});
		helpers.waitUntilReady(potwierdzenie);
		expect(potwierdzenie.getText()).not.toContain("Zlecenie odrzucone");
		expect(potwierdzenie.getText()).not.toContain("odrzuc");
	};

	this.usunOdbiorceUS = function(rachunekNadawcyNew) {
		var random = Math.random();
		var nazwaOdbiorcyNew = "nazwaUNew" + random;
		var rachunekUrzeduSkarbowegoNew = "";
		var typIdentyfikatoraUzupelniajacegoNew = "";
		var numerIdentyfikatoraUzupelniajacegoNew = "";
		var symbolFormularzaNew = "";
		var typOkresuNew = "";
		var identyfokacjaZobowiazaniaNew = "";
		var hasloSmsNew = "";
		var hasloSms = '1111';

		this.dodajOdbiorceUS(rachunekNadawcyNew, nazwaOdbiorcyNew, rachunekUrzeduSkarbowegoNew, typIdentyfikatoraUzupelniajacegoNew, numerIdentyfikatoraUzupelniajacegoNew, symbolFormularzaNew, typOkresuNew, identyfokacjaZobowiazaniaNew, hasloSmsNew);
		odbiorcy.wyszukajOdbiorce(nazwaOdbiorcyNew);
		this.sprawdzDaneOdbiorcyNaSczegolach(nazwaOdbiorcyNew, rachunekUrzeduSkarbowegoNew, typIdentyfikatoraUzupelniajacegoNew, numerIdentyfikatoraUzupelniajacegoNew, symbolFormularzaNew, typOkresuNew);
		usun.click();
		this.sprawdzDaneOdbiorcyStronaDruga(rachunekNadawcyNew, nazwaOdbiorcyNew, rachunekUrzeduSkarbowegoNew, typIdentyfikatoraUzupelniajacegoNew, numerIdentyfikatoraUzupelniajacegoNew, symbolFormularzaNew, typOkresuNew, identyfokacjaZobowiazaniaNew);
		helpers.waitUntilReady(kodSms);
		kodSms.sendKeys(hasloSms);
		usun.click();
		helpers.waitUntilReady(potwierdzenie);
		expect(potwierdzenie.getText()).not.toContain("Zlecenie odrzucone");
		expect(potwierdzenie.getText()).not.toContain("odrzuc");
	}


};
module.exports = new odbiorcyUs();