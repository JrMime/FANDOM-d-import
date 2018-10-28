/**
 * options.js
 *
 * Handles events on the extension options screen
 */
(function() {
    'use strict';

    /**
     * Constants
     */
    var DEFAULTS = {
        css: 'Special:MyPage/globalDiscussions.css',
        js: 'Special:MyPage/globalDiscussions.javascript',
        wiki: 'https://community.wikia.com'
    }, TYPES = ['js', 'css'];

    /**
     * DOM node storage
     */
    var dom = {};

    /**
     * Retrieves a node by ID
     * @param {String} i Node ID
     * @returns {Node} Node with the given ID
     */
    function id(i) {
        return document.getElementById(i);
    }

    function clearStatus() {
        dom.status.textContent = '';
    }

    function savePrefs() {
        dom.status.textContent = 'Options saved.';
        setTimeout(clearStatus, 750);
    }

    function submit(e) {
        e.preventDefault();
        if (window.chrome && window.chrome.storage) {
            var prefs = {};
            TYPES.forEach(function(type) {
                prefs[type + '-type'] = dom[type].type.selectedIndex;
                prefs[type + '-wiki'] = dom[type].wiki.value;
                prefs[type + '-page'] = dom[type].page.value;
            });
            chrome.storage.sync.set(prefs, savePrefs);
        }
    }

    function updateState(target, type) {
        document.body.classList[
            target.selectedIndex === target.options.length - 1 ?
                'add' :
                'remove'
        ](type + '-other-display');
    }

    function selected(e) {
        var target = e.target;
        updateState(target, target.id.slice(0, -5));
    }

    function createElements(type) {
        dom[type] = {
            type: id(type + '-type'),
            page: id(type + '-other-page'),
            wiki: id(type + '-other-wiki')
        };
        dom[type].type.addEventListener('change', selected);
    }

    function preferences(items) {
        TYPES.forEach(function(type) {
            dom[type].type.selectedIndex = items[type + '-type'];
            dom[type].wiki.value = items[type + '-wiki'];
            dom[type].page.value = items[type + '-page'];
            updateState(dom[type].type, type);
        });
    }

    function onload() {
        dom.form = id('form');
        dom.status = id('status');
        dom.form.addEventListener('submit', submit);
        TYPES.forEach(createElements);
        // Let's not throw errors when previewing options HTML
        if (window.chrome && window.chrome.storage) {
            var prefs = {};
            TYPES.forEach(function(type) {
                prefs[type + '-type'] = 0;
                prefs[type + '-wiki'] = DEFAULTS.wiki;
                prefs[type + '-page'] = DEFAULTS[type];
            });
            chrome.storage.sync.get(prefs, preferences);
        }
    }

    window.addEventListener('load', onload);
})();
