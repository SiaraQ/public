var odbiorcy = require('../pageObjects/odbiorcyMiniApp.js');
var winston = require('winston');
var loginDane = require('../npm/DaneTestowe/login.json');

describe('Odbiorcy Testy Walidacji', function() {

it('dodajOdbiorceKrajowegoWalidacjaNazwaOdbiorcy', function() {
	winston.log('info', 'Dodaj Odbiorce Krajowego - Walidacja Nazwy Odbiorcy');
    odbiorcy.dodajOdbiorceKrajowegoWalidacjaNazwaOdbiorcy();
});

it('dodajOdbiorceKrajowegoWalidacjaNumerRachunku', function() {
	winston.log('info', 'Dodaj Odbiorce Krajowego - Walidacja Numeru Rachunku');
    odbiorcy.dodajOdbiorceKrajowegoWalidacjaNumerRachunku();
});

it('dodajOdbiorceKrajowegoWalidacjaPolaDaneOdbiorcy', function() {
	winston.log('info', 'Dodaj Odbiorce Krajowego - Walidacja Pola Dane Odbiorcy');
    odbiorcy.dodajOdbiorceKrajowegoWalidacjaPolaDaneOdbiorcy();
});

it('dodajOdbiorceKrajowegoWalidacjaPolaTytul', function() {
	winston.log('info', 'Dodaj Odbiorce Krajowego - Walidacja Pola Tytul');
    odbiorcy.dodajOdbiorceKrajowegoWalidacjaPolaTytul();
});

});
