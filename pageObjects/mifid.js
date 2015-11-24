var mifid = function() {
	var helpers = require('../pageObjects/helpers.js');
	var buttons = require('../pageObjects/buttons.js');
	var mobileMenu = require('../pageObjects/mobileMenu.js');
	var login = require('./loginPage.js');
	var winston = require('winston');
	var params = browser.params;

	var ustawienia = element(by.css('[ui-sref="settings.password.fill"]'));
	var mifid = element(by.css('[ui-sref="settings.mifid.report"]'));
	var checkbox1 = element(by.model('mifidFormData.splash.docsConfirm'));
	var checkbox2 = element(by.model('mifidFormData.splash.segmentationConfirm'));
	var checkbox3 = element(by.model('mifidFormData.splash.refusalStatement'));
	var dalej = buttons.dalej;
	var dalejZMalej = buttons.dalejZMalej;
	var zamknij = buttons.zamknij;
	var komunikatPotwierdzenia = element(by.css('[class="bd-msg-panel__message"]'));
	//strona1
	var celInswest1 = element(by.repeater('option in questionaire.characterInwestCustomer.inwestTargetOptions').row(0)).element(by.css('[class="bd-radio-option__marker-placeholder"]'));
	var horyzontInwest1 = element(by.repeater('option in questionaire.characterInwestCustomer.inwestHorizontOptions').row(0)).element(by.css('[class="bd-radio-option__marker-placeholder"]'));
	//strona2
	var grupa1 = element(by.repeater('group in formData.experienceAndKnowledge.groups').row(0)).element(by.model('group.checked'));
	var grupa1kol1ch1 = element(by.repeater('group in formData.experienceAndKnowledge.groups').row(0)).element(by.repeater('sphere in spheresVector').row(0)).element(by.css('[class="bd-radio-option__marker-placeholder"]'));
	var grupa1kol2ch1 = element(by.repeater('group in formData.experienceAndKnowledge.groups').row(0)).element(by.repeater('sphere in spheresVector').row(1)).element(by.css('[class="bd-radio-option__marker-placeholder"]'));
	var grupa1kol3ch1 = element(by.repeater('group in formData.experienceAndKnowledge.groups').row(0)).element(by.repeater('sphere in spheresVector').row(2)).element(by.css('[class="bd-radio-option__marker-placeholder"]'));
	var grupa1kol4ch1 = element(by.repeater('group in formData.experienceAndKnowledge.groups').row(0)).element(by.repeater('sphere in spheresVector').row(3)).element(by.css('[class="bd-radio-option__marker-placeholder"]'));
	//strona3
	var strona3Checkbox1 = element(by.repeater('statement in formData.statements.list').row(0)).element(by.css('[class="bd-radio-option__marker"]'));
	var strona3Checkbox2 = element(by.repeater('statement in formData.statements.list').row(1)).element(by.css('[class="bd-radio-option__marker"]'));
	var strona3Checkbox3 = element(by.repeater('statement in formData.statements.list').row(2)).element(by.css('[class="bd-radio-option__marker"]'));

	this.wybierzMifid = function() {
		if (params.page.mobile == 'true') {
			browser.waitForAngular();
			mobileMenu.kliknijUstawienia();
			helpers.waitUntilReady(mifid);
			helpers.clickSmallElement(mifid);
		} else {
			helpers.waitUntilReady(ustawienia);
			ustawienia.click();
			login.kliknijWBaner();
			helpers.waitUntilReady(mifid);
			mifid.click();
		}
	
	};

	this.czyUzupelnione = function() {
			buttons.wykonajPonownie().isPresent().then(function(result) {
				if (result) {
					buttons.wykonajPonownie().click();
				} else {
					//do nothing
				}
			});
	}

	this.uzupelnijMifid = function(czyRezygnacja) {
		this.wybierzMifid();
		this.czyUzupelnione();
		checkbox1.click();
		checkbox2.click();
		if (czyRezygnacja) {
			checkbox3.click();
			dalej.click();
		}
		else {
			dalej.click();
			//strona1
			helpers.waitUntilReady(celInswest1);
			celInswest1.click();
			horyzontInwest1.click();
			dalejZMalej.click();
			// strona 2
			helpers.waitUntilReady(grupa1);
			grupa1.click();
			grupa1kol1ch1.click();
			grupa1kol2ch1.click();
			grupa1kol3ch1.click();
			grupa1kol4ch1.click();
			dalejZMalej.click();		
		}
		helpers.waitUntilReady(strona3Checkbox1);
		//strona3
		strona3Checkbox1.click();
		dalejZMalej.click();
		expect(komunikatPotwierdzenia.getText()).not.toContain("transakcja odrzucona");
		expect(komunikatPotwierdzenia.getText()).not.toContain("odrzuc");
		zamknij.click();

	};
};
module.exports = new mifid();