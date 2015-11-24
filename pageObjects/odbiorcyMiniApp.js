var payments = function() {
	var helpers = require('../pageObjects/helpers.js');
	var buttons = require('../pageObjects/buttons.js');
	var mobileMenu = require('../pageObjects/mobileMenu.js');
	var winston = require('winston');
	var login = require('./loginPage.js');
	var deferred = protractor.promise.defer();
	var promise = deferred.promise;
	var params = browser.params;
	var platnosci = require('../pageObjects/platnosci.js');

	var oplatnosci = element(by.cssContainingText('.widget-tile__widget-header__title', 'Płatności'));
	var oplatnosci2 = element(by.css('[ui-sref="payments.recipients.list"]'));
	var oMojBank = element(by.css('[class="rb-header__menu__content"]')).element(by.css('[ui-sref="dashboard"]'));
	//powtarzalne
	var okodSms = element(by.model('rbModel.input.model'));
	var opotwierdzenie = element(by.css('[class="bd-msg-panel__message"]'));
	var odalej = buttons.dalej;
	var ozatwierdz = buttons.zatwierdz;
	//******** ODBIORCY
	var oodbiorcyZdefiniowani = element(by.css('[ui-sref="payments.recipients.list"]'));
	//label="Odbiorcy zdefiniowani"
	// var onowyOdbiorca = element(by.css('[ng-click="onRecipientCreate()"]'));
	var onowyOdbiorca = buttons.nowyOdbiorca;
	var oszukajOdbiorcy = element(by.model('table.operationTitle'));
	var oszukaj = element(by.css('[ng-click="table.tableControl.invalidate()"]'));
	var otypOdbiorcy = element(by.model('types.currentType'));
	var ozRachunku = element(by.model('selection.account'));
	var otwojaNazwaOdbiorcy = element(by.model('recipient.formData.customName'));
	var onumerRachunku = element(by.model('recipient.formData.recipientAccountNo'));
	var odaneOdbiorcy = element(by.model('recipient.formData.recipientData'));
	var otytul = element(by.model('recipient.formData.description'));
	//strona2
	var orachunekOpis = element(by.css('[label="Z rachunku"]'));
	var otwojaNazwaOdbiorcyOpis = element(by.css('[label="Twoja nazwa odbiorcy"]'));
	var onumerRachunkuOpis = element(by.css('[label="Numer rachunku"]'));
	var odaneOdbiorcyOpis = element(by.css('[label="Nazwa i adres"]'));
	var otytulOpis = element(by.css('[label="Tytułem"]'));
	//po wyszukaniu odbiorcy 
	var opierwszyElementwTabeli = element(by.css('[bd-table-cell="first"]'));
	var oedytuj = buttons.edytuj;
	var ousun = buttons.usun;
	var oTytulKomunikat = element(by.id('description'));
	var odaneOdbiorcyKomunikat = element(by.id('recipientData'));
	var otwojaNazwaOdbiorcyKomunikat = element(by.id('customName'));
	var onumerRachunkuKomunikat = element(by.css('[eb-name="recipientAccountNo"]')).element(by.id('recipientAccountNo'));

	this.wybieranieOdbiorcy = function() {
		if (params.page.mobile == 'true') {
			mobileMenu.kliknijPlatnosci();
		} else {
			helpers.waitUntilReady(oMojBank);
			oMojBank.click();
			helpers.waitUntilReady(oMojBank);
			login.kliknijWBaner();
			helpers.waitUntilReady(oplatnosci);
			oplatnosci.click();
			helpers.waitUntilReady(oodbiorcyZdefiniowani);
			oodbiorcyZdefiniowani.click();
		}
		helpers.waitUntilReady(onowyOdbiorca);
		onowyOdbiorca.click();
	};

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

	this.dodajOdbiorceKrajowego = function(rachunekNadawcy, nazwaOdbiorcy, rachunekOdbiorcy, daneOdbiorcy, tytulPrzelewu, hasloSms) {
		var random = Math.random();
		if (hasloSms == "") {
			hasloSms = '1111';
		}
		if (nazwaOdbiorcy == "") {
			nazwaOdbiorcy = "nazwaOdbiorcy" + random;
		}
		if (rachunekOdbiorcy == "") {
			rachunekOdbiorcy = helpers.losujRachunekBiezacyPL();
		}
		if (daneOdbiorcy == "") {
			daneOdbiorcy = "Kowalski Stanisław"
		}
		if (tytulPrzelewu == "") {
			tytulPrzelewu = "tytul" + random;
		}
		var rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		winston.log('info', "Dane testu: rachunekNadawcy=" + rachunekNadawcy + " rachunekOdbiorcy=" + rachunekOdbiorcy + " daneOdbiorcy" + daneOdbiorcy + " tytulPrzelewu=" + tytulPrzelewu + " hasloSms=" + hasloSms);
		this.this.wybieranieOdbiorcy();
		browser.driver.sleep(2000);
		helpers.waitUntilReady(ozRachunku);
		ozRachunku.click();
		platnosci.wybierzRachunekNadawcy(rachunekNadawcy);
		helpers.waitUntilReady(otwojaNazwaOdbiorcy);
		otwojaNazwaOdbiorcy.sendKeys(nazwaOdbiorcy);
		helpers.waitUntilReady(onumerRachunku);
		onumerRachunku.sendKeys(rachunekOdbiorcy);
		helpers.waitUntilReady(odaneOdbiorcy);
		odaneOdbiorcy.sendKeys(daneOdbiorcy);
		otytul.sendKeys(tytulPrzelewu);
		helpers.waitUntilReady(odalej);
		odalej.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
		});
		osprawdzDaneOdbiorcyStronaDruga(rachunekNadawcy, nazwaOdbiorcy, rachunekOdbiorcy, daneOdbiorcy, tytulPrzelewu);
		helpers.waitUntilReady(okodSms);
		okodSms.sendKeys(hasloSms);
		ozatwierdz.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
		});
		helpers.waitUntilReady(opotwierdzenie);
		expect(opotwierdzenie.getText()).not.toContain("Zlecenie odrzucone");
		expect(opotwierdzenie.getText()).not.toContain("odrzuc");
	};

	this.wyszukajOdbiorce = function(daneDoSzukania) {
		helpers.waitUntilReady(oodbiorcyZdefiniowani);
		oodbiorcyZdefiniowani.click();
		helpers.waitUntilReady(oszukajOdbiorcy);
		oszukajOdbiorcy.sendKeys(daneDoSzukania);
		helpers.waitUntilReady(oszukaj);
		oszukaj.click();
		helpers.waitUntilReady(opierwszyElementwTabeli);
		opierwszyElementwTabeli.click();
	}

	this.edytujOdbiorce = function(rachunekNadawcy, nazwaOdbiorcy, rachunekOdbiorcy, daneOdbiorcy, tytulPrzelewu, hasloSms) {
		var random = Math.random();
		if (hasloSms == "") {
			hasloSms = "1111";
		}
		if (nazwaOdbiorcy == "") {
			nazwaOdbiorcy = "2nazwaOdbiorcy" + random;
		}
		if (rachunekOdbiorcy == "") {
			rachunekOdbiorcy = helpers.losujRachunekBiezacyPL();
		}
		if (daneOdbiorcy == "") {
			daneOdbiorcy = "2Kowalski Stanisław"
		}
		if (tytulPrzelewu == "") {
			tytulPrzelewu = "2tytul" + random;
		}
		var rachunekNadawcyNew = "";
		var nazwaOdbiorcyNew = "2nazwaOdbiorcy" + random;
		var rachunekOdbiorcyNew = "";
		var daneOdbiorcyNew = "";
		var tytulPrzelewuNew = "";
		this.dodajOdbiorceKrajowego(rachunekNadawcyNew, nazwaOdbiorcyNew, rachunekOdbiorcyNew, daneOdbiorcyNew, tytulPrzelewuNew, hasloSms);
		owyszukajOdbiorce(nazwaOdbiorcyNew);
		oedytuj.click();
		helpers.waitUntilReady(otwojaNazwaOdbiorcy);
		otwojaNazwaOdbiorcy.clear();
		otwojaNazwaOdbiorcy.sendKeys(nazwaOdbiorcy);
		helpers.waitUntilReady(onumerRachunku);
		onumerRachunku.clear();
		onumerRachunku.sendKeys(rachunekOdbiorcy);
		helpers.waitUntilReady(odaneOdbiorcy);
		odaneOdbiorcy.clear();
		odaneOdbiorcy.sendKeys(daneOdbiorcy);
		helpers.waitUntilReady(otytul);
		otytul.clear();
		otytul.sendKeys(tytulPrzelewu);
		helpers.waitUntilReady(odalej);
		odalej.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
		});
		osprawdzDaneOdbiorcyStronaDruga(rachunekNadawcy, nazwaOdbiorcy, rachunekOdbiorcy, daneOdbiorcy, tytulPrzelewu);
		helpers.waitUntilReady(okodSms);
		okodSms.sendKeys(hasloSms);
		ozatwierdz.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
		});
		helpers.waitUntilReady(opotwierdzenie);
		expect(opotwierdzenie.getText()).not.toContain("Zlecenie odrzucone");
		expect(opotwierdzenie.getText()).not.toContain("odrzuc");
	}

	this.usunOdbiorce = function(rachunekNadawcyNew) {
		var random = Math.random();
		var hasloSms = '1111';
		var nazwaOdbiorcyNew = "nazwaOdbiorcy" + random;
		var rachunekOdbiorcyNew = helpers.losujRachunekBiezacyPL();
		var daneOdbiorcyNew = "Kowalski Stanisław"
		var tytulPrzelewuNew = "tytul" + random;

		this.dodajOdbiorceKrajowego(rachunekNadawcyNew, nazwaOdbiorcyNew, rachunekOdbiorcyNew, daneOdbiorcyNew, tytulPrzelewuNew, hasloSms);
		owyszukajOdbiorce(nazwaOdbiorcyNew);
		// osprawdzDaneOdbiorcy(rachunekNadawcyNew,nazwaOdbiorcyNew,rachunekOdbiorcyNew,daneOdbiorcyNew,tytulPrzelewuNew);
		ousun.click();
		osprawdzDaneOdbiorcyStronaDruga(rachunekNadawcyNew, nazwaOdbiorcyNew, rachunekOdbiorcyNew, daneOdbiorcyNew, tytulPrzelewuNew);
		helpers.waitUntilReady(okodSms);
		okodSms.sendKeys(hasloSms);
		ousun.click();
		helpers.waitUntilReady(opotwierdzenie);
		expect(opotwierdzenie.getText()).not.toContain("Zlecenie odrzucone");
		expect(opotwierdzenie.getText()).not.toContain("odrzuc");
	}

	this.dodajOdbiorceKrajowegoWalidacjaNazwaOdbiorcy = function() {
		this.wybieranieOdbiorcy();
		helpers.waitUntilReady(otwojaNazwaOdbiorcy);
		otwojaNazwaOdbiorcy.sendKeys('123456789012345678901234567890123456');
		helpers.waitUntilReady(otwojaNazwaOdbiorcyKomunikat);
		expect(otwojaNazwaOdbiorcyKomunikat.getText()).toEqual('Pole Nazwa skrócona odbiorcy nie może być dłuższe niż 35 znaków i powinno zawierać tylko litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \' , /');
		otwojaNazwaOdbiorcy.clear();
		otwojaNazwaOdbiorcy.sendKeys('=');
		expect(otwojaNazwaOdbiorcyKomunikat.getText()).toEqual('Pole Nazwa skrócona odbiorcy nie może być dłuższe niż 35 znaków i powinno zawierać tylko litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \' , /');
		otwojaNazwaOdbiorcy.clear();
		expect(otwojaNazwaOdbiorcyKomunikat.getText()).toEqual('Nazwa skrócona odbiorcy nie może być pusta');
		otwojaNazwaOdbiorcy.clear();

	};

	this.dodajOdbiorceKrajowegoWalidacjaNumerRachunku = function() {
		this.wybieranieOdbiorcy();
		helpers.waitUntilReady(onumerRachunku);
		onumerRachunku.sendKeys('83101010230000261395100000');
		helpers.waitUntilReady(onumerRachunkuKomunikat);
		expect(onumerRachunkuKomunikat.getText()).toEqual('Rachunek odbiorcy nie może być rachunkiem ZUS.');
		onumerRachunku.clear();
		onumerRachunku.sendKeys('12');
		expect(onumerRachunkuKomunikat.getText()).toEqual('Rachunek odbiorcy musi być zgodny z formatem NRB [CCBBBBBBBBAAAAAAAAAAAAAAAA lub CC BBBB BBBB AAAA AAAA AAAA AAAA]');
		onumerRachunku.clear();
		expect(onumerRachunkuKomunikat.getText()).toEqual('Rachunek odbiorcy nie może być pusty');
		onumerRachunku.clear();

	};

	this.dodajOdbiorceKrajowegoWalidacjaPolaDaneOdbiorcy = function() {
		this.wybieranieOdbiorcy();
		helpers.waitUntilReady(odaneOdbiorcy);
		odaneOdbiorcy.sendKeys('123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901');
		expect(odaneOdbiorcyKomunikat.getText()).toEqual('Dane odbiorcy nie mogą przekraczać 132 znaków i powinny zawierać wyłącznie litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \'  , /');
		odaneOdbiorcy.clear();
		odaneOdbiorcy.sendKeys('=');
		expect(odaneOdbiorcyKomunikat.getText()).toEqual('Dane odbiorcy nie mogą przekraczać 132 znaków i powinny zawierać wyłącznie litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \'  , /');
		odaneOdbiorcy.clear();
		expect(odaneOdbiorcyKomunikat.getText()).toEqual('Dane odbiorcy nie mogę być puste');
		odaneOdbiorcy.clear();

	};

	this.dodajOdbiorceKrajowegoWalidacjaPolaTytul = function() {
		this.wybieranieOdbiorcy();
		helpers.waitUntilReady(otytul);
		otytul.sendKeys('123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901');
		expect(oTytulKomunikat.getText()).toEqual('Dane odbiorcy mogą składać się maskymalnie ze 140 znaków');
		otytul.clear();
		otytul.sendKeys('=');
		// expect(oTytulKomunikat.getText()).toEqual('Tytuł przelewu nie może przekraczać 132 znaków i powinien zawierać wyłącznie litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \'  , /');
		expect(oTytulKomunikat.getText()).toContain('Tytuł przelewu nie może przekraczać 132 znaków i powinien zawierać wyłącznie litery, cyfry oraz znaki');
		expect(oTytulKomunikat.getText()).toContain('! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ?');
		otytul.clear();
		expect(oTytulKomunikat.getText()).toEqual('Tytuł przelewu nie może być pusty');
		otytul.clear();

	};

};
module.exports = new payments();