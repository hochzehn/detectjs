// Source: https://github.com/johnmichel/Library-Detector-for-Chrome (MIT License)
var d41d8cd98f00b204e9800998ecf8427e_LibraryDetectorTests = {

    'GWT': {
        icon: 'gwt',
        url: 'http://www.gwtproject.org/',
        test: function() {
            var win = window;
            // pretty complicated, many possible tell tales
            var doc = win.document,
                hasHistFrame = doc.getElementById('__gwt_historyFrame'),
                hasGwtUid = doc.gwt_uid,
                hasBodyListener = doc.body.__listener,
                hasBodyEventBits = doc.body.__eventBits,
                hasModules = win.__gwt_activeModules,
                hasJsonP = win.__gwt_jsonp__,
                hasRootWinApp = win.__gwt_scriptsLoaded || win.__gwt_stylesLoaded || win.__gwt_activeModules;

            // use the many possible indicators
            if(hasHistFrame || hasGwtUid || hasBodyListener || hasBodyEventBits || hasModules || hasJsonP || hasRootWinApp) {

                // carefully look at frames, but only if certain is GWT frame
                var frames = doc.getElementsByTagName('iframe'),
                    gwtVersion = '';
                for(var n=0; n<frames.length; n++) {
                    // catch security access errors
                    try {
                        var hasNegativeTabIndex = frames[n].tabIndex < 0; // on for GWT
                        if(hasNegativeTabIndex && frames[n].contentWindow && frames[n].contentWindow.$gwt_version) {
                            gwtVersion = frames[n].contentWindow.$gwt_version;
                            break;
                        }
                    }
                    catch(e) {}
                }

                if(gwtVersion=='0.0.999') {
                  gwtVersion = '0.0.0-dev';
                }

                return { version: gwtVersion };
            }
            return false;
        }
    },

    'Ink': {
        icon: 'ink',
        url: 'http://ink.sapo.pt/',
        test: function() {
            var win = window;
            if (win.Ink && win.Ink.createModule) {
                return { version: '' };
            }
            return false;
        }
    },

    'Vaadin': {
        icon: 'vaadin',
        url: 'http://vaadin.com/home',
        test: function() {
            var win = window;
            if (win.vaadin && win.vaadin.registerWidgetset) {
                return { version: '' };
            }
            return false;
        }
    },

    'Bootstrap': {
        icon: 'bootstrap',
        url: 'http://getbootstrap.com/',
        // look for a function Boostrap has added to jQuery - regex for BS 2 & 3
        test: function() {
            var win = window;
            var jQueryAvailable = win.$ && win.$.fn,
                RE_PREFIX_V2 = '\\$this\\.data\\((?:\'|")',
                RE_PREFIX_V3 = '\\$this\\.data\\((?:\'|")(?:bs\\.){1}',
                bootstrapComponents = [
                    'affix', 'alert', 'button', 'carousel', 'collapse', 'dropdown',
                    'modal', 'popover', 'scrollspy', 'tab', 'tooltip'
                ];

            if(jQueryAvailable) {
                var bootstrapVersion;

                bootstrapComponents.some(function(component) {
                    if(win.$.fn[component]) {
                        // Bootstrap >= 3.2.0 detection
                        if(win.$.fn[component].Constructor && win.$.fn[component].Constructor.VERSION) {
                            bootstrapVersion = win.$.fn[component].Constructor.VERSION;
                            return true;
                        // Bootstrap >= 2.0.0 and <= 3.1.0 detection
                        } else if(new RegExp(RE_PREFIX_V3 + component).test(win.$.fn[component].toString())) {
                            bootstrapVersion = '>= 3.0.0 & <= 3.1.1';
                            return true;
                        // Bootstrap < 3.1.0 detection
                        } else if(new RegExp(RE_PREFIX_V2 + component).test(win.$.fn[component].toString())) {
                            bootstrapVersion = '>= 2.0.0 & <= 2.3.2';
                            return true;
                        }
                    }

                    return false;
                });

                if (bootstrapVersion) {
                    return { version: bootstrapVersion };
                }
            }

            return false;
        }
    },

    'Zurb': {
        icon: 'zurb',
        url: 'http://foundation.zurb.com/',
        test: function() {
            var win = window;
            if(win.Foundation && win.Foundation.version) {
                return { version: win.Foundation.version };
            }
            return false;
        }
    },

    'Polymer': {
        icon: 'polymer',
        url: 'http://www.polymer-project.org/',
        test: function() {
            var win = window;
            if(win.Polymer && win.Polymer.version) {
                return { version: win.Polymer.version };
            }
            return false;
        }
    },

    'Highcharts': {
        icon: 'highcharts',
        url: 'http://www.highcharts.com',
        test: function() {
            var win = window;
            if(win.Highcharts && win.Highcharts.version) {
                return { version: win.Highcharts.version };
            }
            return false;
        }
    },

    'InfoVis': {
        icon: 'jit',
        url: 'http://philogb.github.com/jit/',
        test: function() {
            var win = window;
            if(win.$jit && win.$jit.version) {
                return { version: win.$jit.version };
            }
            return false;
        }
    },

    'FlotCharts': {
        icon: 'icon_48',
        url: 'http://www.flotcharts.org/',
        test: function() {
            var win = window;
            if(win.$ && win.$.plot && win.$.plot.version) {
                return { version: win.$.plot.version };
            }
            return false;
        }
    },

    'Blackbird': {
        icon: 'blackbird',
        url: 'http://www.gscottolson.com/blackbirdjs/',
        test: function() {
            var win = window;
            if(win.log && win.log.warn) {
                return { version: ""}; // no version info
            }
            return false;
        }
    },

    'CreateJS': {
        icon: 'createjs',
        url: 'http://createjs.com/#!/CreateJS',
        test: function() {
            var win = window;
            if(win.Stage || win.Shape || win.Container) {
                return { version: ""}; // no version info available
            }
            return false;
        }
    },

    'Google Maps': {
        icon: 'gmaps',
        url: 'https://developers.google.com/maps/',
        test: function() {
            var win = window;
            if (win.google && win.google.maps && win.google.maps.version) {
                return { version: win.google.maps.version };
            }
            return false;
        }
    },

    'jQuery': {
        icon: 'jquery',
        url: 'http://jquery.com',
        test: function() {
            var win = window;
            var jq = win.jQuery || win.$ || win.$jq || win.$j;
            if(jq && jq.fn && jq.fn.jquery) {
                return { version: jq.fn.jquery };
            }
            return false;
        }
    },

    'jQuery UI': {
        icon: 'jquery_ui',
        url: 'http://jqueryui.com',
        test: function() {
            var win = window;
            var jq = win.jQuery || win.$ || win.$jq || win.$j;
            if(jq && jq.fn && jq.fn.jquery && jq.ui) {
                var plugins = 'accordion,datepicker,dialog,draggable,droppable,progressbar,resizable,selectable,slider,menu,grid,tabs'.split(','), concat = [];
                for (var i=0; i < plugins.length; i++) { if(jq.ui[plugins[i]]) concat.push(plugins[i].substr(0,1).toUpperCase() + plugins[i].substr(1)); }
                return { version: jq.ui.version, details: concat.length ? 'Plugins used: '+concat.join(',') : '' };
            }
            return false;
        }
    },

    'Dojo': {
        icon: 'dojo',
        url: 'http://dojotoolkit.org',
        test: function() {
            var win = window;
            if(win.dojo && win.dojo.version) {
                return { version: win.dojo.version.toString(), details: 'Details: '+(win.dijit ? 'Uses Dijit' : 'none') };
            }
            return false;
        }
    },

    'Prototype': {
        icon: 'prototype',
        url: 'http://prototypejs.org',
        test: function() {
            var win = window;
            if(win.Prototype && win.Prototype.Version) {
                return { version: win.Prototype.Version };
            }
            return false;
        }
    },

    'Scriptaculous': {
        icon: 'scriptaculous',
        url: 'http://script.aculo.us',
        test: function() {
            var win = window;
            if(win.Scriptaculous && win.Scriptaculous.Version) {
                return { version: win.Scriptaculous.Version };
            }
            return false;
        }
    },

    'MooTools': {
        icon: 'mootools',
        url: 'http://mootools.net',
        test: function() {
            var win = window;
            if(win.MooTools && win.MooTools.version) {
                return { version: win.MooTools.version };
            }
            return false;
        }
    },

    'Spry': {
        icon: 'spry',
        url: 'http://labs.adobe.com/technologies/spry',
        test: function() {
            var win = window;
            if (win.Spry && win.Spry.Data) {
                return { version: '' };
            }
            return false;
        }
    },

    'YUI 2': {
        icon: 'yui',
        url: 'http://developer.yahoo.com/yui/2/',
        test: function() {
            var win = window;
            if (win.YAHOO && win.YAHOO.VERSION) {
                return { version: win.YAHOO.VERSION };
            }
            return false;
        }
    },

    'YUI 3': {
        icon: 'yui3',
        url: 'http://yuilibrary.com/',
        test: function() {
            var win = window;
            if (win.YUI && win.YUI.Env && win.YUI.version) {
                return { version: win.YUI.version };
            }
            return false;
        }
    },

    'Qooxdoo': {
        icon: 'qooxdoo',
        url: 'http://qooxdoo.org',
        test: function() {
            var win = window;
            if(win.qx && win.qx.Bootstrap) {
                return { version: '' };
            }
            return false;
        }
    },

    'Ext JS': {
        icon: 'extjs',
        url: 'http://www.sencha.com/products/extjs',
        test: function() {
            var win = window;
            if(win.Ext && win.Ext.version) {
                return { version: win.Ext.version };
            }
            else if (win.Ext && win.Ext.versions) {
                return { version: win.Ext.versions.core.version };
            }
            return false;
        }
    },

    'base2': {
        icon: 'base2',
        url: 'http://code.google.com/p/base2',
        test: function() {
            var win = window;
            if(win.base2 && win.base2.version) {
                return { version: win.base2.version };
            }
            return false;
        }
    },

    'Closure Library': {
        icon: 'closure',
        url: 'https://developers.google.com/closure/library',
        test: function() {
            var win = window;
            if(win.goog && win.goog.provide) {
                return { version: '' };
            }
            return false;
        }
    },

    'Rapha&euml;l': {
        icon: 'raphael',
        url: 'http://dmitrybaranovskiy.github.io/raphael',
        test: function() {
            var win = window;
            if (win.Raphael && win.Raphael.circle) {
                return { version: win.Raphael.version };
            }
            return false;
        }
    },

    'React': {
        icon: 'react',
        url: 'http://facebook.github.io/react/',
        test: function() {
            var win = window;
            if (win.React && win.React.createClass) {
                return { version: win.React.version };
            }
            return false;
        }
    },

    'Modernizr': {
        icon: 'modernizr',
        url: 'http://www.modernizr.com',
        test: function() {
            var win = window;
            if (win.Modernizr && win.Modernizr.addTest) {
                return { version: win.Modernizr._version };
            }
            return false;
        }
    },

    'Processing.js': {
        icon: 'processingjs',
        url: 'http://processingjs.org',
        test: function() {
            var win = window;
            if(win.Processing && win.Processing.box) {
                return { version: Processing.version };
            }
            return false;
        }
    },

    'Backbone': {
        icon: 'backbone',
        url: 'http://documentcloud.github.com/backbone',
        test: function() {
            var win = window;
            if (win.Backbone && win.Backbone.Model.extend) {
                return {version: win.Backbone.VERSION};
            }
            return false;
        }
    },

    'Leaflet': {
        icon: 'leaflet',
        url: 'http://leafletjs.com',
        test: function() {
            var win = window;
            if (win.L && win.L.GeoJSON && win.L.marker) {
                return {version: win.L.version};
            }
            return false;
        }
    },

    'Mapbox': {
        icon: 'mapbox',
        url: 'http://mapbox.com',
        test: function() {
            var win = window;
            if (win.L && win.L.mapbox && win.L.mapbox.geocoder) {
                return { version: win.L.mapbox.VERSION };
            }
            return false;
        }
    },

    'Lo-Dash': {
        icon: 'lodash',
        url: 'http://lodash.com/',
        test: function() {
            var win = window;
            var _ = typeof (_ = win._) == 'function' && _,
                chain = typeof (chain = _ && _.chain) == 'function' && chain,
                wrapper = (chain || _ || function() { return {}; })(1);

            if (_ && _.VERSION && wrapper.__wrapped__) {
                return { version: _.VERSION };
            }
            return false;
        }
    },

    'Underscore': {
        icon: 'underscore',
        url: 'http://underscorejs.org/',
        test: function() {
            var win = window;
            if (win._ && win._.VERSION && typeof win._.tap === 'function' &&
                !d41d8cd98f00b204e9800998ecf8427e_LibraryDetectorTests['Lo-Dash'].test(win)) {
                return {version: win._.VERSION};
            }
            return false;
        }
    },

    'Sammy': {
        icon: 'sammy',
        url: 'http://sammyjs.org',
        test: function() {
            var win = window;
            if (win.Sammy && win.Sammy.VERSION && win.Sammy.Application.curry) {
                return {version: win.Sammy.VERSION};
            }
            return false;
        }
    },

    'Rico': {
        icon: 'rico',
        url: 'http://openrico.org',
        test: function() {
            var win = window;
            if (win.Rico && win.Rico.Version) {
                return {version: win.Rico.Version};
            }
            return false;
        }
    },

    'MochiKit': {
        icon: 'mochikit',
        url: 'http://www.mochikit.com',
        test: function() {
            var win = window;
            if (win.MochiKit && win.MochiKit.Base.module) {
                return {version: MochiKit.VERSION};
            }
            return false;
        }
    },

    'gRapha&euml;l': {
        icon: 'graphael',
        url: 'http://g.raphaeljs.com',
        test: function() {
            var win = window;
            if (win.Raphael && win.Raphael.fn.g) {
                return {version: ''};
            }
            return false;
        }
    },

    'Glow': {
        icon: 'glow',
        url: 'http://www.bbc.co.uk/glow',
        test: function() {
            var win = window;
            if (win.gloader) {
                return {version: ''};
            }
            else if (win.glow && win.glow.dom) {
                return {version: win.glow.VERSION};
            }
            else if (win.Glow) {
                return {version: win.Glow.version};
            }
            return false;
        }
    },

    'Socket.IO': {
        icon: 'socketio', // currently has no icon
        url: 'http://socket.io',
        test: function() {
            var win = window;
            if (win.io && win.io.sockets && win.io.version) {
                return {version: win.io.version};
            }
            return false;
        }
    },

    'Mustache': {
        icon: 'mustache',
        url: 'http://mustache.github.com',
        test: function() {
            var win = window;
            if (win.Mustache && win.Mustache.to_html) {
                return {version: win.Mustache.version};
            }
            return false;
        }
    },

    'Fabric.js': {
        icon: 'icon_48', // currently has no icon
        url: 'http://fabricjs.com/',
        test: function() {
            var win = window;
            if (win.fabric && win.fabric.util) {
                return {version: win.fabric.version};
            }
            return false;
        }
    },

    'FuseJS': {
        icon: 'fusejs',
        url: 'http://fusejs.com',
        test: function() {
            var win = window;
            if (win.fuse && win.fuse.version) {
                return {version: win.fuse.version};
            }
            return false;
        }
    },

    'Tween.js': {
        icon: 'icon_48', // currently has no icon
        url: 'https://github.com/sole/tween.js',
        test: function() {
            var win = window;
            if (win.TWEEN && win.TWEEN.Easing) {
                return {version: ''};
            }
            return false;
        }
    },

    'SproutCore': {
       icon: 'sproutcore',
       url: 'http://www.sproutcore.com',
       test: function() {
            var win = window;
           if (win.SC && win.SC.Application) {
               return {version: ''};
           }
           return false;
       }
    },

    'Zepto.js': {
       icon: 'zepto',
       url: 'http://zeptojs.com',
       test: function() {
            var win = window;
           if (win.Zepto && win.Zepto.fn) {
               return {version: ''};
           }
           return false;
       }
    },

    'three.js': {
       icon: 'icon_48', // currently has no icon
       url: 'https://github.com/mrdoob/three.js',
       test: function() {
            var win = window;
           if (win.THREE && win.THREE.REVISION) {
               return {version: 'r' + win.THREE.REVISION};
           }
           else if (win.THREE) {
               return {version: ''};
           }
           return false;
       }
    },

    'PhiloGL': {
       icon: 'philogl',
       url: 'http://www.senchalabs.org/philogl/',
       test: function() {
            var win = window;
           if (win.PhiloGL && win.PhiloGL.Camera) {
               return {version: win.PhiloGL.version};
           }
           return false;
       }
    },

    'CamanJS': {
        icon: 'camanjs',
        url: 'http://camanjs.com/',
        test: function() {
            var win = window;
            if (win.Caman && win.Caman.version) {
                return {version: win.Caman.version.release};
            }
            return false;
        }
    },

    'yepnope': {
        icon: 'yepnope',
        url: 'http://yepnopejs.com/',
        test: function() {
            var win = window;
            if (win.yepnope) {
                return {version: ''};
            }
            return false;
        }
    },

    'LABjs': {
        icon: 'icon_48',
        url: 'http://labjs.com/',
        test: function() {
            var win = window;
            if (win.$LAB) {
                return {version: ''};
            }
            return false;
        }
    },

    'Head JS': {
        icon: 'headjs',
        url: 'http://headjs.com/',
        test: function() {
            var win = window;
            if (win.head && win.head.js) {
                return {version: ''};
            }
            return false;
        }
    },

    'ControlJS': {
        icon: 'icon_48',
        url: 'http://stevesouders.com/controljs/',
        test: function() {
            var win = window;
            if (win.CJS && win.CJS.start) {
                return {version: ''};
            }
            return false;
        }
    },

    'RequireJS': {
        icon: 'requirejs',
        url: 'http://requirejs.org/',
        test: function() {
            var win = window;
            if ((win.require && win.require.load) || (win.requirejs && win.requirejs.load)) {
                return {version: win.require.version || win.requirejs.version};
            }
            return false;
        }
    },

    'RightJS': {
        icon: 'rightjs',
        url: 'http://rightjs.org/',
        test: function() {
            var win = window;
            if (win.RightJS && win.RightJS.isNode) {
                return {version: win.RightJS.version};
            }
            return false;
        }
    },

    'jQuery Tools': {
       icon: 'jquerytools',
       url: 'http://flowplayer.org/tools/',
       test: function() {
            var win = window;
            var jq = win.jQuery || win.$;
            if(jq && jq.tools) {
               return { version: jq.tools.version };
           }
           return false;
       }
    },

    'Pusher': {
       icon: 'pusher',
       url: 'http://pusher.com/docs/pusher_js/',
       test: function() {
            var win = window;
            if(win.Pusher && win.Pusher.Channel) {
               return { version: win.Pusher.VERSION };
           }
           return false;
       }
    },

    'Paper.js': {
       icon: 'paperjs',
       url: 'http://paperjs.org/',
       test: function() {
            var win = window;
            if(win.paper && win.paper.Point) {
               return { version: win.paper.version };
           }
           return false;
       }
    },

    'Swiffy': {
       icon: 'icon_48',
       url: 'http://www.google.com/doubleclick/studio/swiffy/',
       test: function() {
            var win = window;
            if(win.swiffy) {
               return { version: '' };
           }
           return false;
       }
    },

    'Move': {
       icon: 'move',
       url: 'http://movelang.org/',
       test: function() {
            var win = window;
            if(win.move && win.move.compile) {
               return { version: win.move.version() };
           }
           return false;
       }
    },

    'AmplifyJS': {
       icon: 'amplifyjs',
       url: 'http://amplifyjs.com/',
       test: function() {
            var win = window;
            if(win.amplify && win.amplify.publish) {
               return { version: '' };
           }
           return false;
       }
    },

    'Popcorn.js': {
       icon: 'popcornjs',
       url: 'http://mozillapopcorn.org/popcornjs/',
       test: function() {
            var win = window;
            if (win.Popcorn && win.Popcorn.Events) {
               return { version: win.Popcorn.version };
           }
           return false;
       }
    },

    'D3': {
        icon: 'd3',
        url: 'http://d3js.org',
        test: function() {
            var win = window;
            if (win.d3 && win.d3.select) {
                return { version: win.d3.version };
            }
            return false;
        }
    },

    'Handlebars': {
        icon: 'handlebars',
        url: 'http://handlebarsjs.com/',
        test: function() {
            var win = window;
            if(win.Handlebars && win.Handlebars.compile) {
                return { version: win.Handlebars.VERSION };
            }
            return false;
        }
    },

    'Knockout': {
        icon: 'knockout',
        url: 'http://knockoutjs.com/',
        test: function() {
            var win = window;
            if (win.ko && win.ko.applyBindings) {
                return { version: win.ko.version };
            }
            return false;
        }
    },

    'Spine': {
        icon: 'icon_48',
        url: 'http://spinejs.com/',
        test: function() {
            var win = window;
            if (win.Spine && win.Spine.Controller) {
                return {version: win.Spine.version};
            }
            return false;
        }
    },

    'jQuery Mobile': {
        icon: 'jquery_mobile',
        url: 'http://jquerymobile.com/',
        test: function() {
            var win = window;
            var jq = win.jQuery || win.$ || win.$jq || win.$j;
            if(jq && jq.fn && jq.fn.jquery && jq.mobile) {
                return { version: jq.mobile.version || '' };
            }
            return false;
        }
    },

    'WebFont Loader': {
        icon: 'icon_48',
        url: 'https://github.com/typekit/webfontloader',
        test: function() {
            var win = window;
            if(win.WebFont && win.WebFont.load) {
                return { version: "" };
            }
            return false;
        }
    },

    'AngularJS': {
        icon: 'angularjs',
        url: 'http://angularjs.org',
        test: function() {
            var win = window;
            var ng = win.angular;
            if(ng && ng.version && ng.version.full) {
                return { version: ng.version.full };
            }
            return false;
        }
    },

    'Ember.js': {
        icon: 'emberjs',
        url: 'http://emberjs.com/',
        test: function() {
            var win = window;
            var ember = win.Ember || win.Em;
            if (ember && ember.VERSION) {
                return { version: ember.VERSION };
            }
            return false;
        }
    },

    'Hammer.js': {
        icon: 'hammerjs',
        url: 'http://eightmedia.github.io/hammer.js/',
        test: function() {
            var win = window;
            var hammer = win.Hammer;
            if(hammer && hammer.Pinch) {
                // Hammer.VERSION available in 1.0.10+
                return { version: hammer.VERSION || "&lt; 1.0.10" };
            }
            return false;
        }
    },

    'Visibility.js': {
        icon: 'icon_48',
        url: 'https://github.com/ai/visibilityjs',
        test: function() {
            var win = window;
            var visibility = win.Visibility;
            if(visibility && visibility.every) {
                return { version: '' };
            }
            return false;
        }
    },

    'Velocity.js': {
        icon: 'icon_48',
        url: 'http://velocityjs.org/',
        test: function() {
            var win = window;
            var jq = win.jQuery || win.$,
                velocity = jq ? jq.Velocity : win.Velocity;

            if(velocity && velocity.RegisterEffect) {
                return {
                    version:
                        velocity.version.major + "." +
                        velocity.version.minor + "." +
                        velocity.version.patch
                };
            }
            return false;
        }
    },

    'IfVisible.js': {
        icon: 'icon_48',
        url: 'http://serkanyersen.github.io/ifvisible.js/',
        test: function() {
            var win = window;
            var iv = win.ifvisible;
            if(iv && iv.__ceGUID === "ifvisible.object.event.identifier") {
                return { version: "" };
            }
            return false;
        }
    },
    'Pixi.js': {
        icon: 'pixi',
        url: 'https://github.com/GoodBoyDigital/pixi.js',
        test: function() {
            var win = window;
            var px = win.PIXI;
            if(px && px.VERSION) {
                return { version: PIXI.VERSION.split('v')[1] };
            }
            return false;
        }
    },
    'DC.js': {
        icon: 'icon_48',
        url: 'http://dc-js.github.io/dc.js/',
        test: function() {
            var win = window;
            var dc = win.dc;
            if(dc && dc.version && dc.registerChart) {
                return { version: dc.version };
            }
            return false;
        }
    },
    'Greensock JS': {
        icon: 'greensock',
        url: 'https://github.com/greensock/GreenSock-JS',
        test: function() {
            var win = window;
            var gs = win.TweenMax || win.TweenLite ;
            if(gs && gs.version) {
                return { version: gs.version }
            }
            return false;
        }
    },
    'FastClick': {
        icon: 'fastclick',
        url: 'https://github.com/ftlabs/fastclick',
        test: function() {
            var win = window;
            if(win.FastClick && win.FastClick.notNeeded) {
                return { version: '' }
            }
            return false;
        }
    },
    'Isotope': {
        icon: 'isotope',
        url: 'https://github.com/metafizzy/isotope',
        test: function() {
            var win = window;
            var iso = win.Isotope || (win.$ != null && win.$.Isotope);
            if(iso) {
                return { version: '' }
            }
            return false;
        }
    },
    'Marionette': {
        icon: 'marionette',
        url: 'http://marionettejs.com/',
        test: function() {
            var win = window;
            if(win.Marionette && win.Marionette.Application) {
                return { version: win.Marionette.VERSION };
            }
            return false;
        }
    },
    'Can': {
        icon: 'icon_48',
        url: 'http://canjs.com/',
        test: function() {
            var win = window;
            if (win.can && win.can.Construct) {
                return { version: win.can.VERSION };
            }
            return false;
        }
    },
    'Vue': {
        icon: 'vue',
        url: 'http://vuejs.org/',
        test: function() {
            var win = window;
            if (win.Vue && win.Vue.compiler) {
                return { version: '' };
            }
            return false;
        }
    },
    'Two': {
        icon: 'two',
        url: 'https://jonobr1.github.io/two.js',
        test: function() {
            var win = window;
            if (win.Two && win.Two.Utils) {
                return { version: win.Two.Version };
            }
            return false;
        }
    },
    'Brewser': {
        icon: 'brewser',
        url: 'http://handcraftedldn.github.io/brewser/',
        test: function() {
            var win = window;
            if(win.BREWSER && win.BREWSER.ua) {
                return { version: BREWSER.VERSION };
            }
            return false;
        }
    },
    'Material Design Lite': {
    	icon: 'mdl',
    	url: 'http://www.getmdl.io/',
    	test: function() {
            var win = window;
    		if(win.componentHandler && win.componentHandler.upgradeElement) {
    			return { version: ''};
    		}
    		return false;
    	}
    },
    'Kendo UI': {
        icon: 'kendoui',
        url: 'https://github.com/telerik/kendo-ui-core',
        test: function() {
            var win = window;
            if (win.kendo && win.kendo.View && win.kendo.View.extend) {
                return {version: win.kendo.version};
            }
            return false;
        }
    },
    'Matter.js': {
        icon: 'matter-js',
        url: 'http://brm.io/matter-js/',
        test: function() {
            var win = window;
            if (win.Matter && win.Matter.Engine) {
                return {version: ''};
            }
            return false;
        }
    },
    'Riot': {
        icon: 'riot',
        url: 'http://riotjs.com/',
        test: function() {
            var win = window;
            if (win.riot && win.riot.mixin) {
                return { version: win.riot.version };
            }
            return false;
        }
    }
};

module.exports = d41d8cd98f00b204e9800998ecf8427e_LibraryDetectorTests;
