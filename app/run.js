var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs-prebuilt')
var binPath = phantomjs.path

var childArgs = process.argv.slice(2);

childArgs.unshift(path.join(__dirname, 'lib/detectjs.js'));

childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    if (err) {
        process.exit(42);
    }
    console.log(stdout);
});
