var HtmlReporter = require('protractor-html-screenshot-reporter');
var winston = require('winston');
var moment = require('moment');

exports.config = {

onPrepare: function(){
    var now = new moment();
        loginDane = require('./daneTestowe/login.json');
        browser.driver.manage().window().maximize();
        // browser.driver.manage().window().setSize(680, 800);
        require('jasmine-reporters');
        var plik='test_'+String(now.format("YYYY-DD-MM_HH-mm-ss"))+'.log';
        jasmine.getEnv().addReporter(new HtmlReporter({baseDirectory: './logs_protractor_output/'}));
        winston.add(winston.transports.File, { filename: './logs/'+plik });
        winston.remove(winston.transports.Console);
 }, 


//The address of a running selenium server.
seleniumAddress: 'http://localhost:4444/wd/hub',

//Capabilities to be passed to the webdriver instance.
capabilities: {
    'browserName': 'chrome',
    // 'chromeOptions': {
    //     'args': ['lang=pl-PL','incognito', 'disable-extensions', 'start-maximized', 'enable-crash-reporter-for-testing']
    // },
    // 'loggingPrefs': {
    //     'browser': 'ALL'
    // }
},
    // multiCapabilities: [{
    //     // by default, these first two browsers will come up in 
    //     // Linux if you don't specify an OS
    //     'name': 'Chrome',
    //     'browserName': 'chrome'
    // }, {
    //     'name': 'Firefox',
    //     'browserName': 'firefox'
    // }],

// specs: ['./tests/test.test.js'],
specs: ['./tests/test.login.js','./tests/test.przelewZUSWalidacje.js',],

allScriptsTimeout: 960000,
params: {
    page: {
      url: 'http://10.17.200.155:8080/frontend-web/app/auth.html#/login',
      // url: 'http://172.25.122.17:8080/frontend-web/app/auth.html#/login',
      mobile:'false',
    },
  },

//Options to be passed to Jasmine-node
jasmineNodeOpts: {
  onComplete: null,
  isVerbose: false,
  showColors: true,
  includeStackTrace: true,
  //max timeout na przypadek testowy
  defaultTimeoutInterval: 960000
}
};