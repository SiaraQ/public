var payments = function () {
	var helpers = require('../pageObjects/helpers.js');
	var rachunki = require('../pageObjects/rachunkiMiniApp.js');
	var winston = require('winston');

	var fplatnosci = element(by.cssContainingText('.widget-tile__widget-header__title', 'Płatności'));
	//powtarzalne
	var fkodSms = element(by.model('payment.items.credentials'));
	var fpowrot = element(by.buttonText('Powrót do listy'));
	var fpotwierdzenie = element(by.css('[class="bd-msg-panel__message"]'));
	//krok1 przelew krajowy
	var ftypPlatnosci = element(by.model('payment.type'));
	var fzRachunku = element(by.model('selection.account'));
	var fdostepneSrodki = element(by.css('[class="bd-amount__value"]'));
	var frachunekOdbiorcy = element(by.model('payment.formData.recipientAccountNo'));
	var fnazwaOdbiorcy = element(by.model('payment.formData.recipientName')); //tez Nazwa płatnika ZUS
	var ftytul = element(by.model('payment.formData.description'));
	var fkwota = element(by.model('payment.formData.amount'));
	var fdalej = element(by.css('[ng-click="moveNext()"]'));
	var fzatwierdz = element(by.buttonText('Zatwierdź'));
	var ftytulKomunikat = element(by.id('description'));
	var fkwotaKomunikat = element(by.css('[eb-name="amount"]')).element(by.id('amount'));//.element(by.css('[class="messages ng-inactive"]'));
	var fdataKomunikat = element(by.id('realizationDate'));
	var fMojBank = element(by.css('[class="rb-header__menu__content"]')).element(by.css('[ui-sref="dashboard"]'));
	var fdataRealizacji = element(by.model('ngModel'));
	var fKomdataRealizacji = element(by.id('realizationDate'));
	// fdataRealizacji= element(by.name('realizationDate'));
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
 		helpers.waitUntilReady(fplatnosci);
		fplatnosci.click();
		helpers.waitUntilReady(ftypPlatnosci);
		ftypPlatnosci.click();
		// browser.driver.sleep(3000);
		helpers.wybierzElementZListyPoNumerze(0);
		// browser.driver.sleep(5000);
		helpers.waitUntilReady(fzRachunku);
		fzRachunku.click();
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountNo',rachunekNadawcy);
		helpers.waitUntilReady(fdostepneSrodki);
		helpers.wyliczSaldoOczekiwanePo(fdostepneSrodki,kwota).then(function(value) {
 			frachunekOdbiorcy.sendKeys(rachunekOdbiorcy);
			fnazwaOdbiorcy.sendKeys(nazwaOdbiorcy);
			ftytul.sendKeys(tytulPrzelewu);
			fkwota.sendKeys(kwota); 
			if (dataRealizacji!=""){
				fdataRealizacji.clear();
				tfdataRealizacji.sendKeys(dataRealizacjiNew);
			}
			fdalej.click().then(function(){
				winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
			});
			helpers.waitUntilReady(fkodSms);
			fkodSms.sendKeys("1111");
			helpers.waitUntilReady(fzatwierdz);
			fzatwierdz.click().then(function(){
				winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
			});
			helpers.waitUntilReady(fpotwierdzenie);
			expect(fpotwierdzenie.getText()).not.toContain("Przelew/transakcja odrzucona");
			expect(fpotwierdzenie.getText()).not.toContain("odrzuc");
			fpowrot.click();
			if (dataRealizacji==""){
				console.log("value=");
				console.log(value);
				rachunki.sprawdzOperacjeNaHistorii(rachunekNadawcy,tytulPrzelewu,kwota,value);
			}
		});	
	};


	this.przelewKrajowyWalidacjaTytulem = function () {
		helpers.waitUntilReady(fplatnosci);
		fplatnosci.click();
		helpers.waitUntilReady(ftytul);
		ftytul.click();
		ftytul.sendKeys("1");
		ftytul.clear();
		expect(ftytulKomunikat.getText()).toEqual('Tytuł przelewu nie może być pusty');
		ftytul.sendKeys('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123');
		expect(ftytulKomunikat.getText()).toEqual('Tytuł przelewu nie może przekraczać 132 znaków i powinien zawierać wyłącznie litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \'  , /');
		ftytul.sendKeys('"');
		expect(ftytulKomunikat.getText()).toEqual('Tytuł przelewu nie może przekraczać 132 znaków i powinien zawierać wyłącznie litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \'  , /');
	};

	this.przelewKrajowyWalidacjaKwoty = function () {
		helpers.waitUntilReady(fplatnosci);
		fplatnosci.click();
		helpers.waitUntilReady(fkwota);
		fkwota.sendKeys('12,344');
		expect(fkwotaKomunikat.getText()).toEqual('Nieprawidłowa kwota przelewu');
		fkwota.clear();
		fkwota.sendKeys('0,0');
		expect(fkwotaKomunikat.getText()).toEqual('Nieprawidłowa kwota przelewu');
		fkwota.clear();
		expect(fkwotaKomunikat.getText()).toEqual('Kwota przelewu nie może być pusta');
		fkwota.sendKeys('9999999999,99');
		expect(fkwotaKomunikat.getText()).toEqual('Kwota przelewu przekracza środki dostępne na rachunku');

	};


	this.przelewKrajowyWalidacjaDaty = function () {
		var dataBiezacaPlus180 = helpers.dataBiezacaPlusDzien(180);
		helpers.waitUntilReady(fplatnosci);
		fplatnosci.click();
		helpers.waitUntilReady(fdataRealizacji);
		fdataRealizacji.sendKeys('123');
		browser.driver.sleep(1000);
		expect(fKomdataRealizacji.getText()).toEqual('Niepoprawna data realizacji przelewu');
		fdataRealizacji.clear();
		fdataRealizacji.sendKeys('01.01.2001');
		expect(fKomdataRealizacji.getText()).toEqual('Data realizacji przelewu nie może być wcześniejsza niż data bieżąca');
		fdataRealizacji.clear();
		fdataRealizacji.sendKeys('01.01.2222');
		expect(fKomdataRealizacji.getText()).toEqual('Data realizacji przelewu nie może być późniejsza niż '+dataBiezacaPlus180);
		fdataRealizacji.clear();
		fdataRealizacji.sendKeys('');
		expect(fKomdataRealizacji.getText()).toEqual('Data realizacji przelewu nie może być pusta');

	};

	
};
module.exports = new payments();