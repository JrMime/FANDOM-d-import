(function() {
    var script = document.createElement('script'),
        scriptCSS = document.createElement('link');
    chrome.storage.sync.get({
      importChoiceJS: 'cc-JS',
      otherWikiJS: 'community',
      otherPageJS: 'Special:MyPage/globalDiscussions.javascript',
      importChoiceCSS: 'cc-CSS',
      otherWikiCSS: 'community',
      otherPageCSS: 'Special:MyPage/globalDiscussions.css'
    }, function(items) {
      console.log(items);
      if (items.importChoiceJS == "cc-JS") {
        script.src = "https://community.wikia.com/index.php?title=Special:MyPage/globalDiscussions.javascript&action=raw&ctype=text/javascript";
      } else if (items.importChoiceJS == "css-JS") {
        script.src = "https://community.wikia.com/index.php?title=Special:MyPage/globalDiscussions.css&action=raw&ctype=text/javascript";
      } else if (items.importChoiceJS == "common-JS") {
        script.src = "https://community.wikia.com/index.php?title=Special:MyPage/common.js&action=raw&ctype=text/javascript";
      } else if (items.importChoiceJS == "other-JS") {
        script.src = items.otherWikiJS + "/index.php?title=" + items.otherPageJS + "&action=raw&ctype=text/javascript";
      }
      if (items.importChoiceCSS == "cc-CSS") {
        scriptCSS.href = "https://community.wikia.com/index.php?title=Special:MyPage/globalDiscussions.css&action=raw&ctype=text/css";
      } else if (items.importChoiceCSS == "other-CSS") {
        scriptCSS.href = items.otherWikiCSS + "/index.php?title=" + items.otherPageCSS + "&action=raw&ctype=text/css";
      }
    });
    script.type = 'text/javascript';
    document.body.appendChild(script);
    scriptCSS.type = 'text/css';
    scriptCSS.rel = 'stylesheet';
    document.head.appendChild(scriptCSS);
})();
