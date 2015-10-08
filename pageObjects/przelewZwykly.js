var payments = function () {
	var helpers = require('../pageObjects/helpers.js');
	var rachunki = require('../pageObjects/rachunkiMiniApp.js');
	var winston = require('winston');

	this.platnosci = element(by.cssContainingText('.widget-tile__widget-header__title', 'Płatności'));
	//powtarzalne
	this.kodSms = element(by.model('payment.items.credentials'));
	this.powrot = element(by.buttonText('Powrót do listy'));
	this.potwierdzenie = element(by.css('[class="bd-msg-panel__message"]'));
	//krok1 przelew krajowy
	this.typPlatnosci = element(by.model('payment.type'));
	this.zRachunku = element(by.model('selection.account'));
	this.dostepneSrodki = element(by.css('[class="bd-amount__value"]'));
	this.rachunekOdbiorcy = element(by.model('payment.formData.recipientAccountNo'));
	this.nazwaOdbiorcy = element(by.model('payment.formData.recipientName')); //tez Nazwa płatnika ZUS
	this.tytul = element(by.model('payment.formData.description'));
	this.kwota = element(by.model('payment.formData.amount'));
	this.dalej = element(by.css('[ng-click="moveNext()"]'));
	this.zatwierdz = element(by.buttonText('Zatwierdź'));
	this.tytulKomunikat = element(by.id('description'));
	this.kwotaKomunikat = element(by.css('[eb-name="amount"]')).element(by.id('amount'));//.element(by.css('[class="messages ng-inactive"]'));
	this.dataKomunikat = element(by.id('realizationDate'));
	this.MojBank = element(by.css('[class="rb-header__menu__content"]')).element(by.css('[ui-sref="dashboard"]'));
	this.dataRealizacji = element(by.model('ngModel'));
	this.KomdataRealizacji = element(by.id('realizationDate'));
	// this.dataRealizacji= element(by.name('realizationDate'));
	//krok2 przelew krajowy
	//label="Z rachunku"
	//label="Właściciel"
	//label="Na rachunek"
	//label="Nazwa odbiorcy"
	//label="Kwota"
	//label="Tytułem"
	//label="Data realizacji"
	//button Anuluj Popraw
	//Zatwierdź  lub ng-click="moveNext()"

 	this.tworzPrzelewZwykly = function (rachunekNadawcy,nazwaOdbiorcy,rachunekOdbiorcy,tytulPrzelewu,kwota,dataRealizacji,hasloSms) {
		var saldoPrzed=0;
		var saldoOczekiwanePo=0;
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
		if (tytulPrzelewu==""){
			tytulPrzelewu="tytul"+random;
		}
		if (kwota=="") kwota=helpers.losujKwote();
		if (dataRealizacji!="") var dataRealizacjiNew=helpers.dataBiezacaPlusDzien(dataRealizacji);

		var rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);

		winston.log('info', "Dane testu: rachunekNadawcy="+rachunekNadawcy+" rachunekOdbiorcy="+rachunekOdbiorcy+" tytulPrzelewu="+tytulPrzelewu+" hasloSms="+hasloSms);
		winston.log('info', "dataRealizacji="+dataRealizacjiNew);
 		helpers.waitUntilReady(this.platnosci);
		this.platnosci.click();
		helpers.waitUntilReady(this.typPlatnosci);
		this.typPlatnosci.click();
		// browser.driver.sleep(3000);
		helpers.wybierzElementZListyPoNumerze(0);
		// browser.driver.sleep(5000);
		helpers.waitUntilReady(this.zRachunku);
		this.zRachunku.click();
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountNo',rachunekNadawcy);
		helpers.waitUntilReady(this.dostepneSrodki);
		saldoOczekiwanePo=helpers.wyliczSaldoOczekiwanePo(this.dostepneSrodki,kwota); 
		this.rachunekOdbiorcy.sendKeys(rachunekOdbiorcy);
		// browser.driver.sleep(5000);
		this.nazwaOdbiorcy.sendKeys(nazwaOdbiorcy);
		// browser.driver.sleep(5000);
		this.tytul.sendKeys(tytulPrzelewu);
		// browser.driver.sleep(5000);
		this.kwota.sendKeys(kwota); 
		// browser.driver.sleep(5000);
		if (dataRealizacji!=""){
			this.dataRealizacji.clear();
			this.dataRealizacji.sendKeys(dataRealizacjiNew);
		}
		this.dalej.click().then(function(){
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
		});
		// browser.driver.sleep(12000);
		helpers.waitUntilReady(this.kodSms);
		this.kodSms.sendKeys("1111");
		helpers.waitUntilReady(this.zatwierdz);
		this.zatwierdz.click().then(function(){
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
		});
		// browser.driver.sleep(3000);
		helpers.waitUntilReady(this.potwierdzenie);
		expect(this.potwierdzenie.getText()).not.toContain("Przelew/transakcja odrzucona");
		expect(this.potwierdzenie.getText()).not.toContain("odrzuc");
		this.powrot.click();
		if (dataRealizacji=="")
		rachunki.sprawdzOperacjeNaHistorii(rachunekNadawcy,tytulPrzelewu,kwota,saldoOczekiwanePo);
	};


	this.przelewKrajowyWalidacjaTytulem = function () {
		helpers.waitUntilReady(this.platnosci);
		this.platnosci.click();
		helpers.waitUntilReady(this.tytul);
		this.tytul.click();
		this.tytul.sendKeys("1");
		this.tytul.clear();
		expect(this.tytulKomunikat.getText()).toEqual('Tytuł przelewu nie może być pusty');
		this.tytul.sendKeys('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123');
		expect(this.tytulKomunikat.getText()).toEqual('Tytuł przelewu nie może przekraczać 132 znaków i powinien zawierać wyłącznie litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \'  , /');
		this.tytul.sendKeys('"');
		expect(this.tytulKomunikat.getText()).toEqual('Tytuł przelewu nie może przekraczać 132 znaków i powinien zawierać wyłącznie litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \'  , /');
	};

	this.przelewKrajowyWalidacjaKwoty = function () {
		helpers.waitUntilReady(this.platnosci);
		this.platnosci.click();
		helpers.waitUntilReady(this.kwota);
		this.kwota.sendKeys('12,344');
		expect(this.kwotaKomunikat.getText()).toEqual('Nieprawidłowa kwota przelewu');
		this.kwota.clear();
		this.kwota.sendKeys('0,0');
		expect(this.kwotaKomunikat.getText()).toEqual('Nieprawidłowa kwota przelewu');
		this.kwota.clear();
		expect(this.kwotaKomunikat.getText()).toEqual('Kwota przelewu nie może być pusta');
		this.kwota.sendKeys('9999999999,99');
		expect(this.kwotaKomunikat.getText()).toEqual('Kwota przelewu przekracza środki dostępne na rachunku');

	};


	this.przelewKrajowyWalidacjaDaty = function () {
		var dataBiezacaPlus180 = helpers.dataBiezacaPlusDzien(180);
		helpers.waitUntilReady(this.platnosci);
		this.platnosci.click();
		helpers.waitUntilReady(this.dataRealizacji);
		this.dataRealizacji.sendKeys('123');
		browser.driver.sleep(1000);
		expect(this.KomdataRealizacji.getText()).toEqual('Niepoprawna data realizacji przelewu');
		this.dataRealizacji.clear();
		this.dataRealizacji.sendKeys('01.01.2001');
		expect(this.KomdataRealizacji.getText()).toEqual('Data realizacji przelewu nie może być wcześniejsza niż data bieżąca');
		this.dataRealizacji.clear();
		this.dataRealizacji.sendKeys('01.01.2222');
		expect(this.KomdataRealizacji.getText()).toEqual('Data realizacji przelewu nie może być późniejsza niż '+dataBiezacaPlus180);
		this.dataRealizacji.clear();
		this.dataRealizacji.sendKeys('');
		expect(this.KomdataRealizacji.getText()).toEqual('Data realizacji przelewu nie może być pusta');

	};

	
};
module.exports = new payments();