var payments = function() {
	var rachunki = require('../pageObjects/rachunkiMiniApp.js');
	var buttons = require('../pageObjects/buttons.js');
	var helpers = require('../pageObjects/helpers.js');
	var winston = require('winston');
	var platnosci = require('../pageObjects/platnosci.js');
	var deferred = protractor.promise.defer();
	var promise = deferred.promise;
	var random = Math.random();

	var fplatnosci = element(by.cssContainingText('.widget-tile__widget-header__title', 'Płatności'));
	var fplatnosciPrzelewy = element(by.css('[ui-sref="payments.new.fill({ paymentType: \'domestic\' })"]'));
	var fMojBank = element(by.css('[class="rb-header__menu__content"]')).element(by.css('[ui-sref="dashboard"]'));
	//powtarzalne
	var fkodSms = element(by.model('payment.items.credentials'));
	var fpotwierdzenie = element(by.css('[class="bd-msg-panel__message"]'));
	//krok1 przelew krajowy
	var ftypPlatnosci = element(by.model('payment.type'));
	var fzRachunku = element(by.model('selection.account'));
	var fdostepneSrodki = element(by.css('[class="bd-amount__value"]'));
	//Rachunek Urzędu Skarbowego
	var fnazwaPlatnika = element(by.model('payment.formData.taxpayerData'));
	var ftypIdentyfikatoraUzupelniajacego = element(by.model('payment.formData.idType'));
	var fnumerIdentyfikatoraUzupelniajacego = element(by.model('payment.formData.idNumber'));
	var fsymbolFormularza = element(by.model('selection.model'));
	var ftypOkresu = element(by.model('payment.formData.periodType'));
	var ftypOkresuActive = element(by.name('formSymbol'));
	var fnumerOkresu = element(by.model('payment.formData.periodNo'));
	var frokOkresu = element(by.model('payment.formData.periodYear'));
	var fidentyfokacjaZobowiazania = element(by.model('payment.formData.obligationId'));
	var fkwota = element(by.model('payment.formData.amount'));
	var fdataRealizacji = element(by.model('ngModel'));
	var fKomNazwaPlatnika = element(by.css('[class="eb-validation-messages"]'));
	var fKomunikat2 = element(by.css('[class="messages ng-inactive"]'));
	var fKomunikat3 = element(by.css('[class="validation-message animate-on"]'));
	var fKomNIP = element(by.id('supplementaryId'));
	var fKomKwota = element(by.id('amount'));
	var fKomdataRealizacji = element(by.id('realizationDate'));
	var fKomNumerOkresu = element(by.id('periodNo'));
	var fKomSymbolFormularza = element(by.id('periodType'));
	var fKomRokOkresu = element(by.id('periodYear'));
	var fKomidentyfokacjaZobowiazania = element(by.id('commitmentId'));
	var fPoleSaldo = element(by.css('[class="bd-amount__value"]'));
	var fRachunekUrzSkarb = element(by.css('[class="rb-tax-account-select__account"]')).element(by.id('recipientAccountNo'));
	var fdalej = element(by.css('[ng-click="moveNext()"]'));
	var fzatwierdz = buttons.zatwierdz;

	this.przelewDoUS = function(rachunekNadawcy, rachunekUrzeduSkarbowego, nazwaPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, symbolFormularza, typOkresu, numerOkresu, rokOkresu, identyfokacjaZobowiazania, dataRealizacji, kwota, hasloSms) {
		var numertypOkresu = 0;
		var numertypIdentyfikatoraUzup = 0;
		var saldoPrzed = 0;
		var saldoOczekiwanePo = 0;
		var enabled = true;

		if (dataRealizacji != "") dataRealizacjiNew = helpers.dataBiezacaPlusDzien(dataRealizacji);
		if ((symbolFormularza == "") && (typOkresu == "") && (numerOkresu == "") && (rokOkresu = "")) {
			if (typOkresu == "") typOkresu = "J - dzień";
			switch (typOkresu) {
				case 'D - dekada':
					numertypOkresu = 1;
					if (numerOkresu == "") numerOkresu = "0101";
					break;
				case 'M - miesiąc':
					numertypOkresu = 2;
					if (numerOkresu == "") numerOkresu = "01";
					break;
				case 'K - kwartał':
					if (numerOkresu == "") numerOkresu = "01";
					numertypOkresu = 3;
					break;
				case 'P - półrocze':
					if (numerOkresu == "") numerOkresu = "01";
					numertypOkresu = 4;
					break;
				case 'R - rok':
					numertypOkresu = 5;
					break;
				default:
					//J - dzień;
					if (numerOkresu == "") numerOkresu = "0101";
					numertypOkresu = 0;
			}
			if (rokOkresu == "") rokOkresu = "15";
		}

		if (typIdentyfikatoraUzupelniajacego == "") typIdentyfikatoraUzupelniajacego = "N - Nip";
		switch (typIdentyfikatoraUzupelniajacego) {
			case 'P - PESEL':
				numertypIdentyfikatoraUzup = 1;
				if (numerIdentyfikatoraUzupelniajacego == "") numerIdentyfikatoraUzupelniajacego = helpers.tworzPesel();
				break;
			case 'R - REGON':
				numertypIdentyfikatoraUzup = 2;
				if (numerIdentyfikatoraUzupelniajacego == "") numerIdentyfikatoraUzupelniajacego = helpers.tworzRegon();
				break;
			case '1 - Dowód osobisty':
				if (numerIdentyfikatoraUzupelniajacego == "") numerIdentyfikatoraUzupelniajacego = helpers.tworzDowod();
				numertypIdentyfikatoraUzup = 3;
				break;
			case '2 - Paszport':
				if (numerIdentyfikatoraUzupelniajacego == "") numerIdentyfikatoraUzupelniajacego = "OD8008032";
				numertypIdentyfikatoraUzup = 4;
				break;
			case '3 - Inny dokument tożsamości':
				if (numerIdentyfikatoraUzupelniajacego == "") numerIdentyfikatoraUzupelniajacego = "Innydokument";
				numertypIdentyfikatoraUzup = 5;
				break;
			default:
				//N - NIP;
				if (numerIdentyfikatoraUzupelniajacego == "") numerIdentyfikatoraUzupelniajacego = helpers.tworzNip();
				numertypIdentyfikatoraUzup = 0;
		}

		if (symbolFormularza == "") symbolFormularza = "CIT-10"
		if (identyfokacjaZobowiazania == "") identyfokacjaZobowiazania = "identfZ";
		if (nazwaPlatnika == "") nazwaPlatnika = "nazwaPlatnika" + random;
		if (hasloSms == "") hasloSms = '1111';
		if (rachunekUrzeduSkarbowego == "") rachunekUrzeduSkarbowego = '51 1010 1078 0024 1122 2100 0000';
		if (kwota == "") kwota = helpers.losujKwote();
		rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		//rachunekNadawcy,nazwaPlatnika,typIdentyfikatoraUzupelniajacego,numerIdentyfikatoraUzupelniajacego,symbolFormularza,
		//typOkresu,numerOkresu,rokOkresu,identyfokacjaZobowiazania,dataRealizacji,kwota,hasloSms
		winston.log('info', "Dane testu: rachunekNadawcy=" + rachunekNadawcy + " rachunekUrzeduSkarbowego=" + rachunekUrzeduSkarbowego + " nazwaPlatnika=" + nazwaPlatnika + " typIdentyfikatoraUzupelniajacego=" + typIdentyfikatoraUzupelniajacego + " numerIdentyfikatoraUzupelniajacego=" + numerIdentyfikatoraUzupelniajacego + " symbolFormularza=" + symbolFormularza);
		winston.log('info', "Dane testu: typOkresu=" + typOkresu + " numerOkresu=" + numerOkresu + " rokOkresu=" + rokOkresu + " identyfokacjaZobowiazania=" + identyfokacjaZobowiazania);
		winston.log('info', "Dane testu: dataRealizacji=" + dataRealizacji + " kwota=" + kwota + " hasloSms=" + hasloSms);

		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do US/IC');
		// browser.driver.sleep(10000);
		helpers.waitUntilReady(fzRachunku);
		fzRachunku.click();
		browser.driver.sleep(3000);
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountNo', rachunekNadawcy);
		// browser.driver.sleep(5000);
		helpers.waitUntilReady(fdostepneSrodki);
		helpers.wyliczSaldoOczekiwanePo(fdostepneSrodki, kwota).then(function(value) {
			helpers.waitUntilReady(fRachunekUrzSkarb);
			fRachunekUrzSkarb.sendKeys(rachunekUrzeduSkarbowego);
			helpers.waitUntilReady(fnazwaPlatnika);
			fnazwaPlatnika.sendKeys(nazwaPlatnika);
			helpers.waitUntilReady(ftypIdentyfikatoraUzupelniajacego);
			ftypIdentyfikatoraUzupelniajacego.click();
			helpers.wybierzElementZListyPoNumerze(numertypIdentyfikatoraUzup);
			// browser.driver.sleep(1000);
			helpers.waitUntilReady(fnumerIdentyfikatoraUzupelniajacego);
			fnumerIdentyfikatoraUzupelniajacego.sendKeys(numerIdentyfikatoraUzupelniajacego);
			// browser.driver.sleep(1000);
			helpers.waitUntilReady(fsymbolFormularza);
			fsymbolFormularza.click();
			// browser.driver.sleep(1000);
			helpers.wybierzElementZListyPoTekscie('formSymbol in $select.items track by $index', symbolFormularza);
			// browser.driver.sleep(2000);
			if ((typOkresu != "") && (numerOkresu != "") && (rokOkresu != "")) {
				console.log('puste wartosci');
				helpers.waitUntilReady(ftypOkresu);
				ftypOkresu.click();
				browser.driver.sleep(2000);
				helpers.wybierzElementZListyPoTekscie('periodTypeCode in $select.items track by $index', typOkresu);
				if (typOkresu == 'J - dzień') {
					fnumerOkresu.sendKeys(numerOkresu);
				} else if (typOkresu != 'R - rok') {
					fnumerOkresu.click();
					// browser.driver.sleep(1000);
					helpers.wybierzElementZListyPoTekscie('periodNo in $select.items track by $index', numerOkresu);
				}
				// browser.driver.sleep(1000);
				helpers.waitUntilReady(frokOkresu);
				frokOkresu.sendKeys(rokOkresu);
			}
			helpers.waitUntilReady(fidentyfokacjaZobowiazania);
			fidentyfokacjaZobowiazania.sendKeys(identyfokacjaZobowiazania);
			// browser.driver.sleep(1000);
			helpers.waitUntilReady(fkwota);
			fkwota.sendKeys(kwota);
			// browser.driver.sleep(5000);
			if (dataRealizacji != "") {
				fdataRealizacji.click();
				fdataRealizacji.clear();
				fdataRealizacji.sendKeys(dataRealizacjiNew);
			}
			helpers.waitUntilReady(fdalej);
			fdalej.click().then(function() {
				winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
			});
			// browser.driver.sleep(12000);
			helpers.waitUntilReady(fkodSms);
			fkodSms.sendKeys(hasloSms);
			helpers.waitUntilReady(fzatwierdz);
			fzatwierdz.click().then(function() {
				winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
			});
			// browser.driver.sleep(5000);
			helpers.waitUntilReady(fpotwierdzenie);
			expect(fpotwierdzenie.getText()).not.toContain("Przelew/transakcja odrzucona");
			expect(fpotwierdzenie.getText()).not.toContain("Przelew został odrzucony");
			if (dataRealizacji == "")
				rachunki.sprawdzOperacjeNaHistorii(rachunekNadawcy, symbolFormularza, kwota, value);
		});
	}

	this.przelewDoUSwaldacjapolaNazwaPlat = function(rachunekNadawcy, nazwaPlatnika) {
		rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		if (nazwaPlatnika == "") nazwaPlatnika = "nazwaPlatnika" + random;
		winston.log('info', "Dane testu: rachunekNadawcy=" + rachunekNadawcy + " nazwaPlatnika=" + nazwaPlatnika);
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do US/IC');
		browser.driver.sleep(5000);
		fzRachunku.click();
		browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountNo', rachunekNadawcy);
		fnazwaPlatnika.sendKeys('adsads');
		fnazwaPlatnika.clear().sendKeys('');
		expect(fKomNazwaPlatnika.getText()).toEqual('Dane płatnika nie mogą być puste');
		fnazwaPlatnika.sendKeys('1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');
		browser.driver.sleep(1000);
		expect(fKomNazwaPlatnika.getText()).toEqual('Dane płatnika nie mogą przekraczać 132 znaków i powinny zawierać wyłącznie litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \'  , /');

	}

	this.przelewDoUSwaldacjapolaRachUrzSkarb = function(rachunekNadawcy) {
		rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		console.log("=" + rachunekNadawcy + "=");
		winston.log('info', "Dane testu: rachunekNadawcy=" + rachunekNadawcy);
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do US/IC');
		browser.driver.sleep(5000);
		fzRachunku.click();
		browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountNo', rachunekNadawcy);
		browser.driver.sleep(1000);
		fRachunekUrzSkarb.click();
		fnazwaPlatnika.click();
		browser.driver.sleep(1000);
		expect(fKomNazwaPlatnika.getText()).toEqual('Rachunek Urzędu Skarbowego nie może być pusty');

	}

	this.przelewDoUSwaldacjapolaRachUrzSkarbformat = function(rachunekNadawcy) {
		rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		console.log("=" + rachunekNadawcy + "=");
		winston.log('info', "Dane testu: rachunekNadawcy=" + rachunekNadawcy);
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do US/IC');
		browser.driver.sleep(2000);
		fzRachunku.click();
		browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountNo', rachunekNadawcy);
		browser.driver.sleep(2000);
		fRachunekUrzSkarb.click();
		browser.driver.sleep(2000);
		fRachunekUrzSkarb.sendKeys('11');
		browser.driver.sleep(1000);
		fnazwaPlatnika.click();
		browser.driver.sleep(1000);
		expect(fKomunikat2.getText()).toEqual('Rachunek Urzędu Skarbowego musi być zgodny z formatem NRB [CCBBBBBBBBAAAAAAAAAAAAAAAA lub CC BBBB BBBB AAAA AAAA AAAA AAAA]');

	}

	this.przelewDoUSwaldacjapolaNIP = function(rachunekNadawcy, nazwaPlatnika) {
		rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		if (nazwaPlatnika == "") nazwaPlatnika = "nazwaPlatnika" + random;
		winston.log('info', "Dane testu: rachunekNadawcy=" + rachunekNadawcy + " nazwaPlatnika=" + nazwaPlatnika);
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do US/IC');
		browser.driver.sleep(2000);
		fzRachunku.click();
		browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountNo', rachunekNadawcy);
		browser.driver.sleep(2000);
		helpers.wybierzElementZListyPoNumerze(4);
		browser.driver.sleep(3000);
		fnazwaPlatnika.sendKeys(nazwaPlatnika);
		browser.driver.sleep(1000);
		fnumerIdentyfikatoraUzupelniajacego.click();
		browser.driver.sleep(3000);
		fsymbolFormularza.click();
		browser.driver.sleep(3000);
		expect(fKomNIP.getText()).toEqual('Numer identyfikatora uzupełniającego nie może być pusty');
		helpers.wybierzElementZListyPoNumerze(5);
		browser.driver.sleep(3000);
		expect(fKomNIP.getText()).toEqual('Numer identyfikatora uzupełniającego nie może być pusty');

	}

	this.przelewDoUSwaldacjapolaNIPformat = function() {
		var numertypIdentyfikatoraUzup = 0;
		helpers.waitUntilReady(fplatnosci);
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do US/IC');
		browser.driver.sleep(2000);
		ftypIdentyfikatoraUzupelniajacego.click();
		helpers.wybierzElementZListyPoNumerze(1);
		browser.driver.sleep(1000);
		fnumerIdentyfikatoraUzupelniajacego.sendKeys('11');
		browser.driver.sleep(1000);
		fsymbolFormularza.click();
		browser.driver.sleep(1000);
		expect(fKomNIP.getText()).toEqual('Niepoprawny numer NIP/ PESEL / REGON / dowodu osobistego / paszportu / innego dowodu tożsamości');
		ftypIdentyfikatoraUzupelniajacego.click();
		helpers.wybierzElementZListyPoNumerze(2);
		browser.driver.sleep(1000);
		expect(fKomNIP.getText()).toEqual('Niepoprawny numer NIP/ PESEL / REGON / dowodu osobistego / paszportu / innego dowodu tożsamości');
		ftypIdentyfikatoraUzupelniajacego.click();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do US/IC');
		browser.driver.sleep(1000);
		expect(fKomNIP.getText()).toEqual('Niepoprawny numer NIP/ PESEL / REGON / dowodu osobistego / paszportu / innego dowodu tożsamości');

	}

	this.przelewDoUSwaldacjapolaKWOTA = function() {
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do US/IC');
		browser.driver.sleep(2000);
		fkwota.click();
		browser.driver.sleep(3000);
		fidentyfokacjaZobowiazania.click();
		expect(fKomKwota.getText()).toEqual('Pole kwota jest wymagane');

	}

	this.przelewDoUSwaldacjapolaKWOTA2 = function() {
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do US/IC');
		browser.driver.sleep(2000);
		fkwota.sendKeys('as');
		browser.driver.sleep(3000);
		fidentyfokacjaZobowiazania.click();
		expect(fKomKwota.getText()).toEqual('Nieprawidłowa kwota przelewu');

	}

	this.przelewDoUSwaldacjapolaKWOTA3 = function() {
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do US/IC');
		browser.driver.sleep(2000);
		fkwota.sendKeys('99999999999999999999');
		browser.driver.sleep(3000);
		fidentyfokacjaZobowiazania.click();
		expect(fKomKwota.getText()).toEqual('Kwota przelewu przekracza środki dostępne na rachunku');

	}



	this.przelewDoUSwaldacjapolaKWOTA4 = function() {
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do US/IC');
		browser.driver.sleep(2000);
		fkwota.sendKeys('99999');
		browser.driver.sleep(5000);
		fidentyfokacjaZobowiazania.click();
		expect(fKomKwota.getText()).toEqual('Przelew nie może być wykonany jako płatność Elixir');

	}

	this.przelewDoUSwaldacjapolaDATA = function() {
		var dataBiezacaPlus180 = helpers.dataBiezacaPlusDzien(180);
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do US/IC');
		browser.driver.sleep(2000);
		helpers.scrollWindow(fdataRealizacji);
		fdatar = fdataRealizacji.element(by.model('ngModel'));
		fdatar.sendKeys('123');
		browser.driver.sleep(1000);
		expect(fKomdataRealizacji.getText()).toEqual('Niepoprawna data realizacji przelewu');
		fdatar.clear();
		fdatar.sendKeys('01.01.2001');
		expect(fKomdataRealizacji.getText()).toEqual('Data realizacji przelewu nie może być wcześniejsza niż data bieżąca');
		fdatar.clear();
		fdatar.sendKeys('01.01.2222');
		expect(fKomdataRealizacji.getText()).toEqual('Data realizacji przelewu nie może być późniejsza niż ' + dataBiezacaPlus180);
		fdatar.clear();
		fdatar.sendKeys('');
		expect(fKomdataRealizacji.getText()).toEqual('Data realizacji przelewu nie może być pusta');

	}


	this.przelewDoUSwaldacjapolaSymbolFormularza = function() {
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do US/IC');
		browser.driver.sleep(2000);
		fsymbolFormularza.click();
		helpers.wybierzElementZListyPoNumerze(helpers.zwrocNumerSymboluFormularza('AKC'));
		browser.driver.sleep(2000);
		ftypOkresu.click();
		helpers.wybierzElementZListyPoNumerze(numertypOkresu);
		browser.driver.sleep(2000);
		fnumerOkresu.click();
		fnumerOkresu.sendKeys('1');
		browser.driver.sleep(2000);
		expect(fKomNumerOkresu.getText()).toEqual('Jeżeli dla wybranego symbolu formularza konieczne jest wprowadzenie okresu i w polu Typ okresu, wybrana jest wartość J – dzień, to pole Numer okresu powinno zawierać wartość DDMM składającą się z samych cyfr, gdzie: 01 <= DD<=31 oraz 01 <= MM<=12');
		browser.driver.sleep(2000);
		fnumerOkresu.clear();
		fsymbolFormularza.click();
		helpers.wybierzElementZListyPoNumerze(helpers.zwrocNumerSymboluFormularza('AKC-2'));
		expect(fKomSymbolFormularza.getText()).toEqual('Dla wybranego symbolu formularza musisz wybrać typ okresu');
		browser.driver.sleep(2000);
		ftypOkresu.click();
		helpers.wybierzElementZListyPoNumerze(numertypOkresu);
		browser.driver.sleep(2000);
		frokOkresu.click();
		browser.driver.sleep(2000);
		fidentyfokacjaZobowiazania.click();
		browser.driver.sleep(2000);
		expect(fKomRokOkresu.getText()).toEqual('Dla wybranego symbolu formularza rok okresu nie może być pusty');
		browser.driver.sleep(2000);
		frokOkresu.click();
		frokOkresu.sendKeys('1');
		expect(fKomRokOkresu.getText()).toEqual('Dla wybranego symbolu formularza rok okresu musi składać się z 2 cyfr');
		ftypOkresu.click();
		helpers.wybierzElementZListyPoNumerze(2);
		browser.driver.sleep(1000);
		fnumerOkresu.click();
		browser.driver.sleep(1000);
		fnazwaPlatnika.click();
		browser.driver.sleep(1000);
		expect(fKomNumerOkresu.getText()).toEqual('Numer okresu nie może być pusty');

	}

	this.przelewDoUSwaldacjapolaIdentyfikatorzobowiazania = function() {
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do US/IC');
		browser.driver.sleep(3000);
		fidentyfokacjaZobowiazania.click();
		fidentyfokacjaZobowiazania.sendKeys('12345678912345674981234567981233333333333');
		expect(fKomidentyfokacjaZobowiazania.getText()).toEqual('Identyfikacja zobowiązania nie może przekraczać 40 znaków i powinna zawierać wyłącznie litery, cyfry oraz znaki : ; , . \\');

	}


};
module.exports = new payments();