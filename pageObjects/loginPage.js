var loginPage = function () {
	var params = browser.params;
	var helpers = require('../pageObjects/helpers.js');
	
	this.login = element(by.model('formData.j_username'));
	this.password = element(by.id('password'));
	this.zaloguj = element(by.buttonText('Zaloguj się'));
	this.wyloguj =  element(by.css('[ng-click="logout()"]'));
	this.logoutMessage = element(by.className('content-panel'));  
	this.panelMessage = element(by.css('[class="bd-msg-panel__message"]'));
	this.krotkimessage = element(by.css('[ng-if="(authForm.$submitted) && authForm.j_password.$error.minlength"]'));
	this.rachunkiSrodki= element(by.css('[class="accounts widget-content"]'));
	// this.kartySrodki = element(by.css('[ng-controller="CardsWidgetContentController"]'));
	
	var settings = {
		pageLoadTimeout: 1000,
		loadTimeout: 6000,
		pageURL: params.page.url
	}

	this.navigate = function () {
		browser.get(settings.pageURL);	
	};
	
	this.kliknijWBaner = function() {
		var baner =  element(by.css('[ng-click="$close()"]'));
		    baner.isPresent().then(function(result) {
		    if ( result ) {
		    	helpers.clickSmallElement(baner);
		        // baner.click();
		    } else {
		        //do nothing
		    }
		    });
	}

	this.logIn = function (login,password) {
		helpers.waitUntilReady(this.login);
		this.login.sendKeys(login);
		this.password.sendKeys(password);
		this.zaloguj.click();
		// this.kliknijWBaner();
		browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return (/dashboard/).test(url);
            });
        }, 60000,'User nie zalogowal sie do aplikacji');
        this.kliknijWBaner();
        helpers.waitUntilReady(this.rachunkiSrodki);
     };

	this.logOut = function () {
		browser.sleep(settings.loadTimeout);
		this.wyloguj.click();
		expect(this.logoutMessage.getText()).toEqual('Nastąpiło pomyślne wylogowanie z serwisu internetowego');
	};

	this.napisZPrawej = function () {
	element(by.css('[class="login-view__cell--align-right--sm-left col-sm-12 col-md-3"]')).all(by.tagName('a')).then(function(items) {
  			expect(items.length).toBe(2);
  			expect(items[0].getText()).toBe('Pierwsze logowanie?');
  			expect(items[1].getText()).toBe('problem z logowaniem');
		});
	
	};

	this.logInlogOut = function (login,password) {
		this.login.sendKeys(login);
		this.password.sendKeys(password);
		this.zaloguj.click();
		browser.sleep(settings.loadTimeout);
		this.wyloguj.click();
		expect(this.logoutMessage.getText()).toEqual('Nastąpiło pomyślne wylogowanie z serwisu internetowego');
	};

	this.bledneHaslo = function (login,password) {
		this.login.sendKeys(login);
		this.password.sendKeys(password);
		this.zaloguj.click();
		expect(this.panelMessage.getText()).toBe('Logowanie do systemu nie powiodło się. Podałeś zły identyfikator lub hasło. Trzykrotne wprowadzenie błędnego hasła powoduje zablokowanie dostępu do systemu.');
	};

	this.krotkieHaslo = function (login,password) {
		this.login.sendKeys(login);
		this.password.clear().sendKeys(password);
		this.zaloguj.click();
		if (this.password.length <= 3) {
			expect(this.krotkimessage.getText()).toBe('Podane hasło jest zbyt krótkie');
		};
		if (this.password.length > 3) { 
		expect(this.krotkimessage.getText()).toBe('Logowanie do systemu nie powiodło się. Podałeś zły identyfikator lub hasło. Trzykrotne wprowadzenie błędnego hasła powoduje zablokowanie dostępu do systemu.');
		};
	};

};
module.exports = new loginPage();