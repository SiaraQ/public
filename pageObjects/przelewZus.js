var przelewZus = function () {
	var rachunki = require('../pageObjects/rachunkiMiniApp.js');
	var helpers = require('../pageObjects/helpers.js');
	var winston = require('winston');

	this.platnosci = element(by.cssContainingText('.widget-tile__widget-header__title', 'Płatności'));
	this.MojBank = element(by.css('[class="rb-header__menu__content"]')).element(by.css('[ui-sref="dashboard"]'));
	//powtarzalne
	this.kodSms = element(by.model('payment.items.credentials'));
	this.potwierdzenie = element(by.css('[class="bd-msg-panel__message"]'));
	//krok1 przelew krajowy
	this.typPlatnosci = element(by.model('payment.type'));
	this.zRachunku = element(by.model('selection.account'));
	this.dostepneSrodki = element(by.css('[class="bd-amount__value"]'));
	this.rachunekOdbiorcy = element(by.model('payment.formData.recipientAccountNo'));
	this.nazwaOdbiorcy = element(by.model('payment.formData.recipientName')); //tez Nazwa płatnika ZUS
	this.nazwaPlatnikaZUS = element(by.model('payment.formData.recipientName'));
	this.tytul = element(by.model('payment.formData.description'));
	this.kwota = element(by.model('payment.formData.amount'));
	this.dalej = element(by.css('[ng-click="moveNext()"]'));
	this.zatwierdz = element(by.buttonText('Zatwierdź'));
	//Przelew do ZUS
	this.nipPlatnika = element(by.model('payment.formData.nip'));
	this.typDrugiegoIdentyfikatora = element(by.model('payment.formData.secondaryIdType'));
	this.drugiIdentyfikator = element(by.model('payment.formData.secondaryIdNo')); 
	this.typWpłaty = element(by.model('payment.formData.paymentType'));
	this.deklaracja = element(by.model('payment.formData.declarationDate'));
	this.numerDeklaracji = element(by.model('payment.formData.declarationNo'));
	this.informacjeDodatkowe = element(by.model('payment.formData.additionalInfo'));
	this.dataRealizacji= element(by.name('realizationDate'));
	//name="realizationDate"
	this.ubezpieczenieSpoleczne = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(0)).element(by.model('$option.active'));
	this.kwotaUbezpieczenieSpoleczne = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(0)).element(by.model('payment.formData.insurancePremiums[insuranceType].amount'));
	this.ubezpieczenieZdrowotne = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(1)).element(by.model('$option.active'));
	this.kwotaubezpieczenieZdrowotne = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(1)).element(by.model('payment.formData.insurancePremiums[insuranceType].amount'));
	this.ubezpieczenieFPiFGSP = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(2)).element(by.model('$option.active'));
	this.kwotaubezpieczenieFPiFGSP = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(2)).element(by.model('payment.formData.insurancePremiums[insuranceType].amount'));
	this.funduszEmeryturPomostowych = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(3)).element(by.model('$option.active'));
	this.kwotafunduszEmeryturPomostowych = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(3)).element(by.model('payment.formData.insurancePremiums[insuranceType].amount'));
	this.dataRealizacji = element(by.model('payment.formData.realizationDate'));
	this.informacjeDodatkoweNovalidate = element(by.name('additionalInfo'));
	//komunikaty
	this.NazwaPlatnikaKomunikat = element(by.css('[class="messages ng-inactive"]'));  
	this.NipPlatnikaKomunikat = element(by.id('taxpayerNip'));
	this.DrugiIdentyfikatorKomunikat = element(by.id('taxpayerSupplementaryId'));
	this.DeklaracjaKomunikat = element(by.id('declarationDate'));
	this.NumerDeklaracjiKomunikat = element(by.id('declarationNo'));
	this.DataKomunikat = element(by.id('realizationDate'))
	this.informacjeDodatkoweKomunikat = element(by.id('additionalInfo'));
	this.UbezpieczenieKomunikat = element(by.id('insuranceErrors'));
	this.ubezpieczenieSpoleczneKomunikat = 	element(by.id('SOCIALAmount'));
	this.ubezpieczenieZdrowotneKomunikat = element(by.id('HEALTHAmount'));
	this.ubezpieczenieFPiFGSPKomunikat = element(by.id('FPIFGSPAmount'));
	this.funduszEmeryturPomostowychKomunikat = element(by.id('PENSIONAmount'));
	this.PoleSaldo = element(by.css('[class="bd-amount__value"]'));

	this.przelewDoZUS = function(rachunekNadawcy,nazwaOdbiorcy,nipPlatnika,typDrugiegoIdentyfikatora,drugiIdentyfikator,typWpłaty,deklaracja,numerDeklaracji,informacjeDodatkowe,dataRealizacji,kwotaUbezpieczenieSpoleczne,kwotaubezpieczenieZdrowotne,kwotaubezpieczenieFPiFGSP,kwotafunduszEmeryturPomostowych,dataRealizacji,hasloSms) {
		var saldoPrzed=0;
		var saldoOczekiwanePo=0;
		var numerTypDrugiegoIdentyfikatora=0;
		var numerTypWplaty=0;
		var random = Math.random();
		var rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		if (dataRealizacji!="") dataRealizacjiNew=helpers.dataBiezacaPlusDzien(dataRealizacji);
		if (hasloSms=="") {
			hasloSms='1111';
		}
		if (nipPlatnika=="") {
			nipPlatnika=helpers.tworzNip();
			console.log("nip="+nipPlatnika);
		}
		if (nazwaOdbiorcy==""){
			nazwaOdbiorcy="nazwaOdbiorcy"+random;
		}
		if ((typDrugiegoIdentyfikatora=="")){
			typDrugiegoIdentyfikatora=("R - REGON");
			}
		if ((typWpłaty=="")){
			typWpłaty=('S - Składka za jeden miesiąc');
			}
		if ((deklaracja=="")){
			deklaracja=('201405');
			}
		if ((numerDeklaracji=="")){
			numerDeklaracji=('01');
			}	
		if ((typDrugiegoIdentyfikatora=='P - PESEL')&&(drugiIdentyfikator=="")){
				drugiIdentyfikator=helpers.tworzPesel();
				console.log("PESEL="+drugiIdentyfikator);
			}
		if ((typDrugiegoIdentyfikatora=='R - REGON')&&(drugiIdentyfikator=="")){
			numerTypDrugiegoIdentyfikatora=1;
				drugiIdentyfikator=helpers.tworzRegon();
				console.log("REGON="+drugiIdentyfikator);
			}
		if ((typDrugiegoIdentyfikatora=='1 - Dowód osobisty')&&(drugiIdentyfikator=="")){
			numerTypDrugiegoIdentyfikatora=2;
				drugiIdentyfikator=helpers.tworzDowod();
				console.log("Dowód osobisty="+drugiIdentyfikator);
			}
		if ((typDrugiegoIdentyfikatora=='2 - Paszport')&&(drugiIdentyfikator=="")){
			numerTypDrugiegoIdentyfikatora=3;
				drugiIdentyfikator="OD8008032";
				console.log("Paszport="+drugiIdentyfikator);
			}
		if (informacjeDodatkowe==""){
			 informacjeDodatkowe="infDod";
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
		if (kwotaubezpieczenieZdrowotne==""&&kwotaUbezpieczenieSpoleczne==""&&kwotaubezpieczenieFPiFGSP==""&&kwotafunduszEmeryturPomostowych=="") kwotaUbezpieczenieSpoleczne=helpers.losujKwote();
		var kwota = kwotaubezpieczenieZdrowotne + kwotaUbezpieczenieSpoleczne + kwotaubezpieczenieFPiFGSP + kwotafunduszEmeryturPomostowych;

		winston.log('info', "Dane testu: rachunekNadawcy="+rachunekNadawcy+" nazwaOdbiorcy="+nazwaOdbiorcy+" nipPlatnika="+nipPlatnika+" typDrugiegoIdentyfikatora="+typDrugiegoIdentyfikatora+" drugiIdentyfikator="+drugiIdentyfikator);
		winston.log('info', "Dane testu: typWpłaty="+typWpłaty+" deklaracja="+deklaracja+" numerDeklaracji="+numerDeklaracji+" informacjeDodatkowe="+nazwaOdbiorcy+" dataRealizacji="+dataRealizacji+" kwotaUbezpieczenieSpoleczne="+kwotaUbezpieczenieSpoleczne);
		winston.log('info', "Dane testu: kwotaubezpieczenieFPiFGSP="+kwotaubezpieczenieFPiFGSP+" kwotafunduszEmeryturPomostowych="+kwotafunduszEmeryturPomostowych+" hasloSms="+hasloSms);

			helpers.waitUntilReady(this.platnosci);
		this.platnosci.click();
		// browser.driver.sleep(3000);
			helpers.waitUntilReady(this.typPlatnosci);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(2);
		// browser.driver.sleep(2000);
			helpers.waitUntilReady(this.zRachunku);
		this.zRachunku.click();
		// browser.driver.sleep(5000);
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountNo',rachunekNadawcy);
			helpers.waitUntilReady(this.nazwaOdbiorcy);
		this.nazwaOdbiorcy.sendKeys(nazwaOdbiorcy);
			helpers.waitUntilReady(this.dostepneSrodki);
		saldoOczekiwanePo=helpers.wyliczSaldoOczekiwanePo(this.dostepneSrodki,kwota);
			helpers.waitUntilReady(this.nipPlatnika);
		this.nipPlatnika.sendKeys(nipPlatnika);
		// browser.driver.sleep(2000);
		this.typDrugiegoIdentyfikatora.click();
		// browser.driver.sleep(2000);
		helpers.wybierzElementZListyPoNumerze(numerTypDrugiegoIdentyfikatora);
		// browser.driver.sleep(1000);
		this.drugiIdentyfikator.sendKeys(drugiIdentyfikator);
		// browser.driver.sleep(1000);
		this.typWpłaty.click();
		// browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoNumerze(numerTypWplaty);
		// browser.driver.sleep(1000);
		this.deklaracja.sendKeys(deklaracja);
		// browser.driver.sleep(1000);
		this.numerDeklaracji.sendKeys(numerDeklaracji);
		// browser.driver.sleep(2000);
		if ((typWpłaty!='S - Składka za jeden miesiąc')&&(typWpłaty!='M - Składka dłuższa niż jeden miesiąc'))
		{	
			helpers.waitUntilReady(this.informacjeDodatkowe);
            this.informacjeDodatkowe.click();
            this.informacjeDodatkowe.sendKeys(informacjeDodatkowe);
        }
		if (dataRealizacji!="")
		this.dataRealizacji.sendKeys(dataRealizacjiNew);
				//kwoty
		this.ubezpieczenieSpoleczne.click();
		if (kwotaUbezpieczenieSpoleczne!=""){
			this.kwotaUbezpieczenieSpoleczne.sendKeys(kwotaUbezpieczenieSpoleczne);
		} else if (kwotaubezpieczenieZdrowotne==""&&kwotaUbezpieczenieSpoleczne==""&&kwotaubezpieczenieFPiFGSP==""&&kwotafunduszEmeryturPomostowych=="") {
			this.kwotaUbezpieczenieSpoleczne.sendKeys(kwotaUbezpieczenieSpoleczne);
		}
		if (kwotaubezpieczenieZdrowotne!=""){
			this.ubezpieczenieZdrowotne.click();
			this.kwotaubezpieczenieZdrowotne.sendKeys(kwotaubezpieczenieZdrowotne);
		}
		if (kwotaubezpieczenieFPiFGSP!=""){
			this.ubezpieczenieFPiFGSP.click();
			this.kwotaubezpieczenieFPiFGSP.sendKeys(kwotaubezpieczenieFPiFGSP);	
		}
		if (kwotaubezpieczenieFPiFGSP!=""){
			this.funduszEmeryturPomostowych.click();
			this.kwotaubezpieczenieFPiFGSP.sendKeys(kwotaubezpieczenieFPiFGSP);
		}
		// browser.driver.sleep(3000);
			helpers.waitUntilReady(this.dalej);
		this.dalej.click().then(function(){
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
		});
		// browser.driver.sleep(16000);
			helpers.waitUntilReady(this.kodSms);
		this.kodSms.sendKeys(hasloSms);
			helpers.waitUntilReady(this.zatwierdz);
		this.zatwierdz.click().then(function(){
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
		});
		// browser.driver.sleep(5000);
			helpers.waitUntilReady(this.potwierdzenie);
		expect(this.potwierdzenie.getText()).toBe("Przelew/transakcja zrealizowana");
		if (dataRealizacji=="")
		rachunki.sprawdzOperacjeNaHistorii(rachunekNadawcy,'Ubezpiecz',kwota,saldoOczekiwanePo);
	};
	
	this.przelewDoZusWalidacjaNazwyPlatnika = function () {
		this.platnosci.click();
		browser.driver.sleep(1000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(2);
		browser.driver.sleep(500);
		this.nazwaPlatnikaZUS.sendKeys('a');
		// browser.driver.sleep(1000);
		this.nazwaPlatnikaZUS.clear().sendKeys('');
		expect(this.NazwaPlatnikaKomunikat.getText()).toEqual('Nazwa płatnika nie może być pusta');
		this.nazwaPlatnikaZUS.sendKeys('1234567890123456789012345678901234567890123456789012345');
		expect(this.NazwaPlatnikaKomunikat.getText()).toEqual('Nazwa płatnika nie może przekraczać 54 znaków i powinna zawierać wyłącznie litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \'  , /');
		this.MojBank.click();
	};

	this.przelewDoZusWalidacjaPolaNIP = function () {
		this.platnosci.click();
		browser.driver.sleep(2000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(2);
		browser.driver.sleep(500);
		this.nipPlatnika.sendKeys('1');
		expect(this.NipPlatnikaKomunikat.getText()).toEqual('Niepoprawny numer NIP płatnika');
		this.nipPlatnika.clear().sendKeys('');
		expect(this.NipPlatnikaKomunikat.getText()).toEqual('NIP płatnika nie może być pusty i powinien składać się z 10 cyfr');
		this.MojBank.click();
	};

	this.przelewDoZusWalidacjaDrugiegoIdentyfikatora = function () {
		this.platnosci.click();
		browser.driver.sleep(1000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(2);
		browser.driver.sleep(500);
		this.typDrugiegoIdentyfikatora.click();
		// browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(0);
		browser.driver.sleep(500);
		expect(this.typDrugiegoIdentyfikatora.getText()).toEqual('P - PESEL');
		this.drugiIdentyfikator.sendKeys('1');
		expect(this.DrugiIdentyfikatorKomunikat.getText()).toEqual('Niepoprawny numer PESEL / REGON / dowodu osobistego / paszportu');
		this.drugiIdentyfikator.clear().sendKeys('');
		expect(this.DrugiIdentyfikatorKomunikat.getText()).toEqual('Numer identyfikatora uzupełniającego nie może być pusty');

		this.typDrugiegoIdentyfikatora.click();
		// browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoNumerze(1);
		browser.driver.sleep(500);
		expect(this.typDrugiegoIdentyfikatora.getText()).toEqual('R - REGON');
		this.drugiIdentyfikator.sendKeys('1');
		expect(this.DrugiIdentyfikatorKomunikat.getText()).toEqual('Niepoprawny numer PESEL / REGON / dowodu osobistego / paszportu');
		this.drugiIdentyfikator.clear().sendKeys('');
		expect(this.DrugiIdentyfikatorKomunikat.getText()).toEqual('Numer identyfikatora uzupełniającego nie może być pusty');

		this.typDrugiegoIdentyfikatora.click();
		// browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoNumerze(2);
		browser.driver.sleep(500);
		expect(this.typDrugiegoIdentyfikatora.getText()).toEqual('1 - Dowód osobisty');
		this.drugiIdentyfikator.sendKeys('1');
		expect(this.DrugiIdentyfikatorKomunikat.getText()).toEqual('Niepoprawny numer PESEL / REGON / dowodu osobistego / paszportu');
		this.drugiIdentyfikator.clear().sendKeys('');
		expect(this.DrugiIdentyfikatorKomunikat.getText()).toEqual('Numer identyfikatora uzupełniającego nie może być pusty');

		this.typDrugiegoIdentyfikatora.click();
		// browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoNumerze(3);
		browser.driver.sleep(500);
		expect(this.typDrugiegoIdentyfikatora.getText()).toEqual('2 - Paszport');
		this.drugiIdentyfikator.sendKeys('1');
		this.drugiIdentyfikator.clear().sendKeys('');
		expect(this.DrugiIdentyfikatorKomunikat.getText()).toEqual('Numer identyfikatora uzupełniającego nie może być pusty');
		this.MojBank.click();
	};

	this.przelewDoZusWalidacjaPolaDeklaracja = function () {
		this.platnosci.click();
		browser.driver.sleep(1000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(2);
		browser.driver.sleep(500);
		this.deklaracja.sendKeys('1');
		expect(this.DeklaracjaKomunikat.getText()).toEqual('Niepoprawna data deklaracji - poprawny format to RRRRMM (gdzie RRRR>1998 i MM>=01 i MM<=12)');
		this.deklaracja.clear().sendKeys('');
		expect(this.DeklaracjaKomunikat.getText()).toEqual('Data deklaracji nie może być pusta');
		browser.driver.sleep(1000);
		this.MojBank.click();
	};


	this.przelewDoZusWalidacjaPolaNumerDeklaracji = function () {
		this.platnosci.click();
		browser.driver.sleep(1000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(2);
		browser.driver.sleep(500);
		//Sprawdzenie dla typu S		
		this.typWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(0);
		this.numerDeklaracji.clear();
		this.numerDeklaracji.sendKeys('1');
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty S lub M numer deklaracji musi być z zakresu 01-89');
		this.numerDeklaracji.clear();
		this.numerDeklaracji.sendKeys('00');
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty S lub M numer deklaracji musi być z zakresu 01-89');
		this.numerDeklaracji.clear();
		this.numerDeklaracji.sendKeys('90');
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty S lub M numer deklaracji musi być z zakresu 01-89');
		this.numerDeklaracji.clear();
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Numer deklaracji nie może być pusty');
		//Sprawdzenie dla typu M
		this.typWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(1);
		this.numerDeklaracji.clear();
		this.numerDeklaracji.sendKeys('1');
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty S lub M numer deklaracji musi być z zakresu 01-89');
		this.numerDeklaracji.clear();
		this.numerDeklaracji.sendKeys('00');
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty S lub M numer deklaracji musi być z zakresu 01-89');
		this.numerDeklaracji.clear();
		this.numerDeklaracji.sendKeys('90');
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty S lub M numer deklaracji musi być z zakresu 01-89');
		this.numerDeklaracji.clear();
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Numer deklaracji nie może być pusty');
		//Sprawdzenie dla typu U
		this.typWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(2);
		this.numerDeklaracji.clear();
		this.numerDeklaracji.sendKeys('00');
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty A, B, D, E, T lub U numer deklaracji musi mieć wartość 01, 40, 51, 70 lub 80');
		this.numerDeklaracji.clear();
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Numer deklaracji nie może być pusty');
		//Sprawdzenie dla typu T
		this.typWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(3);
		this.numerDeklaracji.clear();
		this.numerDeklaracji.sendKeys('00');
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty A, B, D, E, T lub U numer deklaracji musi mieć wartość 01, 40, 51, 70 lub 80');
		this.numerDeklaracji.clear();
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Numer deklaracji nie może być pusty');
		//Sprawdzenie dla typu E
		this.typWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(4);
		this.numerDeklaracji.clear();
		this.numerDeklaracji.sendKeys('00');
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty A, B, D, E, T lub U numer deklaracji musi mieć wartość 01, 40, 51, 70 lub 80');
		this.numerDeklaracji.clear();
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Numer deklaracji nie może być pusty');
		//Sprawdzenie dla typu A
		this.typWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(5);
		this.numerDeklaracji.clear();
		this.numerDeklaracji.sendKeys('00');
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty A, B, D, E, T lub U numer deklaracji musi mieć wartość 01, 40, 51, 70 lub 80');
		this.numerDeklaracji.clear();
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Numer deklaracji nie może być pusty');
		//Sprawdzenie dla typu B
		this.typWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(6);
		this.numerDeklaracji.clear();
		this.numerDeklaracji.sendKeys('00');
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty A, B, D, E, T lub U numer deklaracji musi mieć wartość 01, 40, 51, 70 lub 80');
		this.numerDeklaracji.clear();
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Numer deklaracji nie może być pusty');
		//Sprawdzenie dla typu D
		this.typWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(7);
		this.numerDeklaracji.clear();
		this.numerDeklaracji.sendKeys('00');
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Niepoprawny numer deklaracji. Dla typu wpłaty A, B, D, E, T lub U numer deklaracji musi mieć wartość 01, 40, 51, 70 lub 80');
		this.numerDeklaracji.clear();
		expect(this.NumerDeklaracjiKomunikat.getText()).toEqual('Numer deklaracji nie może być pusty');
		this.MojBank.click();
	};


		this.przelewDoZusWalidacjaPolaInformacjeDodatkowe = function () {
		this.platnosci.click();
		browser.driver.sleep(1000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(2);
		browser.driver.sleep(1000);
		//Sprawdzenie dla typu S		
		this.typWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(0);
		expect(this.informacjeDodatkoweNovalidate.isEnabled()).toBe(false);
		//Sprawdzenie dla typu M
		this.typWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(1);
		expect(this.informacjeDodatkoweNovalidate.isEnabled()).toBe(false);
		//Sprawdzenie dla typu U
		this.typWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(2);
		this.informacjeDodatkowe.clear();
		browser.driver.sleep(1000);
		this.informacjeDodatkowe.sendKeys('1234567890123456');
		browser.driver.sleep(1000);
		expect(this.informacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe muszą zawierać nie więcej niż 15 znaków bez spacji');
		this.informacjeDodatkowe.clear();
		expect(this.informacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe nie mogą być puste i muszą zawierać nie więcej niż 15 znaków bez spacji');
		//Sprawdzenie dla typu T
		this.typWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(3);
		this.informacjeDodatkowe.clear();
		browser.driver.sleep(1000);
		this.informacjeDodatkowe.sendKeys('1234567890123456');
		browser.driver.sleep(1000);
		expect(this.informacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe muszą zawierać nie więcej niż 15 znaków bez spacji');
		this.informacjeDodatkowe.clear();
		expect(this.informacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe nie mogą być puste i muszą zawierać nie więcej niż 15 znaków bez spacji');
		//Sprawdzenie dla typu E
		this.typWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(4);
		this.informacjeDodatkowe.clear();
		browser.driver.sleep(1000);
		this.informacjeDodatkowe.sendKeys('1234567890123456');
		browser.driver.sleep(1000);
		expect(this.informacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe muszą zawierać nie więcej niż 15 znaków bez spacji');
		this.informacjeDodatkowe.clear();
		expect(this.informacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe nie mogą być puste i muszą zawierać nie więcej niż 15 znaków bez spacji');
		//Sprawdzenie dla typu A
		this.typWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(5);
		this.informacjeDodatkowe.clear();
		browser.driver.sleep(1000);
		this.informacjeDodatkowe.sendKeys('1234567890123456');
		browser.driver.sleep(1000);
		expect(this.informacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe muszą zawierać nie więcej niż 15 znaków bez spacji');
		this.informacjeDodatkowe.clear();
		expect(this.informacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe nie mogą być puste i muszą zawierać nie więcej niż 15 znaków bez spacji');
		//Sprawdzenie dla typu B
		this.typWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(6);
		this.informacjeDodatkowe.clear();
		browser.driver.sleep(1000);
		this.informacjeDodatkowe.sendKeys('1234567890123456');
		browser.driver.sleep(1000);
		expect(this.informacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe muszą zawierać nie więcej niż 15 znaków bez spacji');
		this.informacjeDodatkowe.clear();
		expect(this.informacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe nie mogą być puste i muszą zawierać nie więcej niż 15 znaków bez spacji');
		//Sprawdzenie dla typu D
		this.typWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(7);
		this.informacjeDodatkowe.clear();
		this.informacjeDodatkowe.sendKeys('1234567890123456');
		browser.driver.sleep(1000);
		expect(this.informacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe muszą zawierać nie więcej niż 15 znaków bez spacji');
		this.informacjeDodatkowe.clear();
		expect(this.informacjeDodatkoweKomunikat.getText()).toEqual('Informacje dodatkowe nie mogą być puste i muszą zawierać nie więcej niż 15 znaków bez spacji');
		this.MojBank.click();
	};


	this.przelewDoZusWalidacjaPolaData = function () {
		var dataBiezacaPlus180 = helpers.dataBiezacaPlusDzien(180);
		this.platnosci.click();
		browser.driver.sleep(1000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(2);
		browser.driver.sleep(1000);
		helpers.scrollWindow(this.dataRealizacji);
		this.dataRealizacji.click();
		this.datar = this.dataRealizacji.element(by.model('ngModel'));
		this.datar.sendKeys('123');
		browser.driver.sleep(1000);
		expect(this.DataKomunikat.getText()).toEqual('Niepoprawna data realizacji przelewu');
		this.datar.clear();
		expect(this.DataKomunikat.getText()).toEqual('Data realizacji przelewu nie może być pusta');
		this.datar.sendKeys('01.01.2001');
		expect(this.DataKomunikat.getText()).toEqual('Data realizacji przelewu nie może być wcześniejsza niż data bieżąca');
		this.datar.clear();
		this.datar.sendKeys('01.01.2222');
		expect(this.DataKomunikat.getText()).toEqual('Data realizacji przelewu nie może być późniejsza niż '+dataBiezacaPlus180);
		this.MojBank.click();
	};

	this.przelewDoZusWalidacjaTypuUbezpieczenia = function () {
		this.platnosci.click();
		browser.driver.sleep(3000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(2);
		browser.driver.sleep(1000);
		this.nazwaOdbiorcy.sendKeys('Nazwa');
		this.nipPlatnika.sendKeys(helpers.tworzNip());
		this.typDrugiegoIdentyfikatora.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(3);
		this.drugiIdentyfikator.sendKeys('ABC123');
		this.typWpłaty.click();
		browser.driver.sleep(500);
		helpers.wybierzElementZListyPoNumerze(2);
		this.deklaracja.sendKeys('201501');
		this.numerDeklaracji.sendKeys('01');
		this.informacjeDodatkowe.sendKeys('Info');

		this.dalej.click();
		expect(this.UbezpieczenieKomunikat.getText()).toEqual('Musisz zaznaczyć przynajmniej jedno ubezpieczenie i wprowadzić poprawną kwotę przelewu');
		browser.driver.sleep(1000);

//UBEZPIECZENIE SPOŁECZNE
		this.ubezpieczenieSpoleczne.click();
		this.kwotaUbezpieczenieSpoleczne.sendKeys('12,344');
		expect(this.ubezpieczenieSpoleczneKomunikat.getText()).toEqual('Nieprawidłowa kwota przelewu');
		this.kwotaUbezpieczenieSpoleczne.clear();
	
		element(by.css('[class="bd-amount__value"]')).getText().then(function (value) {
    	this.kwotaUbezpieczenieSpoleczne = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(0)).element(by.model('payment.formData.insurancePremiums[insuranceType].amount'));
    	this.ubezpieczenieSpoleczneKomunikat = 	element(by.id('SOCIALAmount'));
    		value=value.replace(/\s+/g, '');
			value=value.replace(',','.');
			//kwota powyżej środków na rachunku
    		this.kwotaUbezpieczenieSpoleczne.sendKeys(Number(value)+0.01);
			expect(this.ubezpieczenieSpoleczneKomunikat.getText()).toEqual('Kwota przelewu przekracza środki dostępne na rachunku');
			this.kwotaUbezpieczenieSpoleczne.clear();
			//sprawdzenie komunikatu Elixir jeżeli środki na rachunku na to pozwalają
			if (Number(value) > 75000.00) {
				this.kwotaUbezpieczenieSpoleczne.sendKeys('75000,01');
				expect(this.ubezpieczenieSpoleczneKomunikat.getText()).toEqual('Przelew nie może być wykonany jako płatność Elixir');
				this.kwotaUbezpieczenieSpoleczne.clear();
				winston.log('info', "value > 75000");
			} else {
				winston.log('info', "Środki na rachunku poniżej 75000,00. Brak sprawdzenia komunikatu o Elixir dla Ubezpieczenia Społecznego");
			}
		});
		this.kwotaUbezpieczenieSpoleczne.clear();
		this.ubezpieczenieSpoleczne.click();

//UBEZPIECZENIE ZDROWOTNE
		this.ubezpieczenieZdrowotne.click();
		this.kwotaubezpieczenieZdrowotne.sendKeys('12,344');
		expect(this.ubezpieczenieZdrowotneKomunikat.getText()).toEqual('Nieprawidłowa kwota przelewu');
		this.kwotaubezpieczenieZdrowotne.clear();

		element(by.css('[class="bd-amount__value"]')).getText().then(function (value) {
    	this.kwotaubezpieczenieZdrowotne = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(1)).element(by.model('payment.formData.insurancePremiums[insuranceType].amount'));
    	this.ubezpieczenieZdrowotneKomunikat = element(by.id('HEALTHAmount'));
    		value=value.replace(/\s+/g, '');
			value=value.replace(',','.');
			//kwota powyżej środków na rachunku
    		this.kwotaubezpieczenieZdrowotne.sendKeys(Number(value)+0.01);
			expect(this.ubezpieczenieZdrowotneKomunikat.getText()).toEqual('Kwota przelewu przekracza środki dostępne na rachunku');
			this.kwotaubezpieczenieZdrowotne.clear();
			//sprawdzenie komunikatu Elixir jeżeli środki na rachunku na to pozwalają
			if (Number(value) > 75000.00) {
				this.kwotaubezpieczenieZdrowotne.sendKeys('75000,01');
				expect(this.ubezpieczenieZdrowotneKomunikat.getText()).toEqual('Przelew nie może być wykonany jako płatność Elixir');
				this.kwotaubezpieczenieZdrowotne.clear();
				winston.log('info', "value > 75000");
			} else {
				winston.log('info', "Środki na rachunku poniżej 75000,00. Brak sprawdzenia komunikatu o Elixir dla Ubezpieczenia Zdrowotnego");
			}
		});
		this.kwotaubezpieczenieZdrowotne.clear();
		this.ubezpieczenieZdrowotne.click();

//UBEZPIECZENIE FP I FGSP
		this.ubezpieczenieFPiFGSP.click();
		this.kwotaubezpieczenieFPiFGSP.sendKeys('12,344');
		expect(this.ubezpieczenieFPiFGSPKomunikat.getText()).toEqual('Nieprawidłowa kwota przelewu');
		this.kwotaubezpieczenieFPiFGSP.clear();

		element(by.css('[class="bd-amount__value"]')).getText().then(function (value) {
    	this.kwotaubezpieczenieFPiFGSP = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(2)).element(by.model('payment.formData.insurancePremiums[insuranceType].amount'));
    	this.ubezpieczenieFPiFGSPKomunikat = element(by.id('FPIFGSPAmount'));
    		value=value.replace(/\s+/g, '');
			value=value.replace(',','.');
			//kwota powyżej środków na rachunku
    		this.kwotaubezpieczenieFPiFGSP.sendKeys(Number(value)+0.01);
			expect(this.ubezpieczenieFPiFGSPKomunikat.getText()).toEqual('Kwota przelewu przekracza środki dostępne na rachunku');
			this.kwotaubezpieczenieFPiFGSP.clear();
			//sprawdzenie komunikatu Elixir jeżeli środki na rachunku na to pozwalają
			if (Number(value) > 75000.00) {
				this.kwotaubezpieczenieFPiFGSP.sendKeys('75000,01');
				expect(this.ubezpieczenieFPiFGSPKomunikat.getText()).toEqual('Przelew nie może być wykonany jako płatność Elixir');
				this.kwotaubezpieczenieFPiFGSP.clear();
				winston.log('info', "value > 75000");
			} else {
				winston.log('info', "Środki na rachunku poniżej 75000,00. Brak sprawdzenia komunikatu o Elixir dla Ubezpieczenia FP i FGSP");
			}
		});
		this.kwotaubezpieczenieFPiFGSP.clear();
		this.ubezpieczenieFPiFGSP.click();

//FUNDUSZ EMERYTUR POMOSTOWYCH
		this.funduszEmeryturPomostowych.click();
		this.kwotafunduszEmeryturPomostowych.sendKeys('12,344');
		expect(this.funduszEmeryturPomostowychKomunikat.getText()).toEqual('Nieprawidłowa kwota przelewu');
		this.kwotafunduszEmeryturPomostowych.clear();

		element(by.css('[class="bd-amount__value"]')).getText().then(function (value) {
    	this.kwotafunduszEmeryturPomostowych = element(by.repeater('insuranceType in payment.meta.zusInsuranceTypes').row(3)).element(by.model('payment.formData.insurancePremiums[insuranceType].amount'));
    	this.funduszEmeryturPomostowychKomunikat = element(by.id('PENSIONAmount'));
    		value=value.replace(/\s+/g, '');
			value=value.replace(',','.');
			//kwota powyżej środków na rachunku
    		this.kwotafunduszEmeryturPomostowych.sendKeys(Number(value)+0.01);
			expect(this.funduszEmeryturPomostowychKomunikat.getText()).toEqual('Kwota przelewu przekracza środki dostępne na rachunku');
			this.kwotafunduszEmeryturPomostowych.clear();
			//sprawdzenie komunikatu Elixir jeżeli środki na rachunku na to pozwalają
			if (Number(value) > 75000.00) {
				this.kwotafunduszEmeryturPomostowych.sendKeys('75000,01');
				expect(this.funduszEmeryturPomostowychKomunikat.getText()).toEqual('Przelew nie może być wykonany jako płatność Elixir');
				this.kwotafunduszEmeryturPomostowych.clear();
				winston.log('info', "value > 75000");
			} else {
				winston.log('info', "Środki na rachunku poniżej 75000,00. Brak sprawdzenia komunikatu o Elixir dla Funduszu Emerytur Pomostowych");
			}
		});
		this.kwotafunduszEmeryturPomostowych.clear();
		this.funduszEmeryturPomostowych.click();
		this.MojBank.click();
	};

};

module.exports = new przelewZus();