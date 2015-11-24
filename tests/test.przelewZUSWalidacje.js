var payments = require('../pageObjects/przelewZus.js');
var winston = require('winston');

describe('Walidacje dla przelewow ZUS', function() {

it('Walidacja Nazwy Platnika', function() {
	winston.log('info', 'Przelew Do Zus - Walidacja Nazwy Platnika');
    payments.przelewDoZusWalidacjaNazwyPlatnika();
});

it('Walidacja Pola NIP', function() {
	winston.log('info', 'Przelew Do Zus - Walidacja Pola NIP');
    payments.przelewDoZusWalidacjaPolaNIP();
});

it('Walidacja Drugiego Identyfikatora', function() {
	winston.log('info', 'Przelew Do Zus - Walidacja Drugiego Identyfikatora');
    payments.przelewDoZusWalidacjaDrugiegoIdentyfikatora();
});

it('Walidacja Pola Deklaracja', function() {
	winston.log('info', 'Przelew Do Zus - Walidacja Pola Deklaracja');
    payments.przelewDoZusWalidacjaPolaDeklaracja();
});

it('Walidacja Pola Data', function() {
	winston.log('info', 'Przelew Do Zus - Walidacja Pola Data');
    payments.przelewDoZusWalidacjaPolaData();
});

it('Walidacja Pola Numer Deklaracji', function() {
	winston.log('info', 'Przelew Do Zus - Walidacja Pola Numer Deklaracji');
    payments.przelewDoZusWalidacjaPolaNumerDeklaracji();
});

it('Walidacja Pola Informacje Dodatkowe', function() {
	winston.log('info', 'Przelew Do Zus - Walidacja Pola Informacje Dodatkowe');
    payments.przelewDoZusWalidacjaPolaInformacjeDodatkowe();
});

it('Walidacja Typu Ubezpieczenia', function() {
	winston.log('info', 'Przelew Do Zus - Walidacja Typu Ubezpieczenia');
    payments.przelewDoZusWalidacjaTypuUbezpieczenia();
});

});