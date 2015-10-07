var payments = function () {
	var rachunki = require('../pageObjects/rachunkiMiniApp.js');
	var helpers = require('../pageObjects/helpers.js');
	var winston = require('winston');
	var deferred = protractor.promise.defer();
	var promise = deferred.promise;
	var random = Math.random();

	this.platnosci = element(by.cssContainingText('.widget-tile__widget-header__title', 'Płatności'));
	this.MojBank = element(by.css('[class="rb-header__menu__content"]')).element(by.css('[ui-sref="dashboard"]'));
	//powtarzalne
	this.kodSms = element(by.model('payment.items.credentials'));
	this.potwierdzenie = element(by.css('[class="bd-msg-panel__message"]'));
	//krok1 przelew krajowy
	this.typPlatnosci = element(by.model('payment.type'));
	this.zRachunku = element(by.model('selection.account'));
	this.dostepneSrodki = element(by.css('[class="bd-amount__value"]'));
	//Rachunek Urzędu Skarbowego
	this.nazwaPlatnika = element(by.model('payment.formData.taxpayerData'));
	this.typIdentyfikatoraUzupelniajacego = element(by.model('payment.formData.idType'));
	this.numerIdentyfikatoraUzupelniajacego = element(by.model('payment.formData.idNumber'));
	this.symbolFormularza = element(by.model('selection.model'));
	this.typOkresu = element(by.model('payment.formData.periodType'));
	this.typOkresuActive = element(by.name('formSymbol'));
	this.numerOkresu = element(by.model('payment.formData.periodNo'));
	this.rokOkresu = element(by.model('payment.formData.periodYear'));
	this.identyfokacjaZobowiazania = element(by.model('payment.formData.obligationId'));
	this.kwota = element(by.model('payment.formData.amount'));
	this.dataRealizacji = element(by.model('payment.formData.realizationDate'));
	this.KomNazwaPlatnika = element(by.css('[class="eb-validation-messages"]'));  
	this.Komunikat2 = element(by.css('[class="messages ng-inactive"]'));
	this.Komunikat3 = element(by.css('[class="validation-message animate-on"]'));
	this.KomNIP = element(by.id('supplementaryId'));
	this.KomKwota = element(by.id('amount'));
	this.KomdataRealizacji = element(by.id('realizationDate'));
	this.KomNumerOkresu = element(by.id('periodNo'));  
	this.KomSymbolFormularza = element(by.id('periodType'));  
	this.KomRokOkresu = element(by.id('periodYear'));  
	this.KomidentyfokacjaZobowiazania=element(by.id('commitmentId'));  
	this.PoleSaldo = element(by.css('[class="bd-amount__value"]'));
	this.RachunekUrzSkarb = element(by.css('[class="rb-tax-account-select__account"]')).element(by.id('recipientAccountNo'));  
	this.dalej = element(by.css('[ng-click="moveNext()"]'));
	this.zatwierdz = element(by.buttonText('Zatwierdź'));

	this.przelewDoUS = function(rachunekNadawcy,rachunekUrzeduSkarbowego,nazwaPlatnika,typIdentyfikatoraUzupelniajacego,numerIdentyfikatoraUzupelniajacego,symbolFormularza,typOkresu,numerOkresu,rokOkresu,identyfokacjaZobowiazania,dataRealizacji,kwota,hasloSms) {
		var numertypOkresu=0;
		var numertypIdentyfikatoraUzup=0;
		var saldoPrzed=0;
		var saldoOczekiwanePo=0;
		var enabled = true;

		if (dataRealizacji!="") dataRealizacjiNew=helpers.dataBiezacaPlusDzien(dataRealizacji);
		if ((typOkresu=="")&&(numerOkresu=="")&&(rokOkresu="")) {
			//puste pola na formatce
			enabled = false;
		} else 
		{
			switch (typOkresu) {
				case 'D - dekada':
			        numertypOkresu = 1;
			        if (numerOkresu=="") numerOkresu="0101";
			        break;
			    case 'M - miesiąc':
			        numertypOkresu = 2;
			        if (numerOkresu=="") numerOkresu="01";
			        break;
			    case 'K - kwartał':
			    	if (numerOkresu=="") numerOkresu="01";
			        numertypOkresu = 3;
			        break;
			    case 'P - półrocze':
			    	if (numerOkresu=="") numerOkresu="01";
			        numertypOkresu = 4;
			        break;
			    case 'R - rok':
			        numertypOkresu = 5;
			        break;
			    default:
			    //J - dzień;
			    	if (numerOkresu=="") numerOkresu="0101";
			        numertypOkresu = 0;
			} 
			if (typOkresu=="") typOkresu="J - dzień";
			if (rokOkresu=="") rokOkresu="15";
		}

		if (typIdentyfikatoraUzupelniajacego=="") typIdentyfikatoraUzupelniajacego="N - Nip";
		switch (typIdentyfikatoraUzupelniajacego) {
	    case 'P - PESEL':
	        numertypIdentyfikatoraUzup = 1;
	        if (numerIdentyfikatoraUzupelniajacego=="") numerIdentyfikatoraUzupelniajacego=helpers.tworzPesel();
	        break;
	    case 'R - REGON':
	        numertypIdentyfikatoraUzup = 2;
	        if (numerIdentyfikatoraUzupelniajacego=="") numerIdentyfikatoraUzupelniajacego=helpers.tworzRegon();
	        break;
	    case '1 - Dowód osobisty':
	    	if (numerIdentyfikatoraUzupelniajacego=="") numerIdentyfikatoraUzupelniajacego=helpers.tworzDowod();
	        numertypIdentyfikatoraUzup = 3;
	        break;
	    case '2 - Paszport':
	    	if (numerIdentyfikatoraUzupelniajacego=="") numerIdentyfikatoraUzupelniajacego="OD8008032";
	        numertypIdentyfikatoraUzup = 4;
	        break;
	    case '3 - Inny dokument tożsamości':
	   		if (numerIdentyfikatoraUzupelniajacego=="") numerIdentyfikatoraUzupelniajacego="Innydokument";
	        numertypIdentyfikatoraUzup = 5;
	        break;
	    default:
	    //N - NIP;
	    	if (numerIdentyfikatoraUzupelniajacego=="") numerIdentyfikatoraUzupelniajacego=helpers.tworzNip();
	        numertypIdentyfikatoraUzup = 0;
		} 
		
		if (symbolFormularza=="") symbolFormularza="CIT-10"
		if (identyfokacjaZobowiazania=="") identyfokacjaZobowiazania="identfZ";
		if (nazwaPlatnika=="") nazwaPlatnika="nazwaPlatnika"+random;
		if (hasloSms=="") hasloSms='1111';
		if (rachunekUrzeduSkarbowego=="") rachunekUrzeduSkarbowego='51101010780024112221000000';
		if (kwota=="")	kwota=helpers.losujKwote();
		rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		//rachunekNadawcy,nazwaPlatnika,typIdentyfikatoraUzupelniajacego,numerIdentyfikatoraUzupelniajacego,symbolFormularza,
		//typOkresu,numerOkresu,rokOkresu,identyfokacjaZobowiazania,dataRealizacji,kwota,hasloSms
		winston.log('info', "Dane testu: rachunekNadawcy="+rachunekNadawcy+" rachunekUrzeduSkarbowego="+rachunekUrzeduSkarbowego+" nazwaPlatnika="+nazwaPlatnika+" typIdentyfikatoraUzupelniajacego="+typIdentyfikatoraUzupelniajacego+" numerIdentyfikatoraUzupelniajacego="+numerIdentyfikatoraUzupelniajacego+" symbolFormularza="+symbolFormularza);
		winston.log('info', "Dane testu: typOkresu="+typOkresu+" numerOkresu="+numerOkresu+" rokOkresu="+rokOkresu+" identyfokacjaZobowiazania="+identyfokacjaZobowiazania);
		winston.log('info', "Dane testu: dataRealizacji="+dataRealizacji+" kwota="+kwota+" hasloSms="+hasloSms);
		
		// browser.driver.sleep(24000);
			helpers.waitUntilReady(this.platnosci);	
		this.platnosci.click();
		// browser.driver.sleep(3000);
			helpers.waitUntilReady(this.typPlatnosci);	
		this.typPlatnosci.click();
			helpers.wybierzElementZListyPoNumerze(3);
		// browser.driver.sleep(10000);
			helpers.waitUntilReady(this.zRachunku);	
		this.zRachunku.click();
		// browser.driver.sleep(3000);
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountNo',rachunekNadawcy);
		// browser.driver.sleep(5000);
			helpers.waitUntilReady(this.dostepneSrodki);
		saldoOczekiwanePo=helpers.wyliczSaldoOczekiwanePo(this.dostepneSrodki,kwota);
			helpers.waitUntilReady(this.RachunekUrzSkarb);	
		this.RachunekUrzSkarb.sendKeys(rachunekUrzeduSkarbowego);
			helpers.waitUntilReady(this.nazwaPlatnika);	
		this.nazwaPlatnika.sendKeys(nazwaPlatnika);
			helpers.waitUntilReady(this.typIdentyfikatoraUzupelniajacego);	
		this.typIdentyfikatoraUzupelniajacego.click();
		helpers.wybierzElementZListyPoNumerze(numertypIdentyfikatoraUzup);
		// browser.driver.sleep(1000);
			helpers.waitUntilReady(this.numerIdentyfikatoraUzupelniajacego);	
		this.numerIdentyfikatoraUzupelniajacego.sendKeys(numerIdentyfikatoraUzupelniajacego);
		// browser.driver.sleep(1000);
			helpers.waitUntilReady(this.symbolFormularza);	
		this.symbolFormularza.click();
		// browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoTekscie('formSymbol in $select.items track by $index',symbolFormularza);
		// browser.driver.sleep(2000);
		if ((typOkresu!="")&&(numerOkresu!="")&&(rokOkresu!="")) {
					helpers.waitUntilReady(this.typOkresu);	
                this.typOkresu.click();
                // browser.driver.sleep(1000);
				helpers.wybierzElementZListyPoTekscie('periodTypeCode in $select.items track by $index',typOkresu);
				if (typOkresu=='J - dzień') {
                    	this.numerOkresu.sendKeys(numerOkresu);
                	} else if (typOkresu!='R - rok'){
                		this.numerOkresu.click();
                		// browser.driver.sleep(1000);
                		helpers.wybierzElementZListyPoTekscie('periodNo in $select.items track by $index',numerOkresu);
                	}
                // browser.driver.sleep(1000);
                	helpers.waitUntilReady(this.rokOkresu);	
				this.rokOkresu.sendKeys(rokOkresu);
		}
			helpers.waitUntilReady(this.identyfokacjaZobowiazania);	
		this.identyfokacjaZobowiazania.sendKeys(identyfokacjaZobowiazania);
		// browser.driver.sleep(1000);
			helpers.waitUntilReady(this.kwota);	
		this.kwota.sendKeys(kwota);
		// browser.driver.sleep(5000);
		if (dataRealizacji!="")
        this.dataRealizacji.sendKeys(dataRealizacjiNew);
   			helpers.waitUntilReady(this.dalej);	
		this.dalej.click().then(function(){
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
		});
		// browser.driver.sleep(12000);
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
		rachunki.sprawdzOperacjeNaHistorii(rachunekNadawcy,symbolFormularza,kwota,saldoOczekiwanePo);
	}

this.przelewDoUSwaldacjapolaNazwaPlat = function(rachunekNadawcy, nazwaPlatnika) {
		rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		if (nazwaPlatnika=="") nazwaPlatnika="nazwaPlatnika"+random;
		winston.log('info', "Dane testu: rachunekNadawcy="+rachunekNadawcy+" nazwaPlatnika="+nazwaPlatnika);
		this.platnosci.click();
		browser.driver.sleep(1000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(3);
		browser.driver.sleep(5000);
		this.zRachunku.click();
		browser.driver.sleep(1000);
		helpers.zwrotNumerElementuNaLiscie('accountItem in $select.items track by accountItem.accountNo',rachunekNadawcy);
		this.nazwaPlatnika.sendKeys('adsads');
		this.nazwaPlatnika.clear().sendKeys('');
		expect(this.KomNazwaPlatnika.getText()).toEqual('Dane płatnika nie mogą być puste');
		this.nazwaPlatnika.sendKeys('1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111');
		browser.driver.sleep(1000);
		expect(this.KomNazwaPlatnika.getText()).toEqual('Dane płatnika nie mogą przekraczać 132 znaków i powinny zawierać wyłącznie litery, cyfry oraz znaki ! @ # $ % ^ & * ( ) - + [ ] { } : ; < > . ? \\ ~ ` \'  , /');
		this.MojBank.click();
		}
		
this.przelewDoUSwaldacjapolaRachUrzSkarb = function(rachunekNadawcy) {
		rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		console.log("="+rachunekNadawcy+"=");
		winston.log('info', "Dane testu: rachunekNadawcy="+rachunekNadawcy);
		this.platnosci.click();
		browser.driver.sleep(1000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(3);
		browser.driver.sleep(5000);
		this.zRachunku.click();
		browser.driver.sleep(1000);
		helpers.zwrotNumerElementuNaLiscie('accountItem in $select.items track by accountItem.accountNo',rachunekNadawcy);
		browser.driver.sleep(1000);
		this.RachunekUrzSkarb.click();
		this.nazwaPlatnika.click();
		browser.driver.sleep(1000);
		expect(this.KomNazwaPlatnika.getText()).toEqual('Rachunek Urzędu Skarbowego nie może być pusty');
		this.MojBank.click();
		}		

this.przelewDoUSwaldacjapolaRachUrzSkarbformat = function(rachunekNadawcy) {
		rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		console.log("="+rachunekNadawcy+"=");
		winston.log('info', "Dane testu: rachunekNadawcy="+rachunekNadawcy);
		this.platnosci.click();
		browser.driver.sleep(1000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(3);
		browser.driver.sleep(2000);
		this.zRachunku.click();
		browser.driver.sleep(1000);
		helpers.zwrotNumerElementuNaLiscie('accountItem in $select.items track by accountItem.accountNo',rachunekNadawcy);
		browser.driver.sleep(2000);
		this.RachunekUrzSkarb.click();
		browser.driver.sleep(2000);
		this.RachunekUrzSkarb.sendKeys('11');
		browser.driver.sleep(1000);
		this.nazwaPlatnika.click();
		browser.driver.sleep(1000);
		expect(this.Komunikat2.getText()).toEqual('Rachunek Urzędu Skarbowego musi być zgodny z formatem NRB [CCBBBBBBBBAAAAAAAAAAAAAAAA lub CC BBBB BBBB AAAA AAAA AAAA AAAA]');
		this.MojBank.click();
		}		
		
this.przelewDoUSwaldacjapolaNIP = function(rachunekNadawcy, nazwaPlatnika) {
		rachunekNadawcy = helpers.zamienRachunekNaNrbZeSpacjami(rachunekNadawcy);
		if (nazwaPlatnika=="") nazwaPlatnika="nazwaPlatnika"+random;
		winston.log('info', "Dane testu: rachunekNadawcy="+rachunekNadawcy+" nazwaPlatnika="+nazwaPlatnika);
		this.platnosci.click();
		browser.driver.sleep(1000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(3);
		browser.driver.sleep(2000);
		this.zRachunku.click();
		browser.driver.sleep(1000);
		helpers.zwrotNumerElementuNaLiscie('accountItem in $select.items track by accountItem.accountNo',rachunekNadawcy);
		browser.driver.sleep(2000);
		helpers.wybierzElementZListyPoNumerze(4);
		browser.driver.sleep(3000);
		this.nazwaPlatnika.sendKeys(nazwaPlatnika);
		browser.driver.sleep(1000);
		this.numerIdentyfikatoraUzupelniajacego.click();
		browser.driver.sleep(3000);
		this.symbolFormularza.click();
		browser.driver.sleep(3000);
		expect(this.KomNIP.getText()).toEqual('Numer identyfikatora uzupełniającego nie może być pusty');
		helpers.wybierzElementZListyPoNumerze(5);
		browser.driver.sleep(3000);
		expect(this.KomNIP.getText()).toEqual('Numer identyfikatora uzupełniającego nie może być pusty');
		this.MojBank.click();
		}	

this.przelewDoUSwaldacjapolaNIPformat = function() {
		var numertypIdentyfikatoraUzup=0;
		this.platnosci.click();
		browser.driver.sleep(1000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(3);
		browser.driver.sleep(2000);
		this.typIdentyfikatoraUzupelniajacego.click();
		helpers.wybierzElementZListyPoNumerze(1);
		browser.driver.sleep(1000);
		this.numerIdentyfikatoraUzupelniajacego.sendKeys('11');
		browser.driver.sleep(1000);
		this.symbolFormularza.click();
		browser.driver.sleep(1000);
		expect(this.KomNIP.getText()).toEqual('Niepoprawny numer NIP/ PESEL / REGON / dowodu osobistego / paszportu / innego dowodu tożsamości');
		this.typIdentyfikatoraUzupelniajacego.click();
		helpers.wybierzElementZListyPoNumerze(2);
		browser.driver.sleep(1000);
		expect(this.KomNIP.getText()).toEqual('Niepoprawny numer NIP/ PESEL / REGON / dowodu osobistego / paszportu / innego dowodu tożsamości');
		this.typIdentyfikatoraUzupelniajacego.click();
		helpers.wybierzElementZListyPoNumerze(3);
		browser.driver.sleep(1000);
		expect(this.KomNIP.getText()).toEqual('Niepoprawny numer NIP/ PESEL / REGON / dowodu osobistego / paszportu / innego dowodu tożsamości');
		this.MojBank.click();
		}	
		
this.przelewDoUSwaldacjapolaKWOTA = function() {
		this.platnosci.click();
		browser.driver.sleep(1000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(3);
		browser.driver.sleep(2000);
		this.kwota.click();
		browser.driver.sleep(3000);
		this.identyfokacjaZobowiazania.click();
		expect(this.KomKwota.getText()).toEqual('Pole kwota jest wymagane');
		this.MojBank.click();
		}	

this.przelewDoUSwaldacjapolaKWOTA2 = function() {
		this.platnosci.click();
		browser.driver.sleep(1000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(3);
		browser.driver.sleep(2000);
		this.kwota.sendKeys('as');
		browser.driver.sleep(3000);
		this.identyfokacjaZobowiazania.click();
		expect(this.KomKwota.getText()).toEqual('Nieprawidłowa kwota przelewu');
		this.MojBank.click();
		}

this.przelewDoUSwaldacjapolaKWOTA3 = function() {
		this.platnosci.click();
		browser.driver.sleep(1000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(3);
		browser.driver.sleep(2000);
		this.kwota.sendKeys('99999999999999999999');
		browser.driver.sleep(3000);
		this.identyfokacjaZobowiazania.click();
		expect(this.KomKwota.getText()).toEqual('Kwota przelewu przekracza środki dostępne na rachunku');
		this.MojBank.click();
		}


		
this.przelewDoUSwaldacjapolaKWOTA4 = function() {
		this.platnosci.click();
		browser.driver.sleep(1000);
		this.typPlatnosci.click();
		browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoNumerze(3);
		browser.driver.sleep(2000);
		this.kwota.sendKeys('99999');
		browser.driver.sleep(5000);
		this.identyfokacjaZobowiazania.click();
		expect(this.KomKwota.getText()).toEqual('Przelew nie może być wykonany jako płatność Elixir');
		this.MojBank.click();
		}

this.przelewDoUSwaldacjapolaDATA = function() {
	var dataBiezacaPlus180 = helpers.dataBiezacaPlusDzien(180);
		this.platnosci.click();
		browser.driver.sleep(1000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(3);
		browser.driver.sleep(2000);
		helpers.scrollWindow(this.dataRealizacji);
		this.datar = this.dataRealizacji.element(by.model('ngModel'));
		this.datar.sendKeys('123');
		browser.driver.sleep(1000);
		expect(this.KomdataRealizacji.getText()).toEqual('Niepoprawna data realizacji przelewu');
		this.datar.clear();
		this.datar.sendKeys('01.01.2001');
		expect(this.KomdataRealizacji.getText()).toEqual('Data realizacji przelewu nie może być wcześniejsza niż data bieżąca');
		this.datar.clear();
		this.datar.sendKeys('01.01.2222');
		expect(this.KomdataRealizacji.getText()).toEqual('Data realizacji przelewu nie może być późniejsza niż '+dataBiezacaPlus180);
		this.datar.clear();
		this.datar.sendKeys('');
		expect(this.KomdataRealizacji.getText()).toEqual('Data realizacji przelewu nie może być pusta');
		this.MojBank.click();
		}			
	
		
this.przelewDoUSwaldacjapolaSymbolFormularza = function() {		
		this.platnosci.click();
		browser.driver.sleep(1000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(3);
		browser.driver.sleep(2000);
		this.symbolFormularza.click();
		helpers.wybierzElementZListyPoNumerze(helpers.zwrocNumerSymboluFormularza('AKC'));
		browser.driver.sleep(2000);
		this.typOkresu.click();
		helpers.wybierzElementZListyPoNumerze(numertypOkresu);
		browser.driver.sleep(2000);
		this.numerOkresu.click();
		this.numerOkresu.sendKeys('1');
		browser.driver.sleep(2000);
		expect(this.KomNumerOkresu.getText()).toEqual('Jeżeli dla wybranego symbolu formularza konieczne jest wprowadzenie okresu i w polu Typ okresu, wybrana jest wartość J – dzień, to pole Numer okresu powinno zawierać wartość DDMM składającą się z samych cyfr, gdzie: 01 <= DD<=31 oraz 01 <= MM<=12');
		browser.driver.sleep(2000);
		this.numerOkresu.clear();
		this.symbolFormularza.click();
		helpers.wybierzElementZListyPoNumerze(helpers.zwrocNumerSymboluFormularza('AKC-2'));
		expect(this.KomSymbolFormularza.getText()).toEqual('Dla wybranego symbolu formularza musisz wybrać typ okresu');
		browser.driver.sleep(2000);
		this.typOkresu.click();
		helpers.wybierzElementZListyPoNumerze(numertypOkresu);
		browser.driver.sleep(2000);
		this.rokOkresu.click();
		browser.driver.sleep(2000);
		this.identyfokacjaZobowiazania.click();
		browser.driver.sleep(2000);
		expect(this.KomRokOkresu.getText()).toEqual('Dla wybranego symbolu formularza rok okresu nie może być pusty');
		browser.driver.sleep(2000);
		this.rokOkresu.click();
		this.rokOkresu.sendKeys('1');
		expect(this.KomRokOkresu.getText()).toEqual('Dla wybranego symbolu formularza rok okresu musi składać się z 2 cyfr');
		this.typOkresu.click();
		helpers.wybierzElementZListyPoNumerze(2);
		browser.driver.sleep(1000);
		this.numerOkresu.click();
		browser.driver.sleep(1000);
		this.nazwaPlatnika.click();
		browser.driver.sleep(1000);
		expect(this.KomNumerOkresu.getText()).toEqual('Numer okresu nie może być pusty');
		this.MojBank.click();
		}
		
this.przelewDoUSwaldacjapolaIdentyfikatorzobowiazania = function() {
		this.platnosci.click();
		browser.driver.sleep(1000);
		this.typPlatnosci.click();
		helpers.wybierzElementZListyPoNumerze(3);
		browser.driver.sleep(3000);
		this.identyfokacjaZobowiazania.click();
		this.identyfokacjaZobowiazania.sendKeys('12345678912345674981234567981233333333333');
		expect(this.KomidentyfokacjaZobowiazania.getText()).toEqual('Identyfikacja zobowiązania nie może przekraczać 40 znaków i powinna zawierać wyłącznie litery, cyfry oraz znaki : ; , . \\');
		this.MojBank.click();
		}			
		

};
module.exports = new payments();