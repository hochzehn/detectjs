var page = require('webpage').create(),
    system = require('system'),
    address;
var fs = require('fs');

var detection = require('./detectjs/detection');

if (system.args.length === 1) {
    console.log('Usage: libdetect.js url');
    phantom.exit(1);
}

page.settings.loadImages = false;
page.settings.resourceTimeout = 10000;
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';

address = system.args[1];
// console.log('Loading', address, '...');

var resultDocument = {
    address: address,
    finalAddress: "",
    date: Date.now(),
    javascript: {
        hasError: false,
        libraries: []
    }
};

page.onError = function(msg, trace) {
    resultDocument.javascript.hasError = true;

    var msgStack = ['ERROR: ' + msg];
    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function(t) {
            msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
        });
    }
    // uncomment to log into the console
    // console.error(msgStack.join('\n'));
};

page.onInitialized = function() {
    page.onCallback = function() {
        setTimeout(function() {
            try {
                detection(page, resultDocument);
            } catch (e) {
                console.log(e);
                phantom.exit();
            }
        }, 3000);
    };

    page.evaluate(function() {
        window.addEventListener('load', function() {
            window.callPhantom();
        }, false);
    });

};

page.open(address, function (status) {
    if (status !== 'success') {
        // console.log('ERROR: Unable to load', address);
        phantom.exit();
    } else {
        resultDocument.finalAddress = page.url;
    }
});
