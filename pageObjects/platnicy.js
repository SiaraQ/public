var platnicy = function() {
	var helpers = require('../pageObjects/helpers.js');
	var buttons = require('../pageObjects/buttons.js');
	var odbiorcy = require('../pageObjects/odbiorcyMiniApp.js');
	var mobileMenu = require('../pageObjects/mobileMenu.js');
	var winston = require('winston');
	var login = require('./loginPage.js');
	var deferred = protractor.promise.defer();
	var promise = deferred.promise;
	var params = browser.params;

	var platnosci = element(by.cssContainingText('.widget-tile__widget-header__title', 'Płatności'));
	var nowyPlatnik = element(by.css('[ng-click="onTaxpayerCreate()"]'));
	var platnicy = element(by.css('[ui-sref="payments.taxpayers.list"]'));
	var mojBank = element(by.css('[class="rb-header__menu__content"]')).element(by.css('[ui-sref="dashboard"]'));
	var szukajPlatnika = element(by.model('table.operationTitle'));
	var szukajButton = element(by.css('[ng-click="table.tableControl.invalidate()"]'));

	//powtarzalne
	var kodSms = element(by.model('rbModel.input.model'));
	var potwierdzenie = element(by.css('[class="bd-msg-panel__message"]'));
	var dalej = buttons.dalej;
	var zatwierdz = buttons.zatwierdz;
	//******** platnicy
	var twojaNazwaPlatnikaf = element(by.model('taxpayer.formData.customName'));
	var checkboxZUS = element(by.css('[bd-option-value="\'INSURANCE\'"]')).element(by.css('[class="bd-radio-option__marker"]'));
	var checkboxUS = element(by.css('[class="bd-radio-select"]')).element(by.css('[bd-option-value="\'TAX\'"]')).element(by.css('[class="bd-radio-option__marker"]'));
	var nazwaPlatnikaf = element(by.model('taxpayer.formData.taxpayerData'));
	var nipPlatnikaf = element(by.model('taxpayer.formData.nip'));
	var typIdentyfUzupf = element(by.model('taxpayer.formData.secondaryIdType'));
	var numerIdentfUzupf = element(by.model('taxpayer.formData.secondaryIdNo'));
	//strona2
	var twojaNazwaPlatnikaOpis = element(by.css('[label="Twoja nazwa płatnika"]'));
	var typPlatnikaOpis = element(by.css('[label="Typ płatnika"]'));
	var nazwaPlatnikaOpis = element(by.css('[label="Nazwa płatnika"]'));
	var danePlatnikaOpis = element(by.css('[label="Dane płatnika"]'));
	var nipPlatnikaOpis = element(by.css('[label="NIP płatnika"]'));
	var typIdentyfikatoraUzupelniajacegoOpis = element(by.css('[label="Typ identyfikatora uzupełniającego"]'));
	var numerIdentyfikatoraUzupelniajacegoOpis = element(by.css('[label="Numer identyfikatora uzupełniającego"]'));
	//po wyszukaniu odbiorcy 
	var pierwszyElementwTabeli = element(by.css('[bd-table-cell="first"]'));
	var edytuj = buttons.edytuj;
	var usun = buttons.usun;

	this.wybieraniePlatnikow = function() {
		if (params.page.mobile == 'true') {
			mobileMenu.kliknijPlatnosci();
		} else {
			helpers.waitUntilReady(mojBank);
			mojBank.click();
			helpers.waitUntilReady(mojBank);
			login.kliknijWBaner();
			helpers.waitUntilReady(platnosci);
			platnosci.click();
			helpers.waitUntilReady(platnicy);
			platnicy.click();
		}
	};

	this.wyszukajPlatnika = function(daneDoSzukania) {
		helpers.waitUntilReady(platnicy);
		platnicy.click();
		helpers.waitUntilReady(szukajPlatnika);
		szukajPlatnika.sendKeys(daneDoSzukania);
		helpers.waitUntilReady(szukajButton);
		szukajButton.click();
		helpers.waitUntilReady(pierwszyElementwTabeli);
		pierwszyElementwTabeli.click();
	};

	this.sprawdzDanePlatnikaNaSczegolach = function(twojaNazwaPlatnika, typPlatnka, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego) {
		if (typPlatnka===1) {
			typPlatnka="ZUS";
		}
		else 
		{
			typPlatnka="US/IC";
		}
		expect(nazwaPlatnikaOpis.getText()).toEqual('Nazwa płatnika\n' + nazwaPlatnika);
		expect(typPlatnikaOpis.getText()).toEqual('Typ płatnika\n'+typPlatnka);
		if (typPlatnka===1)
		expect(nipPlatnikaOpis.getText()).toEqual('NIP płatnika\n'+nipPlatnika);
		expect(typIdentyfikatoraUzupelniajacegoOpis.getText()).toEqual('Typ identyfikatora uzupełniającego\n' + typIdentyfikatoraUzupelniajacego);
		expect(numerIdentyfikatoraUzupelniajacegoOpis.getText()).toEqual('Numer identyfikatora uzupełniającego\n' + numerIdentyfikatoraUzupelniajacego);
	};

	this.sprawdzDanePlatnikaStronaDruga = function(twojaNazwaPlatnika, typPlatnka, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego) {
		if (typPlatnka===1) {
			typPlatnka="ZUS";
		}
		else 
		{
			typPlatnka="US/IC";
		}
		expect(twojaNazwaPlatnikaOpis.getText()).toEqual('Twoja nazwa płatnika\n'+twojaNazwaPlatnika);
		expect(typPlatnikaOpis.getText()).toEqual('Typ płatnika\n'+typPlatnka);
		expect(nazwaPlatnikaOpis.getText()).toEqual('Nazwa płatnika\n' + nazwaPlatnika);
		if (typPlatnka===1)
		expect(nipPlatnikaOpis.getText()).toEqual('NIP płatnika\n'+nipPlatnika);
		expect(typIdentyfikatoraUzupelniajacegoOpis.getText()).toEqual('Typ identyfikatora uzupełniającego\n' + typIdentyfikatoraUzupelniajacego);
		expect(numerIdentyfikatoraUzupelniajacegoOpis.getText()).toEqual('Numer identyfikatora uzupełniającego\n' + numerIdentyfikatoraUzupelniajacego);
	};

	this.dodajPlatnikaZUS = function(twojaNazwaPlatnika, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms) {
		this.dodajPlatnika(twojaNazwaPlatnika, 1, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms);
	}
	this.dodajPlatnikaUS = function(twojaNazwaPlatnika, nazwaPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms) {
		this.dodajPlatnika(twojaNazwaPlatnika, 2, nazwaPlatnika, "nic" , typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms);
	}
	this.dodajPlatnika = function(twojaNazwaPlatnika, typPlatnka, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms) {
		var random = Math.random();
		if (hasloSms === "" ) hasloSms = "1111";
		if (twojaNazwaPlatnika === "" || twojaNazwaPlatnika === undefined || twojaNazwaPlatnika === null) {
			twojaNazwaPlatnika = "nazwaPlatnika" + random;
		}
		if (nazwaPlatnika === "" || nazwaPlatnika === undefined || nazwaPlatnika === null) {
			nazwaPlatnika = twojaNazwaPlatnika;
		}
		if (nipPlatnika === "" || nipPlatnika === undefined || nipPlatnika === null) {
			nipPlatnika = helpers.tworzNip();
		}
		if (typIdentyfikatoraUzupelniajacego === "" || typIdentyfikatoraUzupelniajacego === undefined || typIdentyfikatoraUzupelniajacego === null) {
			typIdentyfikatoraUzupelniajacego = "P - PESEL";
		}
		if (numerIdentyfikatoraUzupelniajacego === "" || numerIdentyfikatoraUzupelniajacego === undefined || numerIdentyfikatoraUzupelniajacego === null) {
			switch (typIdentyfikatoraUzupelniajacego) {
				case 'P - PESEL':
					if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = helpers.tworzPesel();
					break;
				case 'R - REGON':
					if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = helpers.tworzRegon();
					break;
				case '1 - Dowód osobisty':
					if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = helpers.tworzDowod();
					break;
				case '2 - Paszport':
					if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = "OD8008032";
					break;
				case '3 - Inny dokument tożsamości':
					if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = "Innydokument";
					break;
				case 'N - NIP':
					if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = helpers.tworzNip();
					break;
				default:
					//N - NIP;
					if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = helpers.tworzNip();
			}
		}
		// twojaNazwaPlatnika, typPlatnka, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms
		
		this.wybieraniePlatnikow();
		helpers.waitUntilReady(nowyPlatnik);
		nowyPlatnik.click();
		twojaNazwaPlatnikaf.sendKeys(twojaNazwaPlatnika);
		console.log("typPlatnka="+typPlatnka);
		if (typPlatnka === 1) {
			winston.log('info', "Dane testu ZUS: twojaNazwaPlatnika=" + twojaNazwaPlatnika + " nazwaPlatnika=" + nazwaPlatnika + " nipPlatnika" + nipPlatnika + " typIdentyfikatoraUzupelniajacego=" + typIdentyfikatoraUzupelniajacego + " numerIdentyfikatoraUzupelniajacego=" + numerIdentyfikatoraUzupelniajacego);
			checkboxZUS.click();
			nipPlatnikaf.sendKeys(nipPlatnika);
		}
		else if (typPlatnka === 2) {
			winston.log('info', "Dane testu US: twojaNazwaPlatnika=" + twojaNazwaPlatnika + " nazwaPlatnika=" + nazwaPlatnika + " typIdentyfikatoraUzupelniajacego=" + typIdentyfikatoraUzupelniajacego + " numerIdentyfikatoraUzupelniajacego=" + numerIdentyfikatoraUzupelniajacego);
			checkboxUS.click();
		}
		nazwaPlatnikaf.sendKeys(nazwaPlatnika);
		typIdentyfUzupf.click();
		helpers.wybierzElementZListyPoTekscie('supplementaryId in $select.items track by $index', typIdentyfikatoraUzupelniajacego);
		numerIdentfUzupf.sendKeys(numerIdentyfikatoraUzupelniajacego);
		dalej.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
		});
		this.sprawdzDanePlatnikaStronaDruga(twojaNazwaPlatnika, typPlatnka, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego);
		helpers.waitUntilReady(kodSms);
		kodSms.sendKeys(hasloSms);
		zatwierdz.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
		});
		helpers.waitUntilReady(potwierdzenie);
		expect(potwierdzenie.getText()).not.toContain("Zlecenie odrzucone");
		expect(potwierdzenie.getText()).not.toContain("odrzuc");
	};
	this.edytujPlatnikaZUS = function(twojaNazwaPlatnika, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms) {
		this.edytujPlatnika(twojaNazwaPlatnika, 1, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms);
	}
	this.edytujPlatnikaUS = function(twojaNazwaPlatnika, nazwaPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms) {
		this.edytujPlatnika(twojaNazwaPlatnika, 2, nazwaPlatnika, "nic" , typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms);
	}
	this.edytujPlatnika = function(twojaNazwaPlatnika, typPlatnka, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms) {
		var random = Math.random();
		if (hasloSms === "" ) hasloSms = "1111";
		if (twojaNazwaPlatnika === "" || twojaNazwaPlatnika === undefined || twojaNazwaPlatnika === null) {
			twojaNazwaPlatnika = "nazwaPlatnika" + random;
		}
		if (nazwaPlatnika === "" || nazwaPlatnika === undefined || nazwaPlatnika === null) {
			nazwaPlatnika = twojaNazwaPlatnika;
		}
		if (nipPlatnika === "" || nipPlatnika === undefined || nipPlatnika === null) {
			nipPlatnika = helpers.tworzNip();
		}
		if (typIdentyfikatoraUzupelniajacego === "" || typIdentyfikatoraUzupelniajacego === undefined || typIdentyfikatoraUzupelniajacego === null) {
			typIdentyfikatoraUzupelniajacego = "P - PESEL";
		}
		if (numerIdentyfikatoraUzupelniajacego === "" || numerIdentyfikatoraUzupelniajacego === undefined || numerIdentyfikatoraUzupelniajacego === null) {
			switch (typIdentyfikatoraUzupelniajacego) {
				case 'P - PESEL':
					if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = helpers.tworzPesel();
					break;
				case 'R - REGON':
					if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = helpers.tworzRegon();
					break;
				case '1 - Dowód osobisty':
					if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = helpers.tworzDowod();
					break;
				case '2 - Paszport':
					if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = "OD8008032";
					break;
				case '3 - Inny dokument tożsamości':
					if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = "Innydokument";
					break;
				case 'N - NIP':
					if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = helpers.tworzNip();
					break;
				default:
					//N - NIP;
					if (numerIdentyfikatoraUzupelniajacego === "") numerIdentyfikatoraUzupelniajacego = helpers.tworzNip();
			}
		}
		var twojaNazwaPlatnikaNew = "";
		var nazwaPlatnikaNew = "2nazwaPl" + random;
		var nipPlatnikaNew = "";
		var typIdentyfikatoraUzupelniajacegoNew = "";
		var numerIdentyfikatoraUzupelniajacegoNew = "";
		this.dodajPlatnika(twojaNazwaPlatnikaNew, typPlatnka, nazwaPlatnikaNew, nipPlatnikaNew, typIdentyfikatoraUzupelniajacegoNew, numerIdentyfikatoraUzupelniajacegoNew, hasloSms);
		this.wyszukajPlatnika(nazwaPlatnikaNew);
		this.sprawdzDanePlatnikaNaSczegolach(twojaNazwaPlatnikaNew, typPlatnka, nazwaPlatnikaNew, nipPlatnikaNew, typIdentyfikatoraUzupelniajacegoNew, numerIdentyfikatoraUzupelniajacegoNew);
		edytuj.click();

		twojaNazwaPlatnikaf.sendKeys(twojaNazwaPlatnika);
		console.log("typPlatnka="+typPlatnka);
		if (typPlatnka === 1) {
			winston.log('info', "Dane testu ZUS: twojaNazwaPlatnika=" + twojaNazwaPlatnika + " nazwaPlatnika=" + nazwaPlatnika + " nipPlatnika" + nipPlatnika + " typIdentyfikatoraUzupelniajacego=" + typIdentyfikatoraUzupelniajacego + " numerIdentyfikatoraUzupelniajacego=" + numerIdentyfikatoraUzupelniajacego);
			checkboxZUS.click();
			nipPlatnikaf.sendKeys(nipPlatnika);
		}
		else if (typPlatnka === 2) {
			winston.log('info', "Dane testu US: twojaNazwaPlatnika=" + twojaNazwaPlatnika + " nazwaPlatnika=" + nazwaPlatnika + " typIdentyfikatoraUzupelniajacego=" + typIdentyfikatoraUzupelniajacego + " numerIdentyfikatoraUzupelniajacego=" + numerIdentyfikatoraUzupelniajacego);
			checkboxUS.click();
		}
		nazwaPlatnikaf.sendKeys(nazwaPlatnika);
		typIdentyfUzupf.click();
		helpers.wybierzElementZListyPoTekscie('supplementaryId in $select.items track by $index', typIdentyfikatoraUzupelniajacego);
		numerIdentfUzupf.sendKeys(numerIdentyfikatoraUzupelniajacego);
		dalej.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony drugiej");
		});
		this.sprawdzDanePlatnikaStronaDruga(twojaNazwaPlatnika, typPlatnka, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego);
		helpers.waitUntilReady(kodSms);
		kodSms.sendKeys(hasloSms);
		zatwierdz.click().then(function() {
			winston.log('info', "Wybranie opcji Zatwierdź - przejście do strony potwierdzenia informacji");
		});
		helpers.waitUntilReady(potwierdzenie);
		expect(potwierdzenie.getText()).not.toContain("Zlecenie odrzucone");
		expect(potwierdzenie.getText()).not.toContain("odrzuc");
		this.wyszukajPlatnika(nazwaPlatnikaNew);
		this.sprawdzDanePlatnikaNaSczegolach(twojaNazwaPlatnika, typPlatnka, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego);
	};

	this.usunPlatnikaZUS = function(twojaNazwaPlatnika, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms) {
		this.usunPlatnika(twojaNazwaPlatnika, 1, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms);
	}
	this.usunPlatnikaUS = function(twojaNazwaPlatnika, nazwaPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms) {
		this.usunPlatnika(twojaNazwaPlatnika, 2, nazwaPlatnika, "nic" , typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms);
	}
	this.usunPlatnika = function(twojaNazwaPlatnika, typPlatnka, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms) {
		var random = Math.random();
		if (hasloSms === "" ) hasloSms = "1111";
		if (twojaNazwaPlatnika === "" || twojaNazwaPlatnika === undefined || twojaNazwaPlatnika === null) {
			twojaNazwaPlatnika = "nazwaPlatnika" + random;
		}
		this.dodajPlatnika(twojaNazwaPlatnika, typPlatnka, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego, hasloSms);
		this.wyszukajPlatnika(nazwaPlatnikaNew);
		this.sprawdzDanePlatnikaNaSczegolach(twojaNazwaPlatnika, typPlatnka, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego);
		usun.click();
		this.sprawdzDaneOdbiorcyStronaDruga(twojaNazwaPlatnika, typPlatnka, nazwaPlatnika, nipPlatnika, typIdentyfikatoraUzupelniajacego, numerIdentyfikatoraUzupelniajacego);
		helpers.waitUntilReady(kodSms);
		kodSms.sendKeys(hasloSms);
		usun.click();
		helpers.waitUntilReady(potwierdzenie);
		expect(potwierdzenie.getText()).not.toContain("Zlecenie odrzucone");
		expect(potwierdzenie.getText()).not.toContain("odrzuc");
	};


};
module.exports = new platnicy();