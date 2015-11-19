var odbiorcyZus = function() {
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
	var numerRachunku = element(by.model('selection.model'));
	var nipPlatnikaf = element(by.model('recipient.formData.nip'));
	var typDrugiegoIdentyfikatora = element(by.model('recipient.formData.secondaryIdType'));
	var drugiIdentyfikator = element(by.model('recipient.formData.secondaryIdNo'));
	var typWplatyf = element(by.model('recipient.formData.paymentType'));
	//strona2
	var rachunekOpis = element(by.css('[label="Z rachunku"]'));
	var twojaNazwaOdbiorcyOpis = element(by.css('[label="Twoja nazwa odbiorcy"]'));
	var numerRachunkuOpis = element(by.css('[label="Numer rachunku"]'));
	var nipOpis = element(by.css('[label="NIP płatnika"]'));
	var typDrugiegoIdentyfikatoraOpis = element(by.css('[label="Typ drugiego identyfikatora"]'));
	var drugiIdentyfikatorOpis = element(by.css('[label="Drugi identyfikator"]'));
	var typWplatyOpis = element(by.css('[label="Typ wpłaty"]'));
	//po wyszukaniu odbiorcy 
	var pierwszyElementwTabeli = element(by.css('[bd-table-cell="first"]'));
	var edytuj = buttons.edytuj;
	var usun = buttons.usun;

	this.sprawdzDaneOdbiorcyNaSczegolach = function(twojaNazwaOdbiorcy, numerRachunku, nip, typDrugiegoIdentyfikatora, drugiIdentyfikator, typWplaty) {
		numerRachunku = helpers.zamienRachunekNaNrbZeSpacjami(numerRachunku);
		expect(twojaNazwaOdbiorcyOpis.getText()).toEqual('TWOJA NAZWA ODBIORCY\n' + twojaNazwaOdbiorcy);
		expect(numerRachunkuOpis.getText()).toEqual('NUMER RACHUNKU\n' + numerRachunku);
		expect(nipOpis.getText()).toEqual('NIP PŁATNIKA\n' + nip);
		expect(typDrugiegoIdentyfikatoraOpis.getText()).toEqual('TYP DRUGIEGO IDENTYFIKATORA\n' + typDrugiegoIdentyfikatora);
		expect(drugiIdentyfikatorOpis.getText()).toEqual('DRUGI IDENTYFIKATOR\n' + drugiIdentyfikator);
		expect(typWplatyOpis.getText()).toEqual('DRUGI IDENTYFIKATOR\n' + typWplaty);
	};

	this.sprawdzDaneOdbiorcyStronaDruga = function(rachunek, twojaNazwaOdbiorcy, numerRachunku, nip, typDrugiegoIdentyfikatora, drugiIdentyfikator, typWplaty) {
		rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunek);
		numerRachunku = helpers.zamienRachunekNaNrbZeSpacjami(numerRachunku);
		expect(rachunekOpis.getText()).toContain('Z rachunku');
		expect(rachunekOpis.getText()).toContain(rachunekNadawcy);
		expect(twojaNazwaOdbiorcyOpis.getText()).toEqual('Twoja nazwa odbiorcy\n' + twojaNazwaOdbiorcy);
		expect(numerRachunkuOpis.getText()).toContain('Numer rachunku');
		expect(numerRachunkuOpis.getText()).toContain(numerRachunku);
		expect(nipOpis.getText()).toEqual('NIP płatnika\n' + nip);
		expect(typDrugiegoIdentyfikatoraOpis.getText()).toContain('Typ drugiego identyfikatora');
		expect(typDrugiegoIdentyfikatoraOpis.getText()).toContain(typDrugiegoIdentyfikatora);
		expect(drugiIdentyfikatorOpis.getText()).toContain('Drugi identyfikator\n' + drugiIdentyfikator);
		expect(typWplatyOpis.getText()).toContain('Typ wpłaty\n' + typWplaty);
	};

	this.dodajOdbiorceZUS = function(rachunekNadawcy, nazwaOdbiorcy, rachunekOdbiorcy, nipPlatnika, typDrugiegoIdentyf, drugiIdentyf, typWplaty, hasloSms) {
		var random = Math.random();
		if (hasloSms === "") {
			hasloSms = '1111';
		}
		if (nazwaOdbiorcy === "") {
			nazwaOdbiorcy = "nazwaOdbiorcy" + random;
		}
		if (rachunekOdbiorcy === "") {
			rachunekOdbiorcy = "Ubezpieczenie Społeczne";
		}
		if (nipPlatnika === "") {
			nipPlatnika = helpers.tworzNip();
		}
		if (typDrugiegoIdentyf === "") {
			typDrugiegoIdentyf = "PESEL";
		}
		if (drugiIdentyf === "") {
			drugiIdentyf = helpers.tworzPesel();
		}
		if (typWplaty === "") {
			typWplaty = "S - Składka za jeden miesiąc";
		}
		rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		winston.log('info', "Dane testu: rachunekNadawcy=" + rachunekNadawcy + " nazwaOdbiorcy=" + nazwaOdbiorcy + " rachunekOdbiorcy" + rachunekOdbiorcy + " nipPlatnika=" + nipPlatnika + " hasloSms=" + hasloSms);
		odbiorcy.wybieranieOdbiorcy();
		helpers.waitUntilReady(typPlatnosci);
		typPlatnosci.click();
		helpers.wybierzElementZListyPoTekscie('recipientType in $select.items', 'ZUS');
		browser.driver.sleep(2000);
		helpers.waitUntilReady(zRachunku);
		zRachunku.click();
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountNo', rachunekNadawcy);
		helpers.waitUntilReady(twojaNazwaOdbiorcy);
		twojaNazwaOdbiorcy.sendKeys(nazwaOdbiorcy);
		helpers.waitUntilReady(numerRachunku);
		numerRachunku.click();
		helpers.wybierzElementZListyPoTekscie('insuranceAccount in $select.items track by $index', rachunekOdbiorcy);
		nipPlatnikaf.sendKeys(nipPlatnika);
		typDrugiegoIdentyfikatora.click();
		helpers.wybierzElementZListyPoTekscie('supplementaryId in $select.items track by $index', typDrugiegoIdentyf);
		drugiIdentyfikator.sendKeys(drugiIdentyf);
		typWplatyf.click();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items track by $index', typWplaty);
		helpers.waitUntilReady(dalej);
		dalej.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
		});
		this.sprawdzDaneOdbiorcyStronaDruga(rachunekNadawcy, nazwaOdbiorcy, rachunekOdbiorcy, nipPlatnika, typDrugiegoIdentyf, drugiIdentyf, typWplaty);
		helpers.waitUntilReady(kodSms);
		kodSms.sendKeys(hasloSms);
		zatwierdz.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
		});
		helpers.waitUntilReady(potwierdzenie);
		expect(potwierdzenie.getText()).not.toContain("Zlecenie odrzucone");
		expect(potwierdzenie.getText()).not.toContain("odrzuc");
	};

	this.edytujOdbiorceZUS = function(rachunekNadawcy, nazwaOdbiorcy, rachunekOdbiorcy, nipPlatnika, typDrugiegoIdentyf, drugiIdentyf, typWplaty, hasloSms) {
		var random = Math.random();
		if (hasloSms === "") {
			hasloSms = '1111';
		}
		if (nazwaOdbiorcy === "") {
			nazwaOdbiorcy = "nazwaOdbiorcy" + random;
		}
		if (rachunekOdbiorcy === "") {
			rachunekOdbiorcy = "Ubezpieczenie Społeczne";
		}
		if (nipPlatnika === "") {
			nipPlatnika = helpers.tworzNip();
		}
		if (typDrugiegoIdentyf === "") {
			typDrugiegoIdentyf = "PESEL";
		}
		if (drugiIdentyf === "") {
			drugiIdentyf = helpers.tworzPesel();
		}
		if (typWplaty === "") {
			typWplaty = "S - Składka za jeden miesiąc";
		}
		rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		winston.log('info', "Dane testu: rachunekNadawcy=" + rachunekNadawcy + " nazwaOdbiorcy=" + nazwaOdbiorcy + " rachunekOdbiorcy" + rachunekOdbiorcy + " nipPlatnika=" + nipPlatnika + " hasloSms=" + hasloSms);
		
		var rachunekNadawcyNew = "";
		var nazwaOdbiorcyNew = "nazwaZNew" + random;
		var rachunekOdbiorcyNew = "";
		var nipPlatnikaNew = "";
		var typDrugiegoIdentyfNew = "";
		var drugiIdentyfNew = "";
		var typWplatyNew = "";
		var hasloSmsNew = "";
		this.dodajOdbiorceZUS(rachunekNadawcyNew, nazwaOdbiorcyNew, rachunekOdbiorcyNew, nipPlatnikaNew, typDrugiegoIdentyfNew, drugiIdentyfNew, typWplatyNew, hasloSmsNew);
		odbiorcy.wyszukajOdbiorce(nazwaOdbiorcyNew);
		this.sprawdzDaneOdbiorcyNaSczegolach(nazwaOdbiorcyNew, rachunekOdbiorcyNew, nipPlatnikaNew, typDrugiegoIdentyfNew, drugiIdentyfNew, typWplatyNew);
		edytuj.click();

		helpers.wybierzElementZListyPoTekscie('recipientType in $select.items', 'ZUS');
		browser.driver.sleep(2000);
		helpers.waitUntilReady(zRachunku);
		zRachunku.click();
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountNo', rachunekNadawcy);
		helpers.waitUntilReady(twojaNazwaOdbiorcy);
		twojaNazwaOdbiorcy.clear();
		twojaNazwaOdbiorcy.sendKeys(nazwaOdbiorcy);
		helpers.waitUntilReady(numerRachunku);
		numerRachunku.click();
		helpers.wybierzElementZListyPoTekscie('insuranceAccount in $select.items track by $index', rachunekOdbiorcy);
		nipPlatnikaf.sendKeys(nipPlatnika);
		typDrugiegoIdentyfikatora.click();
		helpers.wybierzElementZListyPoTekscie('supplementaryId in $select.items track by $index', typDrugiegoIdentyf);
		drugiIdentyfikator.sendKeys(drugiIdentyf);
		typWplatyf.click();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items track by $index', typWplaty);
		helpers.waitUntilReady(dalej);
		dalej.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
		});
		this.sprawdzDaneOdbiorcyStronaDruga(rachunekNadawcy, nazwaOdbiorcy, rachunekOdbiorcy, nipPlatnika, typDrugiegoIdentyf, drugiIdentyf, typWplaty);
		helpers.waitUntilReady(kodSms);
		kodSms.sendKeys(hasloSms);
		zatwierdz.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
		});
		helpers.waitUntilReady(potwierdzenie);
		expect(potwierdzenie.getText()).not.toContain("Zlecenie odrzucone");
		expect(potwierdzenie.getText()).not.toContain("odrzuc");
	};

	this.usunOdbiorceZUS = function(rachunekNadawcyNew) {
		var random = Math.random();

		var nazwaOdbiorcyNew = "nazwaZNew" + random;
		var rachunekOdbiorcyNew = "";
		var nipPlatnikaNew = "";
		var typDrugiegoIdentyfNew = "";
		var drugiIdentyfNew = "";
		var typWplatyNew = "";
		var hasloSmsNew = "";
		var hasloSms = '1111';

		this.dodajOdbiorceZUS(rachunekNadawcyNew, nazwaOdbiorcyNew, rachunekOdbiorcyNew, nipPlatnikaNew, typDrugiegoIdentyfNew, drugiIdentyfNew, typWplatyNew, hasloSmsNew);
		odbiorcy.wyszukajOdbiorce(nazwaOdbiorcyNew);
		this.sprawdzDaneOdbiorcyNaSczegolach(nazwaOdbiorcyNew, rachunekOdbiorcyNew, nipPlatnikaNew, typDrugiegoIdentyfNew, drugiIdentyfNew, typWplatyNew);
		usun.click();
		this.sprawdzDaneOdbiorcyStronaDruga(nazwaOdbiorcyNew, rachunekOdbiorcyNew, nipPlatnikaNew, typDrugiegoIdentyfNew, drugiIdentyfNew, typWplatyNew);
		helpers.waitUntilReady(kodSms);
		kodSms.sendKeys(hasloSms);
		usun.click();
		helpers.waitUntilReady(potwierdzenie);
		expect(potwierdzenie.getText()).not.toContain("Zlecenie odrzucone");
		expect(potwierdzenie.getText()).not.toContain("odrzuc");
	}

};
module.exports = new odbiorcyZus();