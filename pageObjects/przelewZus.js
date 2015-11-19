var przelewZus = function() {
	var rachunki = require('../pageObjects/rachunkiMiniApp.js');
	var buttons = require('../pageObjects/buttons.js');
	var helpers = require('../pageObjects/helpers.js');
	var platnosci = require('../pageObjects/platnosci.js');
	var winston = require('winston');

	var fplatnosci = element(by.cssContainingText('.widget-tile__widget-header__title', 'Płatności'));
	var fplatnosciPrzelewy = element(by.css('[ui-sref="payments.new.fill({ paymentType: \'domestic\' })"]'));
	var fMojBank = element(by.css('[class="rb-header__menu__content"]')).element(by.css('[ui-sref="dashboard"]'));
	//powtarzalne
	var fkodSms = element(by.model('rbModel.input.model'));
	var fpotwierdzenie = element(by.css('[class="bd-msg-panel__message"]'));
	//krok1 przelew krajowy
	var ftypPlatnosci = element(by.model('payment.type'));
	var fzRachunku = element(by.model('selection.account'));
	var fdostepneSrodki = element(by.css('[class="bd-amount__value"]'));
	var frachunekOdbiorcy = element(by.model('payment.formData.recipientAccountNo'));
	var fnazwaOdbiorcy = element(by.model('payment.formData.recipientName')); //tez Nazwa płatnika ZUS
	var fnazwaPlatnikaZUS = element(by.model('payment.formData.recipientName'));
	var ftytul = element(by.model('payment.formData.description'));
	var fkwota = element(by.model('payment.formData.amount'));
	var fdalej = buttons.dalej;
	var fzatwierdz = buttons.zatwierdz;
	//Przelew do ZUS
	var fnipPlatnika = element(by.model('payment.formData.nip'));
	var ftypDrugiegoIdentyfikatora = element(by.model('payment.formData.secondaryIdType'));
	var fdrugiIdentyfikator = element(by.model('payment.formData.secondaryIdNo'));
	var ftypWpłaty = element(by.model('payment.formData.paymentType'));
	var fdeklaracja = element(by.model('payment.formData.declarationDate'));
	var fnumerDeklaracji = element(by.model('payment.formData.declarationNo'));
	var finformacjeDodatkowe = element(by.model('payment.formData.additionalInfo'));
	//name="realizationDate"
	var fubezpieczenieSpoleczne = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(0)).element(by.model('$option.active'));
	var fkwotaUbezpieczenieSpoleczne = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(0)).element(by.model('payment.formData.insurancePremiums[insuranceType].amount'));
	var fubezpieczenieZdrowotne = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(1)).element(by.model('$option.active'));
	var fkwotaubezpieczenieZdrowotne = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(1)).element(by.model('payment.formData.insurancePremiums[insuranceType].amount'));
	var fubezpieczenieFPiFGSP = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(2)).element(by.model('$option.active'));
	var fkwotaubezpieczenieFPiFGSP = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(2)).element(by.model('payment.formData.insurancePremiums[insuranceType].amount'));
	var ffunduszEmeryturPomostowych = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(3)).element(by.model('$option.active'));
	var fkwotafunduszEmeryturPomostowych = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(3)).element(by.model('payment.formData.insurancePremiums[insuranceType].amount'));
	var fdataRealizacji = element(by.model('ngModel'));
	var finformacjeDodatkoweNovalidate = element(by.name('additionalInfo'));
	//komunikaty
	var fNazwaPlatnikaKomunikat = element(by.css('[class="messages ng-inactive"]'));
	var fNipPlatnikaKomunikat = element(by.id('taxpayerNip'));
	var fDrugiIdentyfikatorKomunikat = element(by.id('taxpayerSupplementaryId'));
	var fDeklaracjaKomunikat = element(by.id('declarationDate'));
	var fNumerDeklaracjiKomunikat = element(by.id('declarationNo'));
	var fDataKomunikat = element(by.id('realizationDate'));
	var finformacjeDodatkoweKomunikat = element(by.id('additionalInfo'));
	var fUbezpieczenieKomunikat = element(by.id('insuranceErrors'));
	var fubezpieczenieSpoleczneKomunikat = element(by.id('SOCIALAmount'));
	var fubezpieczenieZdrowotneKomunikat = element(by.id('HEALTHAmount'));
	var fubezpieczenieFPiFGSPKomunikat = element(by.id('FPIFGSPAmount'));
	var ffunduszEmeryturPomostowychKomunikat = element(by.id('PENSIONAmount'));
	var fPoleSaldo = element(by.css('[class="bd-amount__value"]'));

	this.przelewDoZUS = function(rachunekNadawcy, nazwaOdbiorcy, nipPlatnika, typDrugiegoIdentyfikatora, drugiIdentyfikator, typWpłaty, deklaracja, numerDeklaracji, informacjeDodatkowe, dataRealizacji, kwotaUbezpieczenieSpoleczne, kwotaubezpieczenieZdrowotne, kwotaubezpieczenieFPiFGSP, kwotafunduszEmeryturPomostowych, dataRealizacji, hasloSms) {
		var saldoPrzed = 0;
		var saldoOczekiwanePo = 0;
		var numerTypDrugiegoIdentyfikatora = 0;
		var numerTypWplaty = 0;
		var random = Math.random();
		rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		if (dataRealizacji != "") dataRealizacjiNew = helpers.dataBiezacaPlusDzien(dataRealizacji);
		if (hasloSms == "") {
			hasloSms = '1111';
		}
		if (nipPlatnika == "") {
			nipPlatnika = helpers.tworzNip();
			console.log("nip=" + nipPlatnika);
		}
		if (nazwaOdbiorcy == "") {
			nazwaOdbiorcy = "nazwaOdbiorcy" + random;
		}
		if ((typDrugiegoIdentyfikatora == "")) {
			typDrugiegoIdentyfikatora = ("R - REGON");
		}
		if ((typWpłaty == "")) {
			typWpłaty = ('S - Składka za jeden miesiąc');
		}
		if ((deklaracja == "")) {
			deklaracja = ('201405');
		}
		if ((numerDeklaracji == "")) {
			numerDeklaracji = ('01');
		}
		if ((typDrugiegoIdentyfikatora == "P - PESEL") && (drugiIdentyfikator == "")) {
			drugiIdentyfikator = helpers.tworzPesel();
			console.log("PESEL=" + drugiIdentyfikator);
		}
		if (typDrugiegoIdentyfikatora == "R - REGON") {
			numerTypDrugiegoIdentyfikatora = 1;
			if (drugiIdentyfikator == "") {
				drugiIdentyfikator = helpers.tworzRegon();
				console.log("REGON=" + drugiIdentyfikator);
		}
		}
		if (typDrugiegoIdentyfikatora == "1 - Dowód osobisty") {
			numerTypDrugiegoIdentyfikatora = 2;
			if (drugiIdentyfikator == "") {
				drugiIdentyfikator = helpers.tworzDowod();
				console.log("Dowód osobisty=" + drugiIdentyfikator);
		}
		}
		if (typDrugiegoIdentyfikatora == "2 - Paszport") {
			numerTypDrugiegoIdentyfikatora = 3;
			if (drugiIdentyfikator == "") {
				drugiIdentyfikator = "OD8008032";
				console.log("Paszport=" + drugiIdentyfikator);
		}
		}
		if (informacjeDodatkowe == "") {
			informacjeDodatkowe = "infDod";
		}
		switch (typWpłaty) {
			case 'M - Składka dłuższa niż jeden miesiąc':
				numerTypWplaty = 1;
				break;
			case 'U - Układ ratalny':
				numerTypWplaty = 2;
				break;
			case 'T - Odroczenie terminu':
				numerTypWplaty = 3;
				break;
			case 'E - Egzekucja':
				numerTypWplaty = 4;
				break;
			case 'A - Opłata dodatkowa Płatnika':
				numerTypWplaty = 5;
				break;
			case 'B - Opłata dodatkowa Pośrednika':
				numerTypWplaty = 6;
				break;
			case 'D - Opłata dodatkowa':
				numerTypWplaty = 7;
				break;
			default:
				//S - Składka za jeden miesiąc
				numerTypWplaty = 0;
		}
		if (kwotaubezpieczenieZdrowotne == "" && kwotaUbezpieczenieSpoleczne == "" && kwotaubezpieczenieFPiFGSP == "" && kwotafunduszEmeryturPomostowych == "") kwotaUbezpieczenieSpoleczne = helpers.losujKwote();
		var kwotaN = Number(kwotaubezpieczenieZdrowotne) + Number(kwotaUbezpieczenieSpoleczne) + Number(kwotaubezpieczenieFPiFGSP) + Number(kwotafunduszEmeryturPomostowych);
		var kwota = String(kwotaN);
		var kwotaHistoria = helpers.zwrocOstatniaKwoteZUS(kwotaUbezpieczenieSpoleczne, kwotaubezpieczenieZdrowotne, kwotaubezpieczenieFPiFGSP, kwotafunduszEmeryturPomostowych);
		kwotaHistoria = helpers.formatujKwoteDoWyswietleniaNaStonie(kwotaHistoria);
		winston.log('info', "Dane testu: rachunekNadawcy=" + rachunekNadawcy + " nazwaOdbiorcy=" + nazwaOdbiorcy + " nipPlatnika=" + nipPlatnika + " typDrugiegoIdentyfikatora=" + typDrugiegoIdentyfikatora + " drugiIdentyfikator=" + drugiIdentyfikator);
		winston.log('info', "Dane testu: typWpłaty=" + typWpłaty + " deklaracja=" + deklaracja + " numerDeklaracji=" + numerDeklaracji + " informacjeDodatkowe=" + nazwaOdbiorcy + " dataRealizacji=" + dataRealizacji + " kwotaUbezpieczenieSpoleczne=" + kwotaUbezpieczenieSpoleczne);
		winston.log('info', "Dane testu: kwotaubezpieczenieFPiFGSP=" + kwotaubezpieczenieFPiFGSP + " kwotafunduszEmeryturPomostowych=" + kwotafunduszEmeryturPomostowych + " hasloSms=" + hasloSms);

		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do ZUS');
		// browser.driver.sleep(2000);
		helpers.waitUntilReady(fzRachunku);
		fzRachunku.click();
		// browser.driver.sleep(5000);
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountNo', rachunekNadawcy);
		helpers.waitUntilReady(fnazwaOdbiorcy);
		fnazwaOdbiorcy.sendKeys(nazwaOdbiorcy);
		helpers.waitUntilReady(fdostepneSrodki);
		helpers.wyliczSaldoOczekiwanePo(fdostepneSrodki, kwota).then(function(value) {
			helpers.waitUntilReady(fnipPlatnika);
			fnipPlatnika.sendKeys(nipPlatnika);
			// browser.driver.sleep(2000);
			ftypDrugiegoIdentyfikatora.click();
			browser.driver.sleep(2000);
			helpers.wybierzElementZListyPoNumerze(numerTypDrugiegoIdentyfikatora);
			// browser.driver.sleep(1000);
			helpers.waitUntilReady(fdrugiIdentyfikator);
			fdrugiIdentyfikator.sendKeys(drugiIdentyfikator);
			// browser.driver.sleep(1000);
			helpers.waitUntilReady(ftypWpłaty);
			ftypWpłaty.click();
			browser.driver.sleep(2000);
			helpers.wybierzElementZListyPoNumerze(numerTypWplaty);
			// browser.driver.sleep(1000);
			helpers.waitUntilReady(fdeklaracja);
			fdeklaracja.sendKeys(deklaracja);
			// browser.driver.sleep(1000);
			fnumerDeklaracji.sendKeys(numerDeklaracji);
			// browser.driver.sleep(2000);
			if ((typWpłaty != 'S - Składka za jeden miesiąc') && (typWpłaty != 'M - Składka dłuższa niż jeden miesiąc')) {
				helpers.waitUntilReady(finformacjeDodatkowe);
				finformacjeDodatkowe.click();
				helpers.waitUntilReady(finformacjeDodatkowe);
				finformacjeDodatkowe.sendKeys(informacjeDodatkowe);
			}
			if (dataRealizacji != "") {
				fdataRealizacji.clear();
				fdataRealizacji.sendKeys(dataRealizacjiNew);
			}
			//kwoty
			
			if (kwotaUbezpieczenieSpoleczne != "") {
				fubezpieczenieSpoleczne.click();
				fkwotaUbezpieczenieSpoleczne.sendKeys(kwotaUbezpieczenieSpoleczne);
			} else if (kwotaubezpieczenieZdrowotne == "" && kwotaUbezpieczenieSpoleczne == "" && kwotaubezpieczenieFPiFGSP == "" && kwotafunduszEmeryturPomostowych == "") {
				fubezpieczenieSpoleczne.click();
				fkwotaUbezpieczenieSpoleczne.sendKeys(kwotaUbezpieczenieSpoleczne);
			}
			if (kwotaubezpieczenieZdrowotne != "") {
				fubezpieczenieZdrowotne.click();
				fkwotaubezpieczenieZdrowotne.sendKeys(kwotaubezpieczenieZdrowotne);
			}
			if (kwotaubezpieczenieFPiFGSP != "") {
				fubezpieczenieFPiFGSP.click();
				fkwotaubezpieczenieFPiFGSP.sendKeys(kwotaubezpieczenieFPiFGSP);
			}
			if (kwotafunduszEmeryturPomostowych != "") {
				ffunduszEmeryturPomostowych.click();
				fkwotafunduszEmeryturPomostowych.sendKeys(kwotafunduszEmeryturPomostowych);
			}

			// browser.driver.sleep(3000);
			helpers.waitUntilReady(fdalej);
			fdalej.click().then(function() {
				winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
			});
			// browser.driver.sleep(16000);
			helpers.waitUntilReady(fkodSms);
			fkodSms.sendKeys(hasloSms);
			helpers.waitUntilReady(fzatwierdz);
			fzatwierdz.click().then(function() {
				winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
			});
			// browser.driver.sleep(5000);
			helpers.waitUntilReady(fpotwierdzenie);
			expect(fpotwierdzenie.getText()).not.toContain("Przelew/transakcja odrzucona");
			expect(fpotwierdzenie.getText()).not.toContain("odrzuc");
			if (dataRealizacji == "")
				rachunki.sprawdzOperacjeNaHistorii(rachunekNadawcy, 'Ubezpiecz', kwotaHistoria, value);
		});
	};

	this.przelewDoZusWalidacjaNazwyPlatnika = function() {
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do ZUS');
		helpers.waitUntilReady(fnazwaPlatnikaZUS);
		fnazwaPlatnikaZUS.sendKeys('a');
		// browser.driver.sleep(1000);
		fnazwaPlatnikaZUS.clear().sendKeys('');
		expect(fNazwaPlatnikaKomunikat.getText()).toEqual('Nazwa płatnika nie może być pusta');
		fnazwaPlatnikaZUS.sendKeys('1234567890123456789012345678901234567890123456789012345');
		expect(fNazwaPlatnikaKomunikat.getText()).toEqual('Nazwa płatnika nie może przekraczać 54 znaków i powinna zawierać wyłącznie litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \'  , /');
		fMojBank.click();
	};

	this.przelewDoZusWalidacjaPolaNIP = function() {
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do ZUS');
		helpers.waitUntilReady(fnipPlatnika);
		fnipPlatnika.sendKeys('1');
		expect(fNipPlatnikaKomunikat.getText()).toEqual('Niepoprawny numer NIP płatnika');
		fnipPlatnika.clear().sendKeys('');
		expect(fNipPlatnikaKomunikat.getText()).toEqual('NIP płatnika nie może być pusty i powinien składać się z 10 cyfr');
		fMojBank.click();
	};

	this.przelewDoZusWalidacjaDrugiegoIdentyfikatora = function() {
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do ZUS');
		helpers.waitUntilReady(ftypDrugiegoIdentyfikatora);
		ftypDrugiegoIdentyfikatora.click();
		// browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(0);
		browser.driver.sleep(500);
		expect(ftypDrugiegoIdentyfikatora.getText()).toEqual('P - PESEL');
		fdrugiIdentyfikator.sendKeys('1');
		expect(fDrugiIdentyfikatorKomunikat.getText()).toEqual('Niepoprawny numer PESEL / REGON / dowodu osobistego / paszportu');
		fdrugiIdentyfikator.clear().sendKeys('');
		expect(fDrugiIdentyfikatorKomunikat.getText()).toEqual('Numer identyfikatora uzupełniającego nie może być pusty');

		ftypDrugiegoIdentyfikatora.click();
		// browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoNumerze(1);
		helpers.waitUntilReady(ftypDrugiegoIdentyfikatora);
		expect(ftypDrugiegoIdentyfikatora.getText()).toEqual('R - REGON');
		fdrugiIdentyfikator.sendKeys('1');
		expect(fDrugiIdentyfikatorKomunikat.getText()).toEqual('Niepoprawny numer PESEL / REGON / dowodu osobistego / paszportu');
		fdrugiIdentyfikator.clear().sendKeys('');
		expect(fDrugiIdentyfikatorKomunikat.getText()).toEqual('Numer identyfikatora uzupełniającego nie może być pusty');

		ftypDrugiegoIdentyfikatora.click();
		// browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoNumerze(2);
		helpers.waitUntilReady(ftypDrugiegoIdentyfikatora);
		expect(ftypDrugiegoIdentyfikatora.getText()).toEqual('1 - Dowód osobisty');
		fdrugiIdentyfikator.sendKeys('1');
		expect(fDrugiIdentyfikatorKomunikat.getText()).toEqual('Niepoprawny numer PESEL / REGON / dowodu osobistego / paszportu');
		fdrugiIdentyfikator.clear().sendKeys('');
		expect(fDrugiIdentyfikatorKomunikat.getText()).toEqual('Numer identyfikatora uzupełniającego nie może być pusty');

		ftypDrugiegoIdentyfikatora.click();
		// browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoNumerze(3);
		helpers.waitUntilReady(ftypDrugiegoIdentyfikatora);
		expect(ftypDrugiegoIdentyfikatora.getText()).toEqual('2 - Paszport');
		fdrugiIdentyfikator.sendKeys('1');
		fdrugiIdentyfikator.clear().sendKeys('');
		expect(fDrugiIdentyfikatorKomunikat.getText()).toEqual('Numer identyfikatora uzupełniającego nie może być pusty');

	};

	this.przelewDoZusWalidacjaPolaDeklaracja = function() {
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do ZUS');
		helpers.waitUntilReady(fdeklaracja);
		fdeklaracja.sendKeys('1');
		expect(fDeklaracjaKomunikat.getText()).toEqual('Niepoprawna data deklaracji - poprawny format to RRRRMM (gdzie RRRR>1998 i MM>=01 i MM<=12)');
		fdeklaracja.clear().sendKeys('');
		expect(fDeklaracjaKomunikat.getText()).toEqual('Data deklaracji nie może być pusta');
		browser.driver.sleep(1000);
	};


	this.przelewDoZusWalidacjaPolaNumerDeklaracji = function() {
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do ZUS');
		helpers.waitUntilReady(ftypWpłaty);
		//Sprawdzenie dla typu S		
		ftypWpłaty.click();
		browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoNumerze(0);
		fnumerDeklaracji.clear();
		fnumerDeklaracji.sendKeys('1');
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty S lub M numer deklaracji musi być z zakresu 01-89');
		fnumerDeklaracji.clear();
		fnumerDeklaracji.sendKeys('00');
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty S lub M numer deklaracji musi być z zakresu 01-89');
		fnumerDeklaracji.clear();
		fnumerDeklaracji.sendKeys('90');
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty S lub M numer deklaracji musi być z zakresu 01-89');
		fnumerDeklaracji.clear();
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Numer deklaracji nie może być pusty');
		//Sprawdzenie dla typu M
		ftypWpłaty.click();
		browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoNumerze(1);
		fnumerDeklaracji.clear();
		fnumerDeklaracji.sendKeys('1');
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty S lub M numer deklaracji musi być z zakresu 01-89');
		fnumerDeklaracji.clear();
		fnumerDeklaracji.sendKeys('00');
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty S lub M numer deklaracji musi być z zakresu 01-89');
		fnumerDeklaracji.clear();
		fnumerDeklaracji.sendKeys('90');
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty S lub M numer deklaracji musi być z zakresu 01-89');
		fnumerDeklaracji.clear();
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Numer deklaracji nie może być pusty');
		//Sprawdzenie dla typu U
		ftypWpłaty.click();
		browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do ZUS');
		fnumerDeklaracji.clear();
		fnumerDeklaracji.sendKeys('00');
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty A, B, D, E, T lub U numer deklaracji musi mieć wartość 01, 40, 51, 70 lub 80');
		fnumerDeklaracji.clear();
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Numer deklaracji nie może być pusty');
		//Sprawdzenie dla typu T
		ftypWpłaty.click();
		browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoNumerze(3);
		fnumerDeklaracji.clear();
		fnumerDeklaracji.sendKeys('00');
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty A, B, D, E, T lub U numer deklaracji musi mieć wartość 01, 40, 51, 70 lub 80');
		fnumerDeklaracji.clear();
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Numer deklaracji nie może być pusty');
		//Sprawdzenie dla typu E
		ftypWpłaty.click();
		browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoNumerze(4);
		fnumerDeklaracji.clear();
		fnumerDeklaracji.sendKeys('00');
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty A, B, D, E, T lub U numer deklaracji musi mieć wartość 01, 40, 51, 70 lub 80');
		fnumerDeklaracji.clear();
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Numer deklaracji nie może być pusty');
		//Sprawdzenie dla typu A
		ftypWpłaty.click();
		browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoNumerze(5);
		fnumerDeklaracji.clear();
		fnumerDeklaracji.sendKeys('00');
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty A, B, D, E, T lub U numer deklaracji musi mieć wartość 01, 40, 51, 70 lub 80');
		fnumerDeklaracji.clear();
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Numer deklaracji nie może być pusty');
		//Sprawdzenie dla typu B
		ftypWpłaty.click();
		browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoNumerze(6);
		fnumerDeklaracji.clear();
		fnumerDeklaracji.sendKeys('00');
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty A, B, D, E, T lub U numer deklaracji musi mieć wartość 01, 40, 51, 70 lub 80');
		fnumerDeklaracji.clear();
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Numer deklaracji nie może być pusty');
		//Sprawdzenie dla typu D
		ftypWpłaty.click();
		browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoNumerze(7);
		fnumerDeklaracji.clear();
		fnumerDeklaracji.sendKeys('00');
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty A, B, D, E, T lub U numer deklaracji musi mieć wartość 01, 40, 51, 70 lub 80');
		fnumerDeklaracji.clear();
		expect(fNumerDeklaracjiKomunikat.getText()).toEqual('Numer deklaracji nie może być pusty');
	};


	this.przelewDoZusWalidacjaPolaInformacjeDodatkowe = function() {
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do ZUS');
		helpers.waitUntilReady(ftypWpłaty);
		//Sprawdzenie dla typu S		
		ftypWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(0);
		expect(finformacjeDodatkoweNovalidate.isEnabled()).toBe(false);
		//Sprawdzenie dla typu M
		ftypWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(1);
		expect(finformacjeDodatkoweNovalidate.isEnabled()).toBe(false);
		//Sprawdzenie dla typu U
		ftypWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(2);
		finformacjeDodatkowe.clear();
		helpers.waitUntilReady(finformacjeDodatkowe);
		finformacjeDodatkowe.sendKeys('12345678901234567890123456789012345678901234567890123456');
		helpers.waitUntilReady(finformacjeDodatkoweKomunikat);
		expect(finformacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe muszą zawierać nie więcej niż 54 znaki bez spacji');
		finformacjeDodatkowe.clear();
		expect(finformacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe nie mogą być puste i muszą zawierać nie więcej niż 54 znaki bez spacji');
		//Sprawdzenie dla typu T
		ftypWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(3);
		finformacjeDodatkowe.clear();
		helpers.waitUntilReady(finformacjeDodatkowe);
		finformacjeDodatkowe.sendKeys('12345678901234567890123456789012345678901234567890123456');
		helpers.waitUntilReady(finformacjeDodatkoweKomunikat);
		expect(finformacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe muszą zawierać nie więcej niż 54 znaki bez spacji');
		finformacjeDodatkowe.clear();
		expect(finformacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe nie mogą być puste i muszą zawierać nie więcej niż 54 znaki bez spacji');
		//Sprawdzenie dla typu E
		ftypWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(4);
		finformacjeDodatkowe.clear();
		browser.driver.sleep(1000);
		finformacjeDodatkowe.sendKeys('12345678901234567890123456789012345678901234567890123456');
		browser.driver.sleep(1000);
		expect(finformacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe muszą zawierać nie więcej niż 54 znaki bez spacji');
		finformacjeDodatkowe.clear();
		expect(finformacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe nie mogą być puste i muszą zawierać nie więcej niż 54 znaki bez spacji');
		//Sprawdzenie dla typu A
		ftypWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(5);
		finformacjeDodatkowe.clear();
		browser.driver.sleep(1000);
		finformacjeDodatkowe.sendKeys('12345678901234567890123456789012345678901234567890123456');
		browser.driver.sleep(1000);
		expect(finformacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe muszą zawierać nie więcej niż 54 znaki bez spacji');
		finformacjeDodatkowe.clear();
		expect(finformacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe nie mogą być puste i muszą zawierać nie więcej niż 54 znaki bez spacji');
		//Sprawdzenie dla typu B
		ftypWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(6);
		finformacjeDodatkowe.clear();
		browser.driver.sleep(1000);
		finformacjeDodatkowe.sendKeys('12345678901234567890123456789012345678901234567890123456');
		browser.driver.sleep(1000);
		expect(finformacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe muszą zawierać nie więcej niż 54 znaki bez spacji');
		finformacjeDodatkowe.clear();
		expect(finformacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe nie mogą być puste i muszą zawierać nie więcej niż 54 znaki bez spacji');
		//Sprawdzenie dla typu D
		ftypWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(7);
		finformacjeDodatkowe.clear();
		finformacjeDodatkowe.sendKeys('12345678901234567890123456789012345678901234567890123456');
		browser.driver.sleep(1000);
		expect(finformacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe muszą zawierać nie więcej niż 54 znaki bez spacji');
		finformacjeDodatkowe.clear();
		expect(finformacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe nie mogą być puste i muszą zawierać nie więcej niż 54 znaki bez spacji');

	};


	this.przelewDoZusWalidacjaPolaData = function() {
		var dataBiezacaPlus180 = helpers.dataBiezacaPlusDzien(180);
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do ZUS');
		browser.driver.sleep(1000);
		fdatar = fdataRealizacji.element(by.model('ngModel'));
		fdatar.sendKeys('123');
		browser.driver.sleep(1000);
		expect(fDataKomunikat.getText()).toEqual('Niepoprawna data realizacji przelewu');
		fdatar.clear();
		expect(fDataKomunikat.getText()).toEqual('Data realizacji przelewu nie może być pusta');
		fdatar.sendKeys('01.01.2001');
		expect(fDataKomunikat.getText()).toEqual('Data realizacji przelewu nie może być wcześniejsza niż data bieżąca');
		fdatar.clear();
		fdatar.sendKeys('01.01.2222');
		expect(fDataKomunikat.getText()).toEqual('Data realizacji przelewu nie może być późniejsza niż ' + dataBiezacaPlus180);
	};

	this.przelewDoZusWalidacjaTypuUbezpieczenia = function() {
		platnosci.wybierzPlatnosci();
		helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do ZUS');
		helpers.waitUntilReady(fnazwaOdbiorcy);
		fnazwaOdbiorcy.sendKeys('Nazwa');
		fnipPlatnika.sendKeys(helpers.tworzNip());
		ftypDrugiegoIdentyfikatora.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(3);
		fdrugiIdentyfikator.sendKeys('ABC123');
		ftypWpłaty.click();
		browser.driver.sleep(500);
		// helpers.wybierzElementZListyPoTekscie('paymentType in $select.items', 'Przelew do ZUS');
		helpers.wybierzElementZListyPoNumerze(2);
		browser.driver.sleep(500);
		fdeklaracja.sendKeys('201501');
		fnumerDeklaracji.sendKeys('01');
		finformacjeDodatkowe.sendKeys('Info');

		fdalej.click();
		expect(fUbezpieczenieKomunikat.getText()).toEqual('Musisz zaznaczyć przynajmniej jedno ubezpieczenie i wprowadzić poprawną kwotę przelewu');
		browser.driver.sleep(1000);

		//UBEZPIECZENIE SPOŁECZNE
		fubezpieczenieSpoleczne.click();
		fkwotaUbezpieczenieSpoleczne.sendKeys('12,344');
		expect(fubezpieczenieSpoleczneKomunikat.getText()).toEqual('Nieprawidłowa kwota przelewu');
		fkwotaUbezpieczenieSpoleczne.clear();

		// element(by.css('[class="bd-amount__value"]')).getText().then(function(value) {
		// 	fkwotaUbezpieczenieSpoleczne = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(0)).element(by.model('payment.formData.insurancePremiums[insuranceType].amount'));
		// 	fubezpieczenieSpoleczneKomunikat = element(by.id('SOCIALAmount'));
		// 	value = value.replace(/\s+/g, '');
		// 	value = value.replace(',', '.');
		// 	//kwota powyżej środków na rachunku
		// 	fkwotaUbezpieczenieSpoleczne.sendKeys(Number(value) + 0.01);
		// 	expect(fubezpieczenieSpoleczneKomunikat.getText()).toEqual('Kwota przelewu przekracza środki dostępne na rachunku');
		// 	fkwotaUbezpieczenieSpoleczne.clear();
		// 	//sprawdzenie komunikatu Elixir jeżeli środki na rachunku na to pozwalają
		// 	if (Number(value) > 75000.00) {
		// 		fkwotaUbezpieczenieSpoleczne.sendKeys('75000,01');
		// 		expect(fubezpieczenieSpoleczneKomunikat.getText()).toEqual('Przelew nie może być wykonany jako płatność Elixir');
		// 		fkwotaUbezpieczenieSpoleczne.clear();
		// 		winston.log('info', "value > 75000");
		// 	} else {
		// 		winston.log('info', "Środki na rachunku poniżej 75000,00. Brak sprawdzenia komunikatu o Elixir dla Ubezpieczenia Społecznego");
		// 	}
		// });
		fkwotaUbezpieczenieSpoleczne.clear();
		fubezpieczenieSpoleczne.click();

		//UBEZPIECZENIE ZDROWOTNE
		fubezpieczenieZdrowotne.click();
		fkwotaubezpieczenieZdrowotne.sendKeys('12,344');
		expect(fubezpieczenieZdrowotneKomunikat.getText()).toEqual('Nieprawidłowa kwota przelewu');
		fkwotaubezpieczenieZdrowotne.clear();

		// element(by.css('[class="bd-amount__value"]')).getText().then(function(value) {
		// 	fkwotaubezpieczenieZdrowotne = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(1)).element(by.model('payment.formData.insurancePremiums[insuranceType].amount'));
		// 	fubezpieczenieZdrowotneKomunikat = element(by.id('HEALTHAmount'));
		// 	value = value.replace(/\s+/g, '');
		// 	value = value.replace(',', '.');
		// 	//kwota powyżej środków na rachunku
		// 	fkwotaubezpieczenieZdrowotne.sendKeys(Number(value) + 0.01);
		// 	expect(fubezpieczenieZdrowotneKomunikat.getText()).toEqual('Kwota przelewu przekracza środki dostępne na rachunku');
		// 	fkwotaubezpieczenieZdrowotne.clear();
		// 	//sprawdzenie komunikatu Elixir jeżeli środki na rachunku na to pozwalają
		// 	if (Number(value) > 75000.00) {
		// 		fkwotaubezpieczenieZdrowotne.sendKeys('75000,01');
		// 		expect(fubezpieczenieZdrowotneKomunikat.getText()).toEqual('Przelew nie może być wykonany jako płatność Elixir');
		// 		fkwotaubezpieczenieZdrowotne.clear();
		// 		winston.log('info', "value > 75000");
		// 	} else {
		// 		winston.log('info', "Środki na rachunku poniżej 75000,00. Brak sprawdzenia komunikatu o Elixir dla Ubezpieczenia Zdrowotnego");
		// 	}
		// });
		fkwotaubezpieczenieZdrowotne.clear();
		fubezpieczenieZdrowotne.click();

		//UBEZPIECZENIE FP I FGSP
		fubezpieczenieFPiFGSP.click();
		fkwotaubezpieczenieFPiFGSP.sendKeys('12,344');
		expect(fubezpieczenieFPiFGSPKomunikat.getText()).toEqual('Nieprawidłowa kwota przelewu');
		fkwotaubezpieczenieFPiFGSP.clear();

	// 	element(by.css('[class="bd-amount__value"]')).getText().then(function(value) {
	// 		fkwotaubezpieczenieFPiFGSP = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(2)).element(by.model('payment.formData.insurancePremiums[insuranceType].amount'));
	// 		fubezpieczenieFPiFGSPKomunikat = element(by.id('FPIFGSPAmount'));
	// 		value = value.replace(/\s+/g, '');
	// 		value = value.replace(',', '.');
	// 		//kwota powyżej środków na rachunku
	// 		fkwotaubezpieczenieFPiFGSP.sendKeys(Number(value) + 0.01);
	// 		expect(fubezpieczenieFPiFGSPKomunikat.getText()).toEqual('Kwota przelewu przekracza środki dostępne na rachunku');
	// 		fkwotaubezpieczenieFPiFGSP.clear();
	// 		//sprawdzenie komunikatu Elixir jeżeli środki na rachunku na to pozwalają
	// 		if (Number(value) > 75000.00) {
	// 			fkwotaubezpieczenieFPiFGSP.sendKeys('75000,01');
	// 			expect(fubezpieczenieFPiFGSPKomunikat.getText()).toEqual('Przelew nie może być wykonany jako płatność Elixir');
	// 			fkwotaubezpieczenieFPiFGSP.clear();
	// 			winston.log('info', "value > 75000");
	// 		} else {
	// 			winston.log('info', "Środki na rachunku poniżej 75000,00. Brak sprawdzenia komunikatu o Elixir dla Ubezpieczenia FP i FGSP");
	// 		}
	// 	});
	// 	fkwotaubezpieczenieFPiFGSP.clear();
	// 	fubezpieczenieFPiFGSP.click();

		//FUNDUSZ EMERYTUR POMOSTOWYCH
		ffunduszEmeryturPomostowych.click();
		fkwotafunduszEmeryturPomostowych.sendKeys('12,344');
		expect(ffunduszEmeryturPomostowychKomunikat.getText()).toEqual('Nieprawidłowa kwota przelewu');
		fkwotafunduszEmeryturPomostowych.clear();

	// 	element(by.css('[class="bd-amount__value"]')).getText().then(function(value) {
	// 		fkwotafunduszEmeryturPomostowych = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(3)).element(by.model('payment.formData.insurancePremiums[insuranceType].amount'));
	// 		ffunduszEmeryturPomostowychKomunikat = element(by.id('PENSIONAmount'));
	// 		value = value.replace(/\s+/g, '');
	// 		value = value.replace(',', '.');
	// 		//kwota powyżej środków na rachunku
	// 		fkwotafunduszEmeryturPomostowych.sendKeys(Number(value) + 0.01);
	// 		expect(ffunduszEmeryturPomostowychKomunikat.getText()).toEqual('Kwota przelewu przekracza środki dostępne na rachunku');
	// 		fkwotafunduszEmeryturPomostowych.clear();
	// 		//sprawdzenie komunikatu Elixir jeżeli środki na rachunku na to pozwalają
	// 		if (Number(value) > 75000.00) {
	// 			fkwotafunduszEmeryturPomostowych.sendKeys('75000,01');
	// 			expect(ffunduszEmeryturPomostowychKomunikat.getText()).toEqual('Przelew nie może być wykonany jako płatność Elixir');
	// 			fkwotafunduszEmeryturPomostowych.clear();
	// 			winston.log('info', "value > 75000");
	// 		} else {
	// 			winston.log('info', "Środki na rachunku poniżej 75000,00. Brak sprawdzenia komunikatu o Elixir dla Funduszu Emerytur Pomostowych");
	// 		}
	// 	});
	// 	fkwotafunduszEmeryturPomostowych.clear();
	// 	ffunduszEmeryturPomostowych.click();
	};

};

module.exports = new przelewZus();