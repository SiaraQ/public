var lokaty = function() {
	var helpers = require('../pageObjects/helpers.js');
	var buttons = require('../pageObjects/buttons.js');
	var odbiorcy = require('../pageObjects/odbiorcyMiniApp.js');
	var mobileMenu = require('../pageObjects/mobileMenu.js');
	var winston = require('winston');
	var login = require('./loginPage.js');
	var deferred = protractor.promise.defer();
	var promise = deferred.promise;
	var params = browser.params;

	var lokaty = element(by.css('[ui-sref="deposits.list"]'));
	var nowaLokata = element(by.css('[ui-sref="deposits.new.fill"]'));
	var mojBank = element(by.css('[class="rb-header__menu__content"]')).element(by.css('[ui-sref="dashboard"]'));
	var szukajPlatnika = element(by.model('table.operationTitle'));
	var szukajButton = element(by.css('[ng-click="table.tableControl.invalidate()"]'));
	// var logoutButton =  element(by.css('[ng-click="log_out()"]'));
	//  logoutButton.isPresent().then(function(result) {
	//  if ( result ) {
	//      logoutButton.click();
	//  } else {	
	//      //do nothing
	//  }
	//  });
	//powtarzalne
	var kodSms = element(by.model('rbModel.input.model'));
	var potwierdzenie = element(by.css('[class="bd-msg-panel__message"]'));
	var dalej = buttons.dalej;
	var zatwierdz = buttons.zatwierdz;
	//******** lokaty
	var zRachunkuf = element(by.model('deposit.items.sourceAccount'));
	var kwotaf = element(by.model('deposit.formData.amount'));
	var lokataf = element(by.model('deposit.formData.depositType'));
	var okresf = element(by.model('deposit.formData.period'));
	var automatyczneOdnowienief = element(by.model('deposit.formData.autoRenew'));
	var nazwaWlasnaLokatyf = element(by.model('deposit.formData.customName'));
	var rachunekKwotyKapitaluf = element(by.model('deposit.items.capitalAccount'));
	var rachunekKwotyOdsetekf = element(by.model('deposit.items.interestAccount'));
	var liczbaOtwieranychLokatf = element(by.model('deposit.formData.depositQuantity'));
	//strona2
	var twojaNazwaPlatnikaOpis = element(by.css('[label="Z rachunku"]'));
	var typPlatnikaOpis = element(by.css('[label="Kwota""]'));
	var nazwaPlatnikaOpis = element(by.css('[label="Nazwa własna lokaty"]'));
	var danePlatnikaOpis = element(by.css('[label="Liczba otwieranych lokat"]'));
	var nipPlatnikaOpis = element(by.css('[label="NIP płatnika"]'));
	//po wyszukaniu odbiorcy 
	var pierwszyElementwTabeli = element(by.css('[bd-table-cell="first"]'));
	var edytuj = buttons.edytuj;
	var usun = buttons.usun;

	this.wybieranieLokat = function() {
		if (params.page.mobile == 'true') {
			mobileMenu.kliknijLokaty();
		} else {
			helpers.waitUntilReady(mojBank);
			mojBank.click();
			helpers.waitUntilReady(mojBank);
			login.kliknijWBaner();
			helpers.waitUntilReady(lokaty);
			lokaty.click();
		}
	};

	this.zamknijBaner = function() {
			var baner = element(by.css('[ng-click="closeModal()"]'));
			baner.isPresent().then(function(result) {
				if (result) {
					helpers.waitUntilReady(baner);
					helpers.clickSmallElement(baner);
					// baner.click();
				} else {
					//do nothing
				}
			});
		};
		// TODO
	this.wyszukajLokate = function(daneDoSzukania) {
		helpers.waitUntilReady(lokaty);
		lokaty.click();
		helpers.waitUntilReady(szukajPlatnika);
		szukajPlatnika.sendKeys(daneDoSzukania);
		helpers.waitUntilReady(szukajButton);
		szukajButton.click();
		helpers.waitUntilReady(pierwszyElementwTabeli);
		pierwszyElementwTabeli.click();
	};

	this.sprawdzDanePlatnikaNaSczegolach = function(twojaNazwaPlatnika, typPlatnka, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego) {
		if (typPlatnka === 1) {
			typPlatnka = "ZUS";
		} else {
			typPlatnka = "US/IC";
		}
		expect(nazwaPlatnikaOpis.getText()).toEqual('Nazwa płatnika\n' + nazwaPlatnika);
		expect(typPlatnikaOpis.getText()).toEqual('Typ płatnika\n' + typPlatnka);
		if (typPlatnka === 1)
			expect(nipPlatnikaOpis.getText()).toEqual('NIP płatnika\n' + nipPlatnika);
		expect(typIdentyfikatoraUzupelniajacegoOpis.getText()).toEqual('Typ identyfikatora uzupełniającego\n' + typIdentyfikatoraUzupelniajacego);
		expect(numerIdentyfikatoraUzupelniajacegoOpis.getText()).toEqual('Numer identyfikatora uzupełniającego\n' + numerIdentyfikatoraUzupelniajacego);
	};

	this.sprawdzDaneLokaty = function(twojaNazwaPlatnika, typPlatnka, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego) {
		if (typPlatnka === 1) {
			typPlatnka = "ZUS";
		} else {
			typPlatnka = "US/IC";
		}
		expect(twojaNazwaPlatnikaOpis.getText()).toEqual('Twoja nazwa płatnika\n' + twojaNazwaPlatnika);
		expect(typPlatnikaOpis.getText()).toEqual('Typ płatnika\n' + typPlatnka);
		expect(nazwaPlatnikaOpis.getText()).toEqual('Nazwa płatnika\n' + nazwaPlatnika);
		if (typPlatnka === 1)
			expect(nipPlatnikaOpis.getText()).toEqual('NIP płatnika\n' + nipPlatnika);
		expect(typIdentyfikatoraUzupelniajacegoOpis.getText()).toEqual('Typ identyfikatora uzupełniającego\n' + typIdentyfikatoraUzupelniajacego);
		expect(numerIdentyfikatoraUzupelniajacegoOpis.getText()).toEqual('Numer identyfikatora uzupełniającego\n' + numerIdentyfikatoraUzupelniajacego);
	};

	this.dodajLokate = function(rachunekNadawcy, kwota, lokata, okres, automatyczneOdnowienie, nazwaWlasnaLokaty, rachunekKwotyKapitalu, rachunekKwotyOdsetek, liczbaOtwieranychLokat) {
		var random = Math.random();
		if (kwota === "") kwota = "2222";
			// twojaNazwaPlatnika, typPlatnka, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms
		if (nazwaWlasnaLokaty === "" || nazwaWlasnaLokaty === undefined || nazwaWlasnaLokaty === null) {
			nazwaWlasnaLokaty = "nazwaWlasnaLokaty" + random;
		}
		kwota = "22223";
		this.wybieranieLokat();
		helpers.waitUntilReady(nowaLokata);
		nowaLokata.click();
		helpers.waitUntilReady(zRachunkuf);
		zRachunkuf.click();
		// helpers.wybierzElementZListyPoNumerze(0);
		helpers.wybierzElementZListyPoTekscie('accountItem in $select.items track by accountItem.accountId', rachunekNadawcy);
		kwotaf.sendKeys(kwota);
		kwotaf.sendKeys(protractor.Key.TAB);
		
		this.zamknijBaner();
		//obsluga popup
		helpers.waitUntilReady(lokataf);
		lokataf.click();
		browser.driver.sleep(1000);
		console.log("lokata="+lokata)
		if (lokata === "" || lokata === undefined || lokata === null) {
			helpers.wybierzElementZListyPoNumerze(0);
		} else {
			helpers.wybierzElementZListyPoTekscie('item in $select.items', lokata);
		}
		okresf.click();
		if (okres === "" || okres === undefined || okres === null) {
			helpers.wybierzElementZListyPoNumerze(0);
		} else {
			helpers.wybierzElementZListyPoTekscie('item in $select.items', okres);
		}
		automatyczneOdnowienief.click();
		if (automatyczneOdnowienie === "" || automatyczneOdnowienie === undefined || automatyczneOdnowienie === null) {
			helpers.wybierzElementZListyPoNumerze(0);
		} else {
			helpers.wybierzElementZListyPoTekscie('item in $select.items', automatyczneOdnowienie);
		}

		//dodatkowe opcje
		nazwaWlasnaLokatyf.sendKeys(nazwaWlasnaLokaty);
		liczbaOtwieranychLokatf.click();
		if (liczbaOtwieranychLokat === "" || liczbaOtwieranychLokat === undefined || liczbaOtwieranychLokat === null) {
			helpers.wybierzElementZListyPoNumerze(0);
		} else {
			helpers.wybierzElementZListyPoTekscie('depositQuantity in $select.items', liczbaOtwieranychLokat);
		}
		helpers.waitUntilReady(dalej);
		dalej.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
		});
		// this.sprawdzDanePlatnikaStronaDruga(twojaNazwaPlatnika, typPlatnka, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego);
		helpers.waitUntilReady(dalej);
		dalej.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
		});
		helpers.waitUntilReady(potwierdzenie);
		expect(potwierdzenie.getText()).not.toContain("Zlecenie odrzucone");
		expect(potwierdzenie.getText()).not.toContain("odrzuc");
	};

	this.edytujLokate = function(twojaNazwaPlatnika, typPlatnka, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms) {

	};

	this.usunLokate = function(twojaNazwaPlatnika, typPlatnka, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms) {

	};


};
module.exports = new lokaty();