var payments = function () {
	var helpers = require('../pageObjects/helpers.js');
	var rachunki = require('../pageObjects/rachunkiMiniApp.js');
	var winston = require('winston');
	var deferred = protractor.promise.defer();
	var promise = deferred.promise;

	this.platnosci = element(by.cssContainingText('.widget-tile__widget-header__title', 'Płatności'));
	this.MojBank = element(by.css('[class="rb-header__menu__content"]')).element(by.css('[ui-sref="dashboard"]'));
	//powtarzalne
	this.kodSms = element(by.model('payment.items.credentials'));
	this.potwierdzenie = element(by.css('[class="bd-msg-panel__message"]'));
	//krok1 przelew krajowy
	this.typPlatnosci = element(by.model('payment.type'));
	this.zRachunku = element(by.model('selection.account'));
	this.naRachunek = element(by.css('[name="recipientAccountId"]'));
	this.dostepneSrodki = element(by.css('[class="bd-amount__value"]'));
	this.tytul = element(by.model('payment.formData.description'));

	this.rachunekOdbiorcy = element(by.model('payment.formData.recipientAccountNo'));
	this.nazwaOdbiorcy = element(by.model('payment.formData.recipientName'));
	this.kwota = element(by.model('payment.formData.amount'));
	this.dalej = element(by.css('[ng-click="moveNext()"]'));
	this.zatwierdz = element(by.buttonText('Zatwierdź'));
	this.dataRealizacji = element(by.model('ngModel'));

	this.tytulKomunikat = element(by.id('description'));
	this.kwotaKomunikat = element(by.css('[eb-name="amount"]')).element(by.id('amount'));
	this.dataKomunikat = element(by.id('realizationDate'));

	this.tworzPrzelewWlasny = function (rachunekNadawcy,naRachunek,tytulPrzelewu,kwota,dataRealizacji,hasloSms) {
		browser.driver.sleep(12000);
		var saldoPrzed=0;
		var saldoOczekiwanePo=0;
		var random = Math.random();

		if (hasloSms=="") hasloSms='1111';
		if (tytulPrzelewu=="")tytulPrzelewu="tytul"+random;
		if (kwota=="")	kwota=helpers.losujKwote();
		if (dataRealizacji!="") dataRealizacjiNew=helpers.dataBiezacaPlusDzien(dataRealizacji);

		var rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		var naRachunek = helpers.zamienRachunekNaNrbZeSpacjami(naRachunek);

		winston.log('info', "Dane testu: rachunekNadawcy="+rachunekNadawcy+" naRachunek="+naRachunek+" tytulPrzelewu="+tytulPrzelewu+" kwota="+kwota+" hasloSms="+hasloSms);
		helpers.waitUntilReady(this.platnosci);	
		this.platnosci.click();
		  helpers.waitUntilReady(this.typPlatnosci);	
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(1);
		  helpers.waitUntilReady(this.zRachunku);	
		this.zRachunku.click();
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountNo',rachunekNadawcy);
		  helpers.waitUntilReady(this.dostepneSrodki);	
		saldoOczekiwanePo=helpers.wyliczSaldoOczekiwanePo(this.dostepneSrodki,kwota);
		helpers.waitUntilReady(this.naRachunek);
		
		this.naRachunek.click();  	
		if (naRachunek=="") {
			//wybiera pierwszy na liscie
			helpers.wybierzElementZListyPoNumerze(0);
		} else {
			//szuka konkretnego na liscie
			browser.driver.sleep(2000);
			helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountNo',naRachunek);
		}
		helpers.waitUntilReady(this.tytul);
		this.tytul.sendKeys(tytulPrzelewu);
		helpers.waitUntilReady(this.kwota);
		this.kwota.sendKeys(kwota); 
		if (dataRealizacji!=""){
			this.dataRealizacji.clear();
			this.dataRealizacji.sendKeys(dataRealizacjiNew);
		}
		helpers.waitUntilReady(this.dalej);
		this.dalej.click().then(function(){
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
		});
		helpers.waitUntilReady(this.kodSms);
		this.kodSms.sendKeys(hasloSms);
		this.zatwierdz.click().then(function(){
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
		});
		helpers.waitUntilReady(this.potwierdzenie);
		expect(this.potwierdzenie.getText()).not.toContain("odrzuc");
	};

	this.przelewWlasnyWalidacjaTytulem = function () {
		helpers.waitUntilReady(this.platnosci);	
		this.platnosci.click();
		  helpers.waitUntilReady(this.typPlatnosci);	
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(1);
		  helpers.waitUntilReady(this.tytul);	
		this.tytul.click();
		this.tytul.clear();
		expect(this.tytulKomunikat.getText()).toEqual('Tytuł przelewu nie może być pusty');
		this.tytul.sendKeys('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123');
		expect(this.tytulKomunikat.getText()).toEqual('Tytuł przelewu nie może przekraczać 132 znaków i powinien zawierać wyłącznie litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \'  , /');
		this.tytul.sendKeys('"');
		expect(this.tytulKomunikat.getText()).toEqual('Tytuł przelewu nie może przekraczać 132 znaków i powinien zawierać wyłącznie litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \'  , /');
		this.MojBank.click();
	};

	this.przelewWlasnyWalidacjaKwoty = function () {
		helpers.waitUntilReady(this.platnosci);	
		this.platnosci.click();
		  helpers.waitUntilReady(this.typPlatnosci);	
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(1);
		  helpers.waitUntilReady(this.kwota);	
		//funkcja, w której można działać na kwotach
		element(by.css('[class="bd-amount__value"]')).getText().then(function (value) {
    		this.saldo =  element(by.model('payment.formData.amount'));
    		this.kwotaKomunikat = element(by.css('[eb-name="amount"]')).element(by.id('amount'));

    	value=value.replace(/\s+/g, '');
		value=value.replace(',','.');
		//kwota powyżej środków na rachunku
    	this.saldo.sendKeys(Number(value)+0.01);
		expect(this.kwotaKomunikat.getText()).toEqual('Kwota przelewu przekracza środki dostępne na rachunku');
		this.saldo.clear();
		});
		//Nieprawidłowa kwota przelewu
		this.kwota.sendKeys('12,344');
		expect(this.kwotaKomunikat.getText()).toEqual('Nieprawidłowa kwota przelewu');
		this.kwota.clear();
		this.kwota.sendKeys('0,0');
		expect(this.kwotaKomunikat.getText()).toEqual('Nieprawidłowa kwota przelewu');
		this.kwota.clear();
		//
		expect(this.kwotaKomunikat.getText()).toEqual('Kwota przelewu nie może być pusta');
		this.MojBank.click();
	};

	this.przelewWlasnyWalidacjaDaty = function () {
		helpers.waitUntilReady(this.platnosci);	
		this.platnosci.click();
		  helpers.waitUntilReady(this.typPlatnosci);	
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(1);
		  helpers.waitUntilReady(this.dataRealizacji);	
		helpers.scrollWindow(this.dataRealizacji);
		this.dataRealizacji.click();
		this.datar.clear();
		this.datar.sendKeys('123');
		expect(this.dataKomunikat.getText()).toEqual('Niepoprawna data realizacji przelewu');
		this.datar.clear();
		expect(this.dataKomunikat.getText()).toEqual('Data realizacji przelewu nie może być pusta');
		this.datar.sendKeys('01.01.2001');
		expect(this.dataKomunikat.getText()).toEqual('Data realizacji przelewu nie może być wcześniejsza niż data bieżąca');
		this.datar.clear();
		this.datar.sendKeys('01.01.2222');
		expect(this.dataKomunikat.getText()).toEqual('Data realizacji przelewu nie może być późniejsza niż 14.03.2016');
		this.MojBank.click();
	};

};
module.exports = new payments();