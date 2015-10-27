var payments = function () {
	var helpers = require('../pageObjects/helpers.js');
	var buttons = require('../pageObjects/buttons.js');
	var winston = require('winston');
	var login = require('./loginPage.js');
	var deferred = protractor.promise.defer();
	var promise = deferred.promise;

	this.platnosci = element(by.cssContainingText('.widget-tile__widget-header__title', 'Płatności'));
	this.platnosci2 = element(by.css('[ui-sref="payments.recipients.list"]'));
	this.MojBank = element(by.css('[class="rb-header__menu__content"]')).element(by.css('[ui-sref="dashboard"]'));
	//powtarzalne
	this.kodSms = element(by.model('recipient.items.credentials'));
	this.potwierdzenie = element(by.css('[class="bd-msg-panel__message"]'));
	this.dalej = element(by.css('[ng-click="moveNext()"]'));
	this.zatwierdz = buttons.zatwierdz;
	//******** ODBIORCY
	this.odbiorcyZdefiniowani = element(by.css('[ui-sref="payments.recipients.list"]'));
	//label="Odbiorcy zdefiniowani"
	// this.nowyOdbiorca = element(by.css('[ng-click="onRecipientCreate()"]'));
	this.nowyOdbiorca = buttons.nowyOdbiorca;
	this.szukajOdbiorcy = element(by.model('table.operationTitle'));
	this.szukaj = element(by.css('[ng-click="table.tableControl.invalidate()"]'));
	this.typOdbiorcy = element(by.model('types.currentType'));
	this.zRachunku = element(by.model('selection.account'));
	this.twojaNazwaOdbiorcy = element(by.model('recipient.formData.customName'));
	this.numerRachunku = element(by.model('recipient.formData.recipientAccountNo'));
	this.daneOdbiorcy = element(by.model('recipient.formData.recipientData'));
	this.tytul = element(by.model('recipient.formData.description'));
	//strona2
	this.rachunekOpis = element(by.css('[label="Z rachunku"]'));
	this.twojaNazwaOdbiorcyOpis = element(by.css('[label="Twoja nazwa odbiorcy"]'));
	this.numerRachunkuOpis = element(by.css('[label="Numer rachunku"]'));
	this.daneOdbiorcyOpis = element(by.css('[label="Dane odbiorcy"]'));
	this.tytulOpis = element(by.css('[label="Tytułem"]'));
	//po wyszukaniu odbiorcy 
	this.pierwszyElementwTabeli = element(by.css('[bd-table-cell="first"]'));
	this.edytuj = buttons.edytuj;
	this.usun = buttons.usun;
	this.TytulKomunikat = element(by.id('description'));
	this.daneOdbiorcyKomunikat = element(by.id('recipientData'));
	this.twojaNazwaOdbiorcyKomunikat = element(by.id('customName'));
	this.numerRachunkuKomunikat = element(by.css('[eb-name="recipientAccountNo"]')).element(by.id('recipientAccountNo'));
	
	this.wybieranieOdbiorcy = function() {
		helpers.waitUntilReady(this.MojBank);
		this.MojBank.click();
		helpers.waitUntilReady(this.MojBank);
		login.kliknijWBaner();
		helpers.waitUntilReady(this.platnosci);
		this.platnosci.click();
		helpers.waitUntilReady(this.odbiorcyZdefiniowani);
		this.odbiorcyZdefiniowani.click();
		helpers.waitUntilReady(this.nowyOdbiorca);
		this.nowyOdbiorca.click();
	}
	this.sprawdzDaneOdbiorcy = function(rachunekNadawcy,nazwaOdbiorcy,rachunekOdbiorcy,daneOdbiorcy,tytulPrzelewu) {
		var rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		var rachunekOdbiorcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekOdbiorcy);
		expect(this.rachunekOpis.getText()).toEqual('Z RACHUNKU\n'+rachunekNadawcy);
		expect(this.twojaNazwaOdbiorcyOpis.getText()).toEqual('TWOJA NAZWA ODBIORCY\n'+nazwaOdbiorcy);
		expect(this.numerRachunkuOpis.getText()).toEqual('NUMER RACHUNKU\n'+rachunekOdbiorcy);
		expect(this.daneOdbiorcyOpis.getText()).toEqual('NAZWA I ADRES\n'+daneOdbiorcy);
		expect(this.tytulOpis.getText()).toEqual('TYTUŁEM\n'+tytulPrzelewu);
	}

	this.sprawdzDaneOdbiorcyStronaDruga = function(rachunekNadawcy,nazwaOdbiorcy,rachunekOdbiorcy,daneOdbiorcy,tytulPrzelewu) {
		var rachunekOdbiorcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekOdbiorcy);
		expect(this.rachunekOpis.getText()).toContain('Z rachunku');
		expect(this.twojaNazwaOdbiorcyOpis.getText()).toEqual('Twoja nazwa odbiorcy\n'+nazwaOdbiorcy);
		expect(this.numerRachunkuOpis.getText()).toEqual('Numer rachunku\n'+rachunekOdbiorcy);
		expect(this.daneOdbiorcyOpis.getText()).toEqual('Dane odbiorcy\n'+daneOdbiorcy);
		expect(this.tytulOpis.getText()).toEqual('Tytułem\n'+tytulPrzelewu);
	}

	this.dodajOdbiorceKrajowego = function (rachunekNadawcy,nazwaOdbiorcy,rachunekOdbiorcy,daneOdbiorcy,tytulPrzelewu,hasloSms) {
		var random = Math.random();
		if (hasloSms=="") {
			hasloSms='1111';
		}
		if (nazwaOdbiorcy==""){
			nazwaOdbiorcy="nazwaOdbiorcy"+random;
		}
		if (rachunekOdbiorcy==""){
			rachunekOdbiorcy=helpers.losujRachunekBiezacyPL();
		}
		if (daneOdbiorcy==""){
			daneOdbiorcy="Kowalski Stanisław"
		}
		if (tytulPrzelewu==""){
			tytulPrzelewu="tytul"+random;
		}
		var rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		winston.log('info', "Dane testu: rachunekNadawcy="+rachunekNadawcy+" rachunekOdbiorcy="+rachunekOdbiorcy+" daneOdbiorcy"+daneOdbiorcy+" tytulPrzelewu="+tytulPrzelewu+" hasloSms="+hasloSms);
		this.wybieranieOdbiorcy();
		browser.driver.sleep(24000);
		helpers.waitUntilReady(this.zRachunku);
		this.zRachunku.click();
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountNo',rachunekNadawcy);
		helpers.waitUntilReady(this.twojaNazwaOdbiorcy);
		this.twojaNazwaOdbiorcy.sendKeys(nazwaOdbiorcy);
		helpers.waitUntilReady(this.numerRachunku);
		this.numerRachunku.sendKeys(rachunekOdbiorcy);
		helpers.waitUntilReady(this.daneOdbiorcy);
		this.daneOdbiorcy.sendKeys(daneOdbiorcy);
		this.tytul.sendKeys(tytulPrzelewu);
		helpers.waitUntilReady(this.dalej);
		this.dalej.click().then(function(){
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
		});
		this.sprawdzDaneOdbiorcyStronaDruga(rachunekNadawcy,nazwaOdbiorcy,rachunekOdbiorcy,daneOdbiorcy,tytulPrzelewu);
		helpers.waitUntilReady(this.kodSms);
		this.kodSms.sendKeys(hasloSms);
		this.zatwierdz.click().then(function(){
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
		});
		helpers.waitUntilReady(this.potwierdzenie);
		expect(this.potwierdzenie.getText()).not.toContain("Zlecenie odrzucone");
		expect(this.potwierdzenie.getText()).not.toContain("odrzuc");
	};

	this.wyszukajOdbiorce  = function (daneDoSzukania) {
		helpers.waitUntilReady(this.odbiorcyZdefiniowani);
		this.odbiorcyZdefiniowani.click();
		helpers.waitUntilReady(this.szukajOdbiorcy);
		this.szukajOdbiorcy.sendKeys(daneDoSzukania);
		helpers.waitUntilReady(this.szukaj);
		this.szukaj.click();
		helpers.waitUntilReady(this.pierwszyElementwTabeli);
		this.pierwszyElementwTabeli.click();
	}

	this.edytujOdbiorce = function (rachunekNadawcy,nazwaOdbiorcy,rachunekOdbiorcy,daneOdbiorcy,tytulPrzelewu,hasloSms) {
		var random = Math.random();
		if (hasloSms=="") {
			hasloSms='1111';
		}
		if (nazwaOdbiorcy==""){
			nazwaOdbiorcy="2nazwaOdbiorcy"+random;
		}
		if (rachunekOdbiorcy==""){
			rachunekOdbiorcy=helpers.losujRachunekBiezacyPL();
		}
		if (daneOdbiorcy==""){
			daneOdbiorcy="2Kowalski Stanisław"
		}
		if (tytulPrzelewu==""){
			tytulPrzelewu="2tytul"+random;
		}
		var rachunekNadawcyNew="";var nazwaOdbiorcyNew="";var rachunekOdbiorcyNew="";var daneOdbiorcyNew="";var tytulPrzelewuNew="";
		this.dodajOdbiorceKrajowego(rachunekNadawcyNew,nazwaOdbiorcyNew,rachunekOdbiorcyNew,daneOdbiorcyNew,tytulPrzelewuNew,hasloSms);
		this.wyszukajOdbiorce(nazwaOdbiorcyNew);
		this.edytuj.click();
		helpers.waitUntilReady(this.twojaNazwaOdbiorcy);
		this.twojaNazwaOdbiorcy.clear();
		this.twojaNazwaOdbiorcy.sendKeys(nazwaOdbiorcy);
		helpers.waitUntilReady(this.numerRachunku);
		this.numerRachunku.clear();
		this.numerRachunku.sendKeys(rachunekOdbiorcy);
		helpers.waitUntilReady(this.daneOdbiorcy);
		this.daneOdbiorcy.clear();
		this.daneOdbiorcy.sendKeys(daneOdbiorcy);
		helpers.waitUntilReady(this.tytul);
		this.tytul.clear();
		this.tytul.sendKeys(tytulPrzelewu);
		helpers.waitUntilReady(this.dalej);
		this.dalej.click().then(function(){
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
		});
		this.sprawdzDaneOdbiorcyStronaDruga(rachunekNadawcy,nazwaOdbiorcy,rachunekOdbiorcy,daneOdbiorcy,tytulPrzelewu);
		helpers.waitUntilReady(this.kodSms);
		this.kodSms.sendKeys(hasloSms);
		this.zatwierdz.click().then(function(){
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
		});
		helpers.waitUntilReady(this.potwierdzenie);
		expect(this.potwierdzenie.getText()).not.toContain("Zlecenie odrzucone");
		expect(this.potwierdzenie.getText()).not.toContain("odrzuc");
	}

	this.usunOdbiorce = function (rachunekNadawcyNew) {
		var random = Math.random();
		var hasloSms='1111';
	    var nazwaOdbiorcyNew="nazwaOdbiorcy"+random;
		var rachunekOdbiorcyNew=helpers.losujRachunekBiezacyPL();
		var daneOdbiorcyNew="Kowalski Stanisław"
		var tytulPrzelewuNew="tytul"+random;

		this.dodajOdbiorceKrajowego(rachunekNadawcyNew,nazwaOdbiorcyNew,rachunekOdbiorcyNew,daneOdbiorcyNew,tytulPrzelewuNew,hasloSms);
		this.wyszukajOdbiorce(nazwaOdbiorcyNew);
		// this.sprawdzDaneOdbiorcy(rachunekNadawcyNew,nazwaOdbiorcyNew,rachunekOdbiorcyNew,daneOdbiorcyNew,tytulPrzelewuNew);
		this.usun.click();
		this.sprawdzDaneOdbiorcyStronaDruga(rachunekNadawcyNew,nazwaOdbiorcyNew,rachunekOdbiorcyNew,daneOdbiorcyNew,tytulPrzelewuNew);
		helpers.waitUntilReady(this.kodSms);
		this.kodSms.sendKeys(hasloSms);
		this.usun.click();
		helpers.waitUntilReady(this.potwierdzenie);
		expect(this.potwierdzenie.getText()).not.toContain("Zlecenie odrzucone");
		expect(this.potwierdzenie.getText()).not.toContain("odrzuc");
	}

	this.dodajOdbiorceKrajowegoWalidacjaNazwaOdbiorcy = function () {
		this.wybieranieOdbiorcy();
		helpers.waitUntilReady(this.twojaNazwaOdbiorcy);
		this.twojaNazwaOdbiorcy.sendKeys('123456789012345678901234567890123456');
		helpers.waitUntilReady(this.twojaNazwaOdbiorcyKomunikat);
		expect(this.twojaNazwaOdbiorcyKomunikat.getText()).toEqual('Pole Nazwa skrócona odbiorcy nie może być dłuższe niż 35 znaków i powinno zawierać tylko litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \' , /.');
		this.twojaNazwaOdbiorcy.clear();
		this.twojaNazwaOdbiorcy.sendKeys('=');
		expect(this.twojaNazwaOdbiorcyKomunikat.getText()).toEqual('Pole Nazwa skrócona odbiorcy nie może być dłuższe niż 35 znaków i powinno zawierać tylko litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \' , /.');
		this.twojaNazwaOdbiorcy.clear();
		expect(this.twojaNazwaOdbiorcyKomunikat.getText()).toEqual('Nazwa skrócona odbiorcy nie może być pusta');
		this.twojaNazwaOdbiorcy.clear();
		
	};

	this.dodajOdbiorceKrajowegoWalidacjaNumerRachunku = function () {
		this.wybieranieOdbiorcy();
		helpers.waitUntilReady(this.numerRachunku);
		this.numerRachunku.sendKeys('83101010230000261395100000');
		helpers.waitUntilReady(this.numerRachunkuKomunikat);
		expect(this.numerRachunkuKomunikat.getText()).toEqual('Rachunek odbiorcy nie może być rachunkiem ZUS.');
		this.numerRachunku.clear();
		this.numerRachunku.sendKeys('12');
		expect(this.numerRachunkuKomunikat.getText()).toEqual('Rachunek odbiorcy musi być zgodny z formatem NRB [CCBBBBBBBBAAAAAAAAAAAAAAAA lub CC BBBB BBBB AAAA AAAA AAAA AAAA]');
		this.numerRachunku.clear();
		expect(this.numerRachunkuKomunikat.getText()).toEqual('Rachunek odbiorcy nie może być pusty');
		this.numerRachunku.clear();
	
	};

	this.dodajOdbiorceKrajowegoWalidacjaPolaDaneOdbiorcy = function () {
		this.wybieranieOdbiorcy();
		helpers.waitUntilReady(this.daneOdbiorcy);
		this.daneOdbiorcy.sendKeys('123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901');
		expect(this.daneOdbiorcyKomunikat.getText()).toEqual('Dane odbiorcy nie mogą przekraczać 132 znaków i powinny zawierać wyłącznie litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \'  , /');
		this.daneOdbiorcy.clear();
		this.daneOdbiorcy.sendKeys('=');
		expect(this.daneOdbiorcyKomunikat.getText()).toEqual('Dane odbiorcy nie mogą przekraczać 132 znaków i powinny zawierać wyłącznie litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \'  , /');
		this.daneOdbiorcy.clear();
		expect(this.daneOdbiorcyKomunikat.getText()).toEqual('Dane odbiorcy nie mogę być puste');
		this.daneOdbiorcy.clear();

	};

	this.dodajOdbiorceKrajowegoWalidacjaPolaTytul = function () {
		this.wybieranieOdbiorcy();
		helpers.waitUntilReady(this.tytul);
		this.tytul.sendKeys('123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901');
		expect(this.TytulKomunikat.getText()).toEqual('Dane odbiorcy mogą składać się maskymalnie ze 140 znaków');
		this.tytul.clear();
		this.tytul.sendKeys('=');
		expect(this.TytulKomunikat.getText()).toEqual('Tytuł przelewu nie może przekraczać 132 znaków i powinien zawierać wyłącznie litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \'  , /');
		this.tytul.clear();
		expect(this.TytulKomunikat.getText()).toEqual('Tytuł przelewu nie może być pusty');
		this.tytul.clear();

	};

};
module.exports = new payments();