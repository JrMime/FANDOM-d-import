// Saves options to chrome.storage
function save_options() {
  var importChoice = document.getElementById('importChoice').value,
      otherWiki = document.getElementById('other.wiki').value,
      otherPage = document.getElementById('other.page').value;
  chrome.storage.sync.set({
    importChoice: importChoice,
    otherWiki: otherWiki,
    otherPage: otherPage
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
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    importChoice: 'cc',
    otherWiki: 'community',
    otherPage: 'Special:MyPage/globalDiscussions.javascript'
  }, function(items) {
    document.getElementById('importChoice').value = items.importChoice;
    document.getElementById('other.wiki').value = items.otherWiki;
    document.getElementById('other.page').value = items.otherPage;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
