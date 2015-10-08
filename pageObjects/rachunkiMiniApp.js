var accounts = function () {
	var helpers = require('./helpers.js');
	var winston = require('winston');
	var mobileMenu = require('./mobileMenu.js');
	var params = browser.params;

	this.rachunki = element(by.css('[class="raiff-icons accounts widget-tile__widget-header__widget-icon"]'));
	this.rachunekHistoria = element(by.model('table.tableConfig.selectedAccount'));
	this.rachunkiHistoriaLista = element(by.css('[ui-sref="accounts.transactions"]'));
	this.mojBank = element(by.css('[class="raiff-icon logo"]'));
	this.szczegoly = element(by.buttonText('Szczegóły'));
	this.nrRachunku = element(by.css('[label="Nr rachunku"]'));
	this.nazwaRachunku = element(by.css('[label="Nazwa rachunku"]'));
	this.twojaNazwaRachunku = element(by.css('[label="Twoja nazwa rachunku"]'));
	this.ikonaRachunku = element(by.css('[label="Ikona rachunku"]'));
	this.wlascicieleRachunku = element(by.css('[label="Właściciele"]'));
	this.adresRachunku = element(by.css('[label="Adres właściciela"]'));
	this.pelnomocnicyRachunku = element(by.css('[label="Pełnomocnicy"]'));
	this.kapitalizacjaOdsetekRachunku = element(by.css('[label="Kapitalizacja odsetek"]'));
	this.walutaRachunku = element(by.css('[label="Waluta"]'));
	this.kodBICRachunku = element(by.css('[label="Kod BIC/SWIFT"]'));
	this.dataOtwarciaRachunku = element(by.css('[label="Data otwarcia"]'));
	this.szukajWTresci = element(by.model('models.view.operationTitle'));
	this.szukaj = element(by.buttonText('Szukaj'));
	//szczegoly opearcji
	this.dataKsiegowania = element(by.css('[bd-table-cell="first"]'));
	this.nadawcaOdbiorcaTytul = element(by.css('[bd-table-cell="second"]'));
	this.typTransakcji = element(by.css('[bd-table-cell="third"]'));
	this.kwotaOpis = element(by.css('[bd-table-cell="fourth"]'));
	this.saldoPoOperacji = element(by.css('[bd-table-cell="fifth"]'));
	//po wybraniu szczegolow
	this.saldoPoTransakcjiSzczegoly = element(by.css('[label="Saldo po transakcji"]'));
	this.typTransakcjiSzczegoly = element(by.css('[label="Saldo po transakcji"]'));
	this.rachunekSzczegoly = element(by.css('[label="Rachunek"]'));
	this.dataTransakcjiSzczegoly = element(by.css('[label="Data transakcji"]'));
	this.dataKsiegowaniaSzczegoly = element(by.css('[label="Data księgowania"]'));

	this.wyszukajRachunekIWybierzOpcjeSzczegoly= function (nrb) {
		nrb=helpers.zamienRachunekNaNrbZeSpacjami(nrb);
		this.rachunki.click();
		browser.driver.sleep(12000);
		helpers.klinijPrzyciskPoWyszukaniuTekstu('account in accountList.content',nrb,'Szczegóły');
		browser.driver.sleep(4000);

	};

	this.sprawdzOperacjeNaHistorii = function (nrb,tekstDoWyszukania,kwota,saldoPoOperacji) {
		saldoPoOperacji=helpers.formatujKwoteDoWyswietleniaNaStonie(saldoPoOperacji);
		nrb=helpers.zamienRachunekNaNrbZeSpacjami(nrb);
		if (params.page.mobile=='true'){
			mobileMenu.menu.click();
			mobileMenu.rachunki;
			helpers.klinijPrzyciskPoWyszukaniuTekstu('account in accountList.content',nrb,'SZCZEGÓŁY');
		} else {
			helpers.waitUntilReady(this.mojBank);	
			this.mojBank.click();
			helpers.waitUntilReady(this.rachunki);	
			this.rachunki.click();
		}
			helpers.waitUntilReady(this.rachunkiHistoriaLista);	
		this.rachunkiHistoriaLista.click();
			helpers.waitUntilReady(this.rachunekHistoria);	
		// browser.driver.sleep(10000);
		this.rachunekHistoria.click();
		// browser.driver.sleep(1000);
		helpers.wybierzElementZListyPoTekscie('item in $select.items track by $index',nrb);
		// browser.driver.sleep(10000);
			helpers.waitUntilReady(this.szukajWTresci);	
		this.szukajWTresci.sendKeys(tekstDoWyszukania);
		// browser.driver.sleep(1000);
			helpers.waitUntilReady(this.szukaj);	
		this.szukaj.click();
		// browser.driver.sleep(24000);
			helpers.waitUntilReady(this.dataKsiegowania);	
		expect(this.dataKsiegowania.length).not.toEqual(0);
		expect(this.nadawcaOdbiorcaTytul.getText()).toContain(tekstDoWyszukania);
		expect(this.typTransakcji.length).not.toEqual(0);
		expect(this.kwotaOpis.getText()).toEqual('-'+kwota+' PLN');
		expect(this.saldoPoOperacji.getText()).toContain(saldoPoOperacji);
		this.kwotaOpis.click().then(function(){
			winston.log('info', 'poprawnie ksiegowanie operacji z rachunku'+nrb+' na kwote='+kwota);
			// winston.log('info', 'poprawnie ksiegowanie operacji z rachunku'+nrb+' na kwote='+kwota+' saldoPoOperacji'+saldoPoOperacji);
		});
			helpers.waitUntilReady(this.saldoPoTransakcjiSzczegoly);	
		// browser.driver.sleep(12000);
		//po wybraniu szczegolow
		// expect(this.saldoPoTransakcjiSzczegoly.getText()).toEqual('SALDO PO TRANSAKCJI\n'+saldoPoOperacji+' PLN');
		expect(this.typTransakcjiSzczegoly.length).not.toEqual(0);
		expect(this.dataTransakcjiSzczegoly.length).not.toEqual(0);
		expect(this.dataKsiegowaniaSzczegoly.length).not.toEqual(0);
	}

	this.veryfikacjaSzczegolowRachunkuPoWybraniuPrzyciskuSzczegoly  = function (nrb) {
		expect(this.nrRachunku.getText()).toContain('NR RACHUNKU');
		expect(this.nazwaRachunku.getText()).toContain('NAZWA RACHUNKU');
		expect(this.wlascicieleRachunku.getText()).toContain('WŁAŚCICIELE');
		expect(this.adresRachunku.getText()).toContain('ADRES WŁAŚCICIELA');
		expect(this.pelnomocnicyRachunku.getText()).toContain('PEŁNOMOCNICY');
		expect(this.kapitalizacjaOdsetekRachunku.getText()).toContain('KAPITALIZACJA ODSETEK');
		expect(this.walutaRachunku.getText()).toContain('WALUTA');
		expect(this.kodBICRachunku.getText()).toContain('KOD BIC/SWIFT');
		expect(this.dataOtwarciaRachunku.getText()).toContain('DATA OTWARCIA');
	};

	//funkcja wyszukuje rachunek na liscie i weryfikuje dane 
	this.szegolyRachunkuNaLiscie = function (nrb,dostep,dostepneSrodki,saldo,walutaRachunku) {
		this.rachunki.click();
		element.all(by.repeater('account in accountList.content')).each(function(elem) {
			elem.getText().then(function(text) {
  			if (text.search(nrb) != -1) {
				elem.element(by.cssContainingText('.bd-list-item__properties-group-cell__item','Dostępne środki')).element(by.css('[class="bd-amount__value"]')).then(function(item) {
			  		item.getText().then(function(text) {
			  				console.log('Dostępne środki='+text);
			  				expect(dostepneSrodki).toEqual(text);
	  				});
				});
				elem.element(by.cssContainingText('.bd-list-item__properties-group-cell__item','Dostępne środki')).element(by.css('[class="bd-amount__currency"]')).then(function(item) {
			  		item.getText().then(function(text) {
			  				console.log('Waluta='+text);
			  				expect(walutaRachunku).toEqual(text);
	  				});
				});
				elem.element(by.cssContainingText('.bd-list-item__properties-group-cell__item','Saldo')).element(by.css('[class="bd-amount__value"]')).then(function(item) {
			  		item.getText().then(function(text) {
			  				console.log('saldo='+text);
			  				expect(saldo).toEqual(text);
	  				});
				});
				elem.element(by.cssContainingText('.bd-list-item__properties-group-cell__item','Saldo')).element(by.css('[class="bd-amount__currency"]')).then(function(item) {
			  		item.getText().then(function(text) {
			  				console.log('walutaRachunku='+text);
			  				expect(walutaRachunku).toEqual(text);
	  				});
				});
					elem.element(by.css('[class="product-details-secondary"]')).then(function(item) {
			  		item.getText().then(function(text) {
			  				console.log('dostep='+text);
			  				expect(helpers.formatNumber(dostep)).toEqual(text);
	  				});
				});
			}
			});
		});
	};

	this.verifyAccountsSummary = function () {
		this.rachunki.click();
		var srodki=0;
		if (text.search("PLN") != -1) {
		element.all(by.repeater('account in accountList.content')).each(function(elem) {
			elem.getText().then(function(text) {
				elem.element(by.cssContainingText('.bd-list-item__properties-group-cell__item','Dostępne środki')).element(by.css('[class="bd-amount__value"]')).then(function(item) {
			  		item.getText().then(function(text) {
			  				console.log('Dostępne środki='+text);
			  				srodki=srodki+(parseFloat(parseFloat));
			  				expect(dostepneSrodki).toEqual(text);
	  				});
				});
				elem.element(by.cssContainingText('.bd-list-item__properties-group-cell__item','Dostępne środki')).element(by.css('[class="bd-amount__currency"]')).then(function(item) {
			  		item.getText().then(function(text) {
			  				console.log('Waluta='+text);
			  				expect(walutaRachunku).toEqual(text);
	  				});
				});
			});
		});
		}
	};

};
module.exports = new accounts();