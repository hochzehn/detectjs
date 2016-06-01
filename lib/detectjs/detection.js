var librariesList = require('../vendor/johnmichel/Library-Detector-for-Chrome/libraries');

var detection = function (page, resultDocument) {
    function formatVersion(version) {
        var result = version;

        result = result || '';
        if (result == '@VERSION') {
            result = '';
        }

        return result;
    }

    function detectLibraries() {
        var tests = librariesList;
        var libraries = [];
        for (var i in tests) {
            try {
                var result = page.evaluate(tests[i].test);
                if (result === false) continue;
                if (result === null) continue;
                libraries.push({
                    name: i,
                    version: formatVersion(result.version)
                });
                // console.log(i + ' ' + result.version);
            } catch(e) {
                // console.log('Library Detector test for ' + i + ' failed:', e);
            }
        }
        return libraries;
    }

    resultDocument.javascript.libraries = detectLibraries();

    console.log(JSON.stringify(resultDocument, null, 4));

    phantom.exit();
};

module.exports = detection;
