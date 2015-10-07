var HtmlReporter = require('protractor-html-screenshot-reporter');
var winston = require('winston');
var moment = require('moment');
exports.config = {

onPrepare: function(){
    var now = new moment();
        loginDane = require('./daneTestowe/login.json');
        require('jasmine-reporters');
        var plik='test_'+String(now.format("YYYY-DD-MM_HH-mm-ss"))+'.log';
        jasmine.getEnv().addReporter(new HtmlReporter({baseDirectory: './logs_protractor_output/'}));
        winston.add(winston.transports.File, { filename: './logs/'+plik });
        winston.remove(winston.transports.Console);
 },
//The address of a running selenium server.
seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

//Capabilities to be passed to the webdriver instance.
capabilities: {
'browserName': 'safari'
},


//specs: ['./tests/*spec.js'],
specs: ['./tests/test.login.js','./tests/test.przelewZUS.js',],

allScriptsTimeout: 960000,
params: {
    page: {
      // http://10.17.200.155:8080/frontend-web/app/auth.html#/login
      // http://172.25.122.17:8080/frontend-web/app/auth.html#/login
      url: 'http://172.25.122.17:8080/frontend-web/app/auth.html#/login',

    },
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