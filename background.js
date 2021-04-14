// User has navigated to a new URL in a tab
chrome.tabs.onUpdated.addListener ((tabId, changeInfo, tab) => {
  if (
    changeInfo.status == 'loading' &&
    tab.url.startsWith ('http') &&
    tab.active
  ) {
    InjectWatcherAds ();
  }
});

// User has made a new or existing tab visible
chrome.tabs.onActivated.addListener (({tabId, windowId}) => {
  InjectWatcherAds ();
});

function InjectWatcherAds () {
  chrome.storage.sync.get (['active'], function (obj) {
    if (obj.active == true) {
      chrome.tabs.executeScript (null, {
        code: "javascript:(function(){var el=document.createElement('script');el.src='https://ludovic33fr.github.io/WCV-HeatMap/wcvmap.js';document.head.appendChild(el);})();",
      });
    }
  });
}
