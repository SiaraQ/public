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
	this.zamknij = element(by.buttonText('zamknij'));
	this.dalejZMalej = element(by.buttonText('dalej'));
	this.wybieram = element(by.buttonText('wybieram'));
	this.nieWybieram = element(by.buttonText('Nie, dziękuję'));
	this.wykonajPonownie = element(by.buttonText('wykonaj ponownie'));
	this.modyfikuj = element(by.buttonText('Modyfikuj'));
	this.zerwij = element(by.buttonText('Zerwij'));
};
module.exports = new buttons();