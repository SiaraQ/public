var payments = function() {
	var helpers = require('../pageObjects/helpers.js');
	var buttons = require('../pageObjects/buttons.js');
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
	var odbiorcyZdefiniowani = element(by.css('[ui-sref="payments.recipients.list"]'));
	//label="Odbiorcy zdefiniowani"
	// var nowyOdbiorca = element(by.css('[ng-click="onRecipientCreate()"]'));
	var nowyOdbiorca = buttons.nowyOdbiorca;
	var szukajOdbiorcy = element(by.model('table.operationTitle'));
	var szukaj = element(by.css('[ng-click="table.tableControl.invalidate()"]'));
	var typOdbiorcy = element(by.model('types.currentType'));
	var zRachunku = element(by.model('selection.account'));
	var twojaNazwaOdbiorcy = element(by.model('recipient.formData.customName'));
	var numerRachunku= element(by.model('selection.model'));
	var nipPlatnikaf = element(by.model('recipient.formData.nip'));
	var typDrugiegoIdentyfikatora= element(by.model('recipient.formData.secondaryIdType'));
	var drugiIdentyfikator= element(by.model('recipient.formData.secondaryIdNo'));
	var typWplatyf= element(by.model('recipient.formData.paymentType'));
	//strona2
	var rachunekOpis = element(by.css('[label="Z rachunku"]'));
	var twojaNazwaOdbiorcyOpis = element(by.css('[label="Twoja nazwa odbiorcy"]'));
	var numerRachunkuOpis = element(by.css('[label="Numer rachunku"]'));
	var daneOdbiorcyOpis = element(by.css('[label="Nazwa i adres"]'));
	var nipOpis = element(by.css('[label="NIP płatnika"]'));
	var typDrugiegoIdentyfikatoraOpis = element(by.css('[label="Typ drugiego identyfikatora"]'));
	var drugiIdentyfikatorOpis = element(by.css('[label="Drugi identyfikator"]'));
	var typWplatyOpis = element(by.css('[label="Typ wpłaty"]'));
	//po wyszukaniu odbiorcy 
	var pierwszyElementwTabeli = element(by.css('[bd-table-cell="first"]'));
	var edytuj = buttons.edytuj;
	var usun = buttons.usun;
	var TytulKomunikat = element(by.id('description'));
	var daneOdbiorcyKomunikat = element(by.id('recipientData'));
	var twojaNazwaOdbiorcyKomunikat = element(by.id('customName'));
	var numerRachunkuKomunikat = element(by.css('[eb-name="recipientAccountNo"]')).element(by.id('recipientAccountNo'));

	this.sprawdzDaneOdbiorcy = function(rachunekNadawcy, nazwaOdbiorcy, rachunekOdbiorcy, daneOdbiorcy, tytulPrzelewu) {
		rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		rachunekOdbiorcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekOdbiorcy);
		expect(orachunekOpis.getText()).toEqual('Z RACHUNKU\n' + rachunekNadawcy);
		expect(otwojaNazwaOdbiorcyOpis.getText()).toEqual('TWOJA NAZWA ODBIORCY\n' + nazwaOdbiorcy);
		expect(onumerRachunkuOpis.getText()).toEqual('NUMER RACHUNKU\n' + rachunekOdbiorcy);
		expect(odaneOdbiorcyOpis.getText()).toEqual('NAZWA I ADRES\n' + daneOdbiorcy);
		expect(otytulOpis.getText()).toEqual('TYTUŁEM\n' + tytulPrzelewu);
	}

	this.sprawdzDaneOdbiorcyStronaDruga = function(rachunekNadawcy, nazwaOdbiorcy, rachunekOdbiorcy, daneOdbiorcy, tytulPrzelewu) {
		rachunekOdbiorcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekOdbiorcy);
		expect(orachunekOpis.getText()).toContain('Z rachunku');
		expect(otwojaNazwaOdbiorcyOpis.getText()).toEqual('Twoja nazwa odbiorcy\n' + nazwaOdbiorcy);
		expect(onumerRachunkuOpis.getText()).toEqual('Numer rachunku\n' + rachunekOdbiorcy);
		expect(odaneOdbiorcyOpis.getText()).toEqual('Nazwa i adres\n' + daneOdbiorcy);
		expect(otytulOpis.getText()).toContain('Tytułem');
		// expect(otytulOpis.getText()).toContain(tytulPrzelewu);
	}

	this.dodajOdbiorceZUS = function(rachunekNadawcy, nazwaOdbiorcy, rachunekOdbiorcy, nipPlatnika, typDrugiegoIdentyf, drugiIdentyf, typWplaty, hasloSms) {
		var random = Math.random();
		if (hasloSms == "") {
			hasloSms = '1111';
		}
		if (nazwaOdbiorcy == "") {
			nazwaOdbiorcy = "nazwaOdbiorcy" + random;
		}
		if (rachunekOdbiorcy == "") {
			rachunekOdbiorcy = "Ubezpieczenie Społeczne";
		}
		if (nipPlatnika == "") {
			nipPlatnika = helpers.tworzNip();
		}
		if (typDrugiegoIdentyf == "") {
			typDrugiegoIdentyf = "PESEL";
		}
		if (drugiIdentyf == "") {
			drugiIdentyf = helpers.tworzPesel();
		}
		if (typWplaty == "") {
			typWplaty =  "S - Składka za jeden miesiąc";
		}
		var rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		winston.log('info', "Dane testu: rachunekNadawcy=" + rachunekNadawcy + " rachunekOdbiorcy=" + rachunekOdbiorcy + " daneOdbiorcy" + daneOdbiorcy + " tytulPrzelewu=" + tytulPrzelewu + " hasloSms=" + hasloSms);
		wybieranieOdbiorcy();
		browser.driver.sleep(2000);
		helpers.waitUntilReady(ozRachunku);
		zRachunku.click();
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountNo', rachunekNadawcy);
		helpers.waitUntilReady(otwojaNazwaOdbiorcy);
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
		helpers.waitUntilReady(odalej);
		dalej.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
		});
	//TODO 
		sprawdzDaneOdbiorcyStronaDruga(rachunekNadawcy, nazwaOdbiorcy, rachunekOdbiorcy, daneOdbiorcy, tytulPrzelewu);
		helpers.waitUntilReady(kodSms);
		kodSms.sendKeys(hasloSms);
		zatwierdz.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
		});
		helpers.waitUntilReady(potwierdzenie);
		expect(opotwierdzenie.getText()).not.toContain("Zlecenie odrzucone");
		expect(opotwierdzenie.getText()).not.toContain("odrzuc");
	};

	this.wyszukajOdbiorce = function(daneDoSzukania) {
		helpers.waitUntilReady(odbiorcyZdefiniowani);
		odbiorcyZdefiniowani.click();
		helpers.waitUntilReady(szukajOdbiorcy);
		szukajOdbiorcy.sendKeys(daneDoSzukania);
		helpers.waitUntilReady(szukaj);
		szukaj.click();
		helpers.waitUntilReady(pierwszyElementwTabeli);
		pierwszyElementwTabeli.click();
	}

	

};
module.exports = new payments();