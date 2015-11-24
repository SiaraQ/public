var payments = require('../pageObjects/przelewUs.js');
var winston = require('winston');

describe('Walidacje przelew US', function() {

it('test negatywny komunikat dla pola NazwaPlatnika ', function() {
	winston.log('info', 'Walidacje przelew US walidujpoleNazwaPlatnika');
    payments.przelewDoUSwaldacjapolaNazwaPlat(loginDane.rachunekNadawcy,loginDane.nazwaPlatnika);
});

it('test negatywny komunikat dla pola Rachunek Urzędu Skarbowego ', function() {
	winston.log('info', 'Walidacje przelew US walidujpoleRachUrzSkarb');
	payments.przelewDoUSwaldacjapolaRachUrzSkarb(loginDane.rachunekNadawcy);
}); 

it('test negatywny komunikat dla pola Rachunek Urzędu Skarbowego format rachunku', function() {
	winston.log('info', 'Walidacje przelew US walidujpoleRachUrzSkarb');
	payments.przelewDoUSwaldacjapolaRachUrzSkarbformat(loginDane.rachunekNadawcy);
}); 

it('test negatywny komunikat dla pola NIP', function() {
	winston.log('info', 'Walidacje przelew US walidujpoleNIP');
	payments.przelewDoUSwaldacjapolaNIP(loginDane.rachunekNadawcy,loginDane.nazwaPlatnika);
}); 

it('test negatywny komunikat dla pola NIP format', function() {
	winston.log('info', 'Walidacje przelew US walidujpoleNIP');
	payments.przelewDoUSwaldacjapolaNIPformat(loginDane.rachunekNadawcy,loginDane.nazwaPlatnika);
}); 

it('test negatywny komunikat dla pola KWOTA - Pole kwota jest wymagane', function() {
	winston.log('info', 'Walidacje przelew US walidujpoleKWOTA');
	payments.przelewDoUSwaldacjapolaKWOTA();
}); 

it('test negatywny komunikat dla pola KWOTA - nieprawidłowa kwota przelewu', function() {
	winston.log('info', 'Walidacje przelew US walidujpoleKWOTA');
	payments.przelewDoUSwaldacjapolaKWOTA2();
}); 

it('test negatywny komunikat dla pola KWOTA - Kwota przelewu przekracza środki dostępne na rachunku', function() {
	winston.log('info', 'Walidacje przelew US walidujpoleKWOTA');
	payments.przelewDoUSwaldacjapolaKWOTA3();
}); 


it('test negatywny komunikat dla pola KWOTA - Kwota przelewu przekracza środki dostępne na rachunku', function() {
	winston.log('info', 'Walidacje przelew US walidujpoleKWOTA');
	payments.przelewDoUSwaldacjapolaKWOTA4();
}); 

it('test negatywny komunikat dla pola DATA', function() {
	winston.log('info', 'Walidacje przelew US walidujpoleDATA');
	payments.przelewDoUSwaldacjapolaDATA();
}); 

it('test negatywny komunikat dla pola SymbolFormuarza i znim powiazanych', function() {
	winston.log('info', 'Walidacje przelew US walidujpoleNumerOkresu');
	payments.przelewDoUSwaldacjapolaSymbolFormularza();
	
});

it('test negatywny komunikat dla pola Identyfikator zobowiazania', function() {
	winston.log('info', 'Walidacje przelew US walidujpoleidentzobow');
	payments.przelewDoUSwaldacjapolaIdentyfikatorzobowiazania();
	
});

}); 