(function() {
    'use strict';

    /**
     * Constants
     */
    var DEFAULTS = {
        css: 'Special:MyPage/globalDiscussions.css',
        js: 'Special:MyPage/globalDiscussions.javascript',
        wiki: 'https://community.fandom.com'
    }, TYPES = ['js', 'css'], JS_PAGES = [
        DEFAULTS.js,
        'Special:MyPage/globalDiscussions.css',
        'Special:MyPage/common.js'
    ];

    function importJSByURL(url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.body.appendChild(script);
    }

    function importJS(prefs) {
        var page = JS_PAGES[prefs.type],
            url = (page ? DEFAULTS : prefs).wiki;
        url += '/index.php?title=' + encodeURIComponent(page || prefs.page) +
               '&action=raw&ctype=text/javascript';
        importJSByURL(chrome.extension.getURL('lib/jquery-3.3.1.min.js'));
        importJSByURL(url);
    }

    function importCSS(prefs) {
        var url, page;
        if (prefs.type === 0) {
            url = DEFAULTS.wiki;
            page = DEFAULTS.css;
        } else {
            url = prefs.wiki;
            page = prefs.page;
        }
        url += '/index.php?title=' + encodeURIComponent(page) +
               '&action=raw&ctype=text/css';
        var style = document.createElement('link');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = url;
        document.head.appendChild(style);
    }

    function preferences(items) {
        var prefs = {};
        TYPES.forEach(function(type) {
            prefs[type] = {
                page: items[type + '-page'],
                type: items[type + '-type'],
                wiki: items[type + '-wiki']
            };
        });
        importJS(prefs.js);
        importCSS(prefs.css);
    }

    function init() {
        var prefs = {};
        TYPES.forEach(function(type) {
            prefs[type + '-type'] = 0;
            prefs[type + '-wiki'] = DEFAULTS.wiki;
            prefs[type + '-page'] = DEFAULTS[type];
        });
        chrome.storage.sync.get(prefs, preferences);
    }

    init();
})();
