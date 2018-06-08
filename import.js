(function() {
    var script = document.createElement('script');
    chrome.storage.sync.get({
      importChoice: 'cc',
      otherWiki: 'https://community.wikia.com',
      otherPage: 'Special:MyPage/globalDiscussions.javascript'
    }, function(items) {
      if (items.importChoice == "cc") {
        script.src = "https://community.wikia.com/index.php?title=Special:MyPage/globalDiscussions.javascript&action=raw&ctype=text/javascript";
      } else if (items.importChoice == "css") {
        script.src = "https://community.wikia.com/index.php?title=Special:MyPage/globalDiscussions.css&action=raw&ctype=text/javascript";
      } else if (items.importChoice == "common") {
        script.src = "https://community.wikia.com/index.php?title=Special:MyPage/common.js&action=raw&ctype=text/javascript";
      } else if (items.importChoice == "other") {
        script.src = items.otherWiki + "/index.php?title=" + items.otherPage + "&action=raw&ctype=text/javascript";
      }
    });
    script.type = 'text/javascript';
    document.body.appendChild(script);
})();
