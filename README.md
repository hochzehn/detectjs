# detectjs
Detect JavaScript libraries used on any web page, in your CLI.

## Installation

You need to have Docker and Bash installed.

Clone this repository:

    git clone https://github.com/hochzehn/detectjs.git

Install detection libraries by using

    cd detectjs
    bin/updateLibraries.sh

## Usage

    bin/run.sh http://cnn.com/
    
gives

    {
        "address": "http://cnn.com/",
        "date": 1464338170336,
        "javascript": {
            "hasError": true,
            "libraries": [
                {
                    "name": "jQuery",
                    "version": "1.12.3"
                },
                {
                    "name": "Modernizr",
                    "version": "3.3.1"
                },
                {
                    "name": "yepnope",
                    "version": ""
                }
            ]
        }
    }

## Credits

We mainly stick together amazing work done by these software craftsmen:

- [Ariya Hidayat (ariya)](https://github.com/ariya) - [PhantomJS](https://github.com/ariya/phantomjs) and [JS library detection script](http://ariya.ofilabs.com/2013/07/detecting-js-libraries-versions.html)
- [John Michel (johnmichel)](https://github.com/johnmichel) - [Library Detector for Chrome](https://github.com/johnmichel/Library-Detector-for-Chrome)

