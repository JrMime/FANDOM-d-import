// Saves options to chrome.storage
function save_options() {
  var importChoiceJS = document.getElementById('importChoice-JS').value,
      otherWikiJS = document.getElementById('other-JS.wiki').value,
      otherPageJS = document.getElementById('other-JS.page').value,
      importChoiceCSS = document.getElementById('importChoice-CSS').value,
      otherWikiCSS = document.getElementById('other-CSS.wiki').value,
      otherPageCSS = document.getElementById('other-CSS.page').value;
  chrome.storage.sync.set({
    importChoiceJS: importChoiceJS,
    otherWikiJS: otherWikiJS,
    otherPageJS: otherPageJS,
    importChoiceCSS: importChoiceCSS,
    otherWikiCSS: otherWikiCSS,
    otherPageCSS: otherPageCSS
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    importChoiceJS: 'cc-JS',
    otherWikiJS: 'https://community.wikia.com',
    otherPageJS: 'Special:MyPage/globalDiscussions.javascript',
    importChoiceCSS: 'cc-CSS',
    otherWikiCSS: 'https://community.wikia.com',
    otherPageCSS: 'Special:MyPage/globalDiscussions.css'
  }, function(items) {
    document.getElementById('importChoice-JS').value = items.importChoiceJS;
    document.getElementById('other-JS.wiki').value = items.otherWikiJS;
    document.getElementById('other-JS.page').value = items.otherPageJS;
    document.getElementById('importChoice-CSS').value = items.importChoiceCSS;
    document.getElementById('other-CSS.wiki').value = items.otherWikiCSS;
    document.getElementById('other-CSS.page').value = items.otherPageCSS;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
