let chboxActive = document.getElementById('activate');

chboxActive.onclick = setRemember;

chrome.storage.sync.get(['active'], function(obj) {
    chboxActive.checked = obj.active
});

function setRemember() {
    const payload = {
        active: chboxActive.checked ? true: false
      }
      chrome.storage.sync.set(payload);
}
