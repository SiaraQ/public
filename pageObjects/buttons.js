var buttons = function() {
	var helpers = require('../pageObjects/helpers.js');
	var winston = require('winston');

	this.szczegoly = element(by.buttonText('Szczegóły'));
	this.zatwierdz = element(by.buttonText('Zatwierdź'));
	this.dalej = element(by.buttonText('Dalej'));
	this.usun = element(by.buttonText('Usuń'));
	this.powrotDoListy = element(by.buttonText('Powrót do listy'));
	this.nowaSplata = element(by.buttonText('NOWA SPŁATA'))
	this.nowaSplataAutomatyczna = element(by.buttonText('UTWÓRZ'));
	this.nowyOdbiorca = element(by.buttonText('Nowy odbiorca'));
	this.edytuj = element(by.buttonText('Edytuj'));
	this.szukaj = element(by.buttonText('Szukaj'));
	this.zastrzez = element(by.buttonText('Zastrzeż'));
	this.aktywuj = element(by.buttonText('Aktywuj'));

};
module.exports = new buttons();