    var helpers = function () {

	this.hexToRgb =  function(hex) {var bigint, r, g, b, a;
    //Remove # character
	    var re = /^#?/;
	    var aRgb = hex.replace(re, '');
	    bigint = parseInt(aRgb, 16);
	    //If in #FFF format
	    if (aRgb.length == 3) {
	        r = (bigint >> 4) & 255;
	        g = (bigint >> 2) & 255;
	        b = bigint & 255;
	        return "rgba(" + r + "," + g + "," + b + ",1)";
	    }

	    //If in #RRGGBB format
	    if (aRgb.length >= 6) {
	        r = (bigint >> 16) & 255;
	        g = (bigint >> 8) & 255;
	        b = bigint & 255;
	        var rgb = r + ", " + g + ", " + b;
	        //If in #AARRBBGG format
	        if (aRgb.length == 8) {
	            a = ((bigint >> 24) & 255) / 255;
	            return "rgba(" + rgb + "," + a.toFixed(1) + ")";
	        }
	    }
	    return "rgba(" + rgb + ", 1)";
	};

    this.waitUntilReady = function (elm) {
        browser.wait(function () {
            return elm.isPresent();
        },20000,'Element nie jest obecny na stronie');
        browser.wait(function () {
            return elm.isDisplayed();
        },20000,'Element nie jest wyswietlony na stronie');
    };
	// helpers.klinijPrzyciskPoWyszukaniuTekstu('account in accountList.content',"52 1750 0012 0000 0000 2816 4572",'SZCZEGÓŁY');
	this.klinijPrzyciskPoWyszukaniuTekstu = function (ngRepeatTag, szukanyTekst,tekstPrzycisku ) {
		element.all(by.repeater(ngRepeatTag)).each(function(elem) {
  		elem.getText().then(function(text) {
  			if (text.search(szukanyTekst) != -1) {
  				console.log("dane na liście="+text);
  				elem.element(by.buttonText(tekstPrzycisku)).click();
  			}
  		});
		});
	};


	this.clickSmallElement = function ( element ) {
	   element.getLocation().then(function(location) {
		  browser.executeScript("window.scrollTo(0," + (location.y - 10)+ ")");
		  element.click();
		});
	 };

    this.scrollWindow = function (element){
        browser.executeScript("arguments[0].scrollIntoView();", element.getWebElement()).then(function () {
        element.click();
        });
    };

	this.wybierzElementZListyPoNumerze = function (optionNum ) {
	   element.all(by.css('[role="option"]')).get(optionNum).click();
	  };
	
	
	this.zwracaWartoscElementu = function (element){
		return element.getText().then(function(text) {
    		console.log(text);
    		text.log(text);
		return text;
		});
		}

    this.wybierzElementZListyPoTekscie = function (ngRepeatTag, szukanyTekst ) {
      element.all(by.repeater(ngRepeatTag)).filter(function(elem){
        return elem.getText().then(function(text){
            return text.indexOf(szukanyTekst) > -1;
        });
        }).then(function(filteredElements) {
            return filteredElements[0].click();
        })
      
    }; 

	 Date.prototype.yyyymmdd = function() {         
                                
        var yyyy = this.getFullYear().toString();                                    
        var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based         
        var dd  = this.getDate().toString();             
                            
        return (dd[1]?dd:"0"+dd[0]) + '.' + (mm[1]?mm:"0"+mm[0]) + '.' +  yyyy;
   };

    String.prototype.formatujKwoteDoWyswietleniaNaStonie = function (num) {
        num=String(num);
        var n = num.indexOf("."); 
        var numlen = num.length;
        var dziesietne = num.substr(n+1, numlen);
        var liczbowe = num.substr(0, n);
        liczbowe=liczbowe.reverse();
        if (liczbowe.length==0) {    
            liczbowe="0";
        }
        if ((liczbowe.length>3)&&(liczbowe.length<7)) {    
            liczbowe=liczbowe.substr(0,3)+" "+liczbowe.substr(3,numlen);
        }
        if ((liczbowe.length>6)&&(liczbowe.length<9)) {
            liczbowe=liczbowe.substr(0,3)+" "+liczbowe.substr(3,3)+" "+liczbowe.substr(6,numlen);
            // console.log('liczboweR=',liczbowe);
        }
        if ((liczbowe.length>8)&&(liczbowe.length<12)) {
            liczbowe=liczbowe.substr(0,3)+" "+liczbowe.substr(3,3)+" "+liczbowe.substr(6,3)+" "+liczbowe.substr(9,numlen);
            // console.log('liczboweR=',liczbowe);
        }
        if (dziesietne.length>2) dziesietne = dziesietne.substr(0,2);
        if (dziesietne.length<2) dziesietne = dziesietne+"0";  
        num=String(liczbowe.reverse()+","+dziesietne);
        console.log("formatujKwoteDoWyswietleniaNaStonie="+num);
    return ""+num;
    };

    this.zwrocOstatniaKwoteZUS = function(kw1,kw2,kw3,kw4){
        if (kw4!="") return kw4;
        else if ((kw3!="")&&(kw4=="")) return kw3;
        else if ((kw2!="")&&(kw3=="")&&(kw4=="")) return kw2;
        else return kw1;
    }

    this.wyliczSaldoOczekiwanePo= function(element,kwota){
        return element.getText().then(function (text) {
            text=String(text);
            text=text.replace(/\s+/g, '');
            text=text.replace(',','.');
            saldoPrzed=Number(text);
            kwota=kwota.replace(/\s+/g, '');
            kwota=kwota.replace(',','.');
            saldoOczekiwane=Number(text)-Number(kwota); 
            // text.formatujKwoteDoWyswietleniaNaStonie(saldoOczekiwane);
            // console.log(text.formatujKwoteDoWyswietleniaNaStonie(saldoOczekiwane));  
            return text.formatujKwoteDoWyswietleniaNaStonie(saldoOczekiwane);

        }) 
   };

	this.dataBiezaca = function () {
		var d = new Date();
    	return d.yyyymmdd();
	};

    this.dataBiezacaPlusDzien = function (plus) {
        // var d = new Date();
        // console.log(d);
        // d.setDate(d.getDate() + plus);
        // console.log(d);
        // d.toLocaleDateString();
        // return d.yyyymmdd();
        var ms = new Date().getTime() + (86400000 * plus);
        var added = new Date(ms);
        console.log(added);
        return added.yyyymmdd();
    };

	this.returnFirstElementFromRepeater = function (repeaterTag,classN) {
      return element.all(by.repeater(repeaterTag)).then(function (rows) {
          return rows[0].element(by.className(classN)).then(function (first) {
             return first;
             /**.getText().then(function (text) {
                return text;
             }) **/
          }) 
        })
	};

	this.returnElementFromRepeater= function (repeaterTag,className) {
    return element.all(by.repeater(repeaterTag)).then(function(rows) {
            noOfItems = rows.length;
            console.log('liczba wierszy=',noOfItems);
            for (i = 0; i < noOfItems; i++) {
                return el = rows[i].element(by.className(className));
                //expect(first.getText()).toEqual('11');
                el.getText().then(function (txt) {
                    console.log(txt);
                });
            }
          })
    };

    this.returnElementNummberFromRepeater= function (repeaterTag,className,classText) {
    return element.all(by.repeater(repeaterTag)).then(function(rows) {
            noOfItems = rows.length;
            console.log('liczba wierszy=',noOfItems);
            for (i = 0; i < noOfItems; i++) {
                return i = rows[i].element(by.cssContainingText('.'+className,classText));
                //expect(first.getText()).toEqual('11');
                el.getText().then(function (txt) {
                    console.log('i='+i);
                });
            }
          })
    };

    String.prototype.reverse=function(){return this.split("").reverse().join("");}

    this.formatujKwoteDoWyswietleniaNaStonie = function (num) {
         // num=String(num);
        var n = num.indexOf("."); 
        var numlen = num.length;
        var dziesietne = num.substr(n+1, numlen);
        var liczbowe = num.substr(0, n);
        liczbowe=liczbowe.reverse();
        if (liczbowe.length==0) {    
            liczbowe="0";
        } else
        if ((liczbowe.length>3)&&(liczbowe.length<7)) {    
            liczbowe=liczbowe.substr(0,3)+" "+liczbowe.substr(3,numlen);
        } else
        if ((liczbowe.length>6)&&(liczbowe.length<9)) {
            liczbowe=liczbowe.substr(0,3)+" "+liczbowe.substr(3,3)+" "+liczbowe.substr(6,numlen);
            console.log('liczboweR=',liczbowe);
        } else
        if ((liczbowe.length>8)&&(liczbowe.length<12)) {
            liczbowe=liczbowe.substr(0,3)+" "+liczbowe.substr(3,3)+" "+liczbowe.substr(6,3)+" "+liczbowe.substr(9,numlen);
            console.log('liczboweR=',liczbowe);
        }
        if (dziesietne.length>2) dziesietne = dziesietne.substr(0,2);
        if (dziesietne.length<2) dziesietne = dziesietne+"0";  
        num=String(liczbowe.reverse()+","+dziesietne);
        console.log("formatujKwoteDoWyswietleniaNaStonie="+num);
    return ""+num;
    };


	 function validatepesel(pesel) {
        var reg = /^[0-9]{11}$/;
        if(reg.test(pesel) == false) {
        return false;}
        else
        {
            var dig = (""+pesel).split("");
            var kontrola = (1*parseInt(dig[0]) + 3*parseInt(dig[1]) + 7*parseInt(dig[2]) + 9*parseInt(dig[3]) + 1*parseInt(dig[4]) + 3*parseInt(dig[5]) + 7*parseInt(dig[6]) + 9*parseInt(dig[7]) + 1*parseInt(dig[8]) + 3*parseInt(dig[9]))%10;
            if(kontrola==0) kontrola = 10;
            kontrola = 10 - kontrola;
            if(parseInt(dig[10])==kontrola)
            return true;
            else
            return false;
        }
     
    }

    function validatenip(nip) {
    	var nip_bez_kresek = nip.replace(/-/g,"");
    	var reg = /^[0-9]{10}$/;
    	if(reg.test(nip_bez_kresek) == false) {
    	return false;}
    	else
    	{
    		var dig = (""+nip_bez_kresek).split("");
    		var kontrola = (6*parseInt(dig[0]) + 5*parseInt(dig[1]) + 7*parseInt(dig[2]) + 2*parseInt(dig[3]) + 3*parseInt(dig[4]) + 4*parseInt(dig[5]) + 5*parseInt(dig[6]) + 6*parseInt(dig[7]) + 7*parseInt(dig[8]))%11;
    		if(parseInt(dig[9])==kontrola)
    		return true;
    		else
    		return false;
    	}
     
    }

    function validateregon9(regon) {
    	var reg = /^[0-9]{9}$/;
    	if(reg.test(regon) == false) {
    	return false;}
    	else
    	{
    		var dig = (""+regon).split("");
    		var kontrola = (8*parseInt(dig[0]) + 9*parseInt(dig[1]) + 2*parseInt(dig[2]) + 3*parseInt(dig[3]) + 4*parseInt(dig[4]) + 5*parseInt(dig[5]) + 6*parseInt(dig[6]) + 7*parseInt(dig[7]))%11;
    		if(kontrola == 10) kontrola = 0;
    		if(parseInt(dig[8])==kontrola)
    		return true;
    		else
    		return false;
    	}
    }

    this.zamienRachunekNaNrbZeSpacjami = function (rachunekBezSpacji) {
        var rachunek=rachunekBezSpacji;
        if (rachunekBezSpacji.length == 26)
            rachunek=rachunekBezSpacji.substr(0,2)+" "+rachunekBezSpacji.substr(2,4)+" "+rachunekBezSpacji.substr(6,4)+" "+rachunekBezSpacji.substr(10,4)+" "+rachunekBezSpacji.substr(14,4)+" "+rachunekBezSpacji.substr(18,4)+" "+rachunekBezSpacji.substr(22,4);
        return rachunek;
    }

    this.zamienRachunekKarty = function (rachunekKarty) {
        var rachunek=rachunekKarty;
            rachunek=rachunekKarty.substr(0,4)+" **** **** "+rachunekKarty.substr(rachunekKarty.length-4,4);
        return rachunek;
    }

    this.losujKwote = function () {
         return getDigit()+','+getDigit();
    }
    function getDigitKwota()
    {
        return Math.floor(Math.random() * (10-1+1)+1);
    }
    function getDigit()
    {
        return Math.floor(Math.random() * 10);
    }
    function getLetter(letters)
    {
        letters = letters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        len = letters.length;
        i = Math.floor(Math.random() * len);
        l = letters[i];
        return l;
    }
    function calcPesel(sex)
    {
        var date = new Date();
        var wagi = new Array (1, 3, 7, 9, 1, 3, 7, 9, 1, 3);

        var fullYear = date.getFullYear();
        var y=fullYear % 100;
        var m=date.getMonth()+1;
        var d=date.getDate();
        
        if (fullYear>=1800 && fullYear<=1899){
            m += 80;
        } else
        if (fullYear>=2000 && fullYear<=2099){
            m += 20;
        } else
        if (fullYear>=2100 && fullYear<=2199){
            m += 40;
        } else
        if (fullYear>=2200 && fullYear<=2299){
            m += 60;
        }
        
        var cyfry = new Array (Math.floor(y/10),y%10,Math.floor(m/10),m%10,Math.floor(d/10),d%10);
        for (var i = cyfry.length; i < wagi.length-1; i++)
            cyfry[i] = getDigit();
        if (sex == 'M'){
            cyfry[wagi.length-1] = getLetter('13579');
        } else if (sex == 'F'){
            cyfry[wagi.length-1] = getLetter('02468');
        } else {
            cyfry[wagi.length-1] = getDigit();
        }
            
        var cyfra_kontrolna = 0;
        for (var i=0; i<cyfry.length; i++)
            cyfra_kontrolna += wagi[i] * cyfry[i];
        cyfra_kontrolna = (10 - (cyfra_kontrolna % 10)) % 10;
                    
        var r = '';
        for (var i=0; i<cyfry.length; i++)
            r += String(cyfry[i]);
        r += String(cyfra_kontrolna);    
        return r;
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function calcNip() {
        var WEIGHTS = [6, 5, 7, 2, 3, 4, 5, 6, 7],
        MODULO = 11; 
        var i, sum = 0, checksum, digits = [];

        for (i = 0; i < WEIGHTS.length; i++) {
            digits.push(randomInt(1, 9));
            sum += digits[i] * WEIGHTS[i];
        }

        checksum = sum % MODULO;
        if (checksum === 10 || checksum === 0) {
            return calcNip();
        }

        return digits.join('') + checksum;
    }; 

    function calcREGON() {  
        var WEIGHTS = [8, 9, 2, 3, 4, 5, 6, 7],
        MODULO = 11;      
        var i, sum = 0, checksum, digits = [];

        for (i = 0; i < WEIGHTS.length; i++) {
            digits.push(randomInt(1, 9));
            sum += digits[i] * WEIGHTS[i];
        }

        checksum = (sum % MODULO) % 10;
        return digits.join('') + checksum;  
    };

    // String.prototype.$ = function() {
    //     return String.form(this, Array.prototype.slice.call(arguments));
    // }

    String.prototype.randomize =function(n){
        var out;
        return out=function(){
            var _i,_results;_results=[];
            for(_i=1;1<=n?_i<=n:_i>=n;1<=n?_i++:_i--){
                _results.push(this.charAt(Math.floor(Math.random()*this.length)))}
                return _results}.call(this).join("")};

    function calcDOWOD() { 
        var p1,p2,sk;
        sets={lower:"abcdefghijklmnopqrstuvwxyz",upper:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",numbers:"0123456789",symbols:"`~!@#$%^&*()_-+=[]{};:?,.<>",polish:"ąćęłóśżźĄĆĘŁÓŚŻŹ"};
        p1="A"+sets.upper.randomize(2);
        p2=sets.numbers.randomize(5);
        return p1+"0"+p2;
    }

    this.tworzPesel = function (){
        return calcPesel('M');
    }


    this.tworzNip = function (){
        return calcNip();
    }

    this.tworzRegon = function (){
        return calcREGON();
    }

    this.tworzDowod = function (){
        return calcDOWOD();
    }

    this.losujRachunekBiezacyPL = function() {
        var items = ['77864200021001000209780001','96113000106452260676037738','06113000100000000316200001','51156000132015000004880001','67864200023001840003870001']
        var item = items[Math.floor(Math.random() * items.length)];
        return item;
    }

    this.zwrocNumerSymboluFormularza = function(symbolFormularza){
        //AKC;AKC-2;AKC-4B;CIT;CIT-11;CIT2A;INNE;PCC-1;PIT-8A;PIT-37;PIT-38;POG-4D;VAT-10;VAT9M;VAT-7;WZS-1M
        switch (symbolFormularza) {
        case 'AKC':
            numertypOkresu = 0;
            break;
        case 'AKC-2':
            numertypOkresu = 1;
            break;
        case 'AKC-4B':
            numertypOkresu = 6;
            break;
        case 'CIT':
            numertypOkresu = 60;
            break;
        case 'CIT-11':
            numertypOkresu = 64;
            break;
        case 'CIT2A':
            numertypOkresu = 67;
            break;
        case 'INNE':
            numertypOkresu = 102;
            break;
        case 'PCC-1':
            numertypOkresu = 109;
            break;
        case 'PIT-8A':
            numertypOkresu =130;
            break;
        case 'PIT-37':
            numertypOkresu =120;
            break;
        case 'PIT-38':
            numertypOkresu = 121;
            break;
        case 'POG-4D':
            numertypOkresu = 157;
            break;
        case 'VAT-10':
            numertypOkresu = 196;
            break;
        case 'VAT9M':
            numertypOkresu = 214;
            break;
        case 'VAT-7':
            numertypOkresu = 198;
            break;
        case 'WZS-1M':
            numertypOkresu = 234;
            break;
        default:
        //J - dzień;
            numertypOkresu = 0;
        } 
        return numertypOkresu;
    }



};

module.exports = new helpers();

