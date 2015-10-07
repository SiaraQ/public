var HtmlReporter = require('protractor-html-screenshot-reporter');
var winston = require('winston');
var moment = require('moment');

exports.config = {

// restartBrowserBetweenTests: true,
//The address of a running Appium server.
seleniumAddress: 'http://localhost:4723/wd/hub',
		
//Capabilities to be passed to the webdriver instance.
 capabilities: {
    platformName: 'iOS',
    platformVersion: '8.2',
    deviceName: 'iPad Air',	
    browserName: 'safari',
    newCommandTimeout: 90
	      },	
      
// specs: ['./tests/test.login.js'],
specs: ['./tests/test.login.js','./tests/test.przelewZUS.js',],

allScriptsTimeout: 960000,
params: {
    page: {
      // http://10.17.200.155:8080/frontend-web/app/auth.html#/login
      // http://172.25.122.17:8080/frontend-web/app/auth.html#/login
      url: 'http://172.25.122.17:8080/frontend-web/app/auth.html#/login',

    },
  },
  
onPrepare: function(){
    var now = new moment();
        loginDane = require('./daneTestowe/login.json');
        require('jasmine-reporters');
        var plik='test_'+String(now.format("YYYY-DD-MM_HH-mm-ss"))+'.log';
        jasmine.getEnv().addReporter(new HtmlReporter({baseDirectory: './logs_protractor_output/'}));
        winston.add(winston.transports.File, { filename: './logs/'+plik });
        winston.remove(winston.transports.Console);
 }, 
//Options to be passed to Jasmine-node.
jasmineNodeOpts: {
	onComplete: null,
	isVerbose: false,
	showColors: true,
	includeStackTrace: true,
  	defaultTimeoutInterval: 120000
}
};