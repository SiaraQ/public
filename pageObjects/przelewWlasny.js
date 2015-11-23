var payments = function() {
	var helpers = require('../pageObjects/helpers.js');
	var buttons = require('../pageObjects/buttons.js');
	var rachunki = require('../pageObjects/rachunkiMiniApp.js');
	var winston = require('winston');
	var deferred = protractor.promise.defer();
	var promise = deferred.promise;

	var fplatnosci = element(by.cssContainingText('.widget-tile__widget-header__title', 'Płatności'));
	var fMojBank = element(by.css('[class="rb-header__menu__content"]')).element(by.css('[ui-sref="dashboard"]'));
	//powtarzalne
	var fkodSms = element(by.model('rbModel.input.model'));
	var fpotwierdzenie = element(by.css('[class="bd-msg-panel__message"]'));
	//krok1 przelew krajowy
	var fprzelewWlasny = element(by.css('[ui-sref="payments.new_internal.fill"]'));
	// var fprzelewWlasny = element(by.model('payment.type'));
	var fzRachunku = element(by.model('selection.account'));
	var fnaRachunek = element(by.css('[name="recipientAccountId"]'));
	var fdostepneSrodki = element(by.css('[class="bd-amount__value"]'));
	var ftytul = element(by.model('payment.formData.description'));

	var frachunekOdbiorcy = element(by.model('payment.formData.recipientAccountNo'));
	var fnazwaOdbiorcy = element(by.model('payment.formData.recipientName'));
	var fkwota = element(by.model('payment.formData.amount'));
	var fdalej = buttons.dalej;
	var fzatwierdz = buttons.zatwierdz;
	var fdataRealizacji = element(by.model('ngModel'));

	var ftytulKomunikat = element(by.id('description'));
	var fkwotaKomunikat = element(by.css('[eb-name="amount"]')).element(by.id('amount'));
	var fdataKomunikat = element(by.id('realizationDate'));

	this.tworzPrzelewWlasny = function(rachunekNadawcy, naRachunek, tytulPrzelewu, kwota, dataRealizacji, hasloSms) {
		browser.driver.sleep(12000);
		var saldoPrzed = 0;
		var saldoOczekiwanePo = 0;
		var random = Math.random();

		if (hasloSms == "") hasloSms = '1111';
		if (tytulPrzelewu == "") tytulPrzelewu = "tytul" + random;
		if (kwota == "") kwota = helpers.losujKwote();
		if (dataRealizacji != "") dataRealizacjiNew = helpers.dataBiezacaPlusDzien(dataRealizacji);

		var rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		var naRachunek = helpers.zamienRachunekNaNrbZeSpacjami(naRachunek);

		winston.log('info', "Dane testu: rachunekNadawcy=" + rachunekNadawcy + " naRachunek=" + naRachunek + " tytulPrzelewu=" + tytulPrzelewu + " kwota=" + kwota + " hasloSms=" + hasloSms);
		helpers.waitUntilReady(fplatnosci);
		fplatnosci.click();
		helpers.waitUntilReady(fprzelewWlasny);
		fprzelewWlasny.click();
		helpers.waitUntilReady(fzRachunku);
		fzRachunku.click();
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by $index', rachunekNadawcy);
		helpers.waitUntilReady(fdostepneSrodki);
		helpers.wyliczSaldoOczekiwanePo(fdostepneSrodki, kwota).then(function(value) {
			helpers.waitUntilReady(fnaRachunek);
			fnaRachunek.click();
			if (naRachunek == "") {
				//wybiera pierwszy na liscie
				helpers.wybierzElementZListyPoNumerze(0);
			} else {
				//szuka konkretnego na liscie
				browser.driver.sleep(2000);
				helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by $index', naRachunek);
			}
			helpers.waitUntilReady(ftytul);
			ftytul.clear();
			ftytul.sendKeys(tytulPrzelewu);
			helpers.waitUntilReady(fkwota);
			fkwota.sendKeys(kwota);
			if (dataRealizacji != "") {
				fdataRealizacji.clear();
				fdataRealizacji.sendKeys(dataRealizacjiNew);
			}
			helpers.waitUntilReady(fdalej);
			fdalej.click().then(function() {
				winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
			});
			// helpers.waitUntilReady(fkodSms);
			// fkodSms.sendKeys(hasloSms);
			fzatwierdz.click().then(function() {
				winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
			});
			helpers.waitUntilReady(fpotwierdzenie);
			expect(fpotwierdzenie.getText()).not.toContain("odrzuc");
			if (dataRealizacji == "") {
				console.log("value=");
				console.log(value);
				rachunki.sprawdzOperacjeNaHistorii(rachunekNadawcy, tytulPrzelewu, kwota, value);
			}
		});
	};

	this.przelewWlasnyWalidacjaTytulem = function() {
		helpers.waitUntilReady(fplatnosci);
		fplatnosci.click();
		helpers.waitUntilReady(fprzelewWlasny);
		fprzelewWlasny.click();
		// helpers.wybierzElementZListyPoNumerze(1);
		helpers.waitUntilReady(ftytul);
		ftytul.click();
		ftytul.clear();
		expect(ftytulKomunikat.getText()).toEqual('Tytuł przelewu nie może być pusty');
		ftytul.sendKeys('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123');
		expect(ftytulKomunikat.getText()).toEqual('Tytuł przelewu nie może przekraczać 132 znaków i powinien zawierać wyłącznie litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \'  , /');
		ftytul.sendKeys('"');
		expect(ftytulKomunikat.getText()).toEqual('Tytuł przelewu nie może przekraczać 132 znaków i powinien zawierać wyłącznie litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \'  , /');
		fMojBank.click();
	};

	this.przelewWlasnyWalidacjaKwoty = function() {
		helpers.waitUntilReady(fplatnosci);
		fplatnosci.click();
		helpers.waitUntilReady(fprzelewWlasny);
		fprzelewWlasny.click();
		// helpers.wybierzElementZListyPoNumerze(1);
		helpers.waitUntilReady(fkwota);
		//funkcja, w której można działać na kwotach
		element(by.css('[class="bd-amount__value"]')).getText().then(function(value) {
			fsaldo = element(by.model('payment.formData.amount'));
			fkwotaKomunikat = element(by.css('[eb-name="amount"]')).element(by.id('amount'));
			value = value.replace(/\s+/g, '');
			value = value.replace(',', '.');
			//kwota powyżej środków na rachunku
			fsaldo.sendKeys(Number(value) + 0.01);
			expect(fkwotaKomunikat.getText()).toEqual('Kwota przelewu przekracza środki dostępne na rachunku');
			fsaldo.clear();
		});
		//Nieprawidłowa kwota przelewu
		fkwota.sendKeys('12,344');
		expect(fkwotaKomunikat.getText()).toEqual('Nieprawidłowa kwota przelewu');
		fkwota.clear();
		fkwota.sendKeys('0,0');
		expect(fkwotaKomunikat.getText()).toEqual('Nieprawidłowa kwota przelewu');
		// helpers.waitUntilReady(fkwota);
		// fkwota.clear();
		// fkwota.click();
		// helpers.waitUntilReady(fkwotaKomunikat);
		// expect(fkwotaKomunikat.getText()).toEqual('Kwota przelewu nie może być pusta');
		// fMojBank.click();
	};

	this.przelewWlasnyWalidacjaDaty = function() {
		helpers.waitUntilReady(fplatnosci);
		fplatnosci.click();
		helpers.waitUntilReady(fprzelewWlasny);
		fprzelewWlasny.click();
		// helpers.wybierzElementZListyPoNumerze(1);
		helpers.waitUntilReady(fdataRealizacji);
		helpers.scrollWindow(fdataRealizacji);
		fdataRealizacji.click();
		fdatar=fdataRealizacji;
		fdatar.clear();
		fdatar.sendKeys('123');
		expect(fdataKomunikat.getText()).toEqual('Niepoprawna data realizacji przelewu');
		fdatar.clear();
		expect(fdataKomunikat.getText()).toEqual('Data realizacji przelewu nie może być pusta');
		fdatar.sendKeys('01.01.2001');
		expect(fdataKomunikat.getText()).toEqual('Data realizacji przelewu nie może być wcześniejsza niż data bieżąca');
		fdatar.clear();
		fdatar.sendKeys('01.01.2222');
		expect(fdataKomunikat.getText()).toEqual('Data realizacji przelewu nie może być późniejsza niż 14.03.2016');
		fMojBank.click();
	};

};
module.exports = new payments();