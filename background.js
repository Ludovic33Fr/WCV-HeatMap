/*
chrome.browserAction.onClicked.addListener(function(activeTab) {
    chrome.tabs.executeScript(null, {
        code: "javascript:(function(){var el=document.createElement('script');el.src='https://ludovic33fr.github.io/WCV-HeatMap/wcvmap.js';document.body.appendChild(el);})();"
    });
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    if (changeInfo == "url") {
        chrome.tabs.executeScript(null, {
            code: "javascript:(function(){var el=document.createElement('script');el.src='https://ludovic33fr.github.io/WCV-HeatMap/wcvmap.js';document.body.appendChild(el);})();"
        });
    }
  });

chrome.tabs.onActivated.addListener(({tabId, windowId}) => {
    chrome.storage.sync.get(['active'], function(obj) {
        if (obj.active == true) {
            chrome.tabs.executeScript(null, {
                code: "javascript:(function(){var el=document.createElement('script');el.src='https://ludovic33fr.github.io/WCV-HeatMap/wcvmap.js';document.body.appendChild(el);})();"
            });
        }
    });
  });

chrome.tabs.onCreated.addListener(({tabId, windowId}) => {
    chrome.storage.sync.get(['active'], function(obj) {
        if (obj.active == true) {
            chrome.tabs.executeScript(null, {
                code: "javascript:(function(){var el=document.createElement('script');el.src='https://ludovic33fr.github.io/WCV-HeatMap/wcvmap.js';document.body.appendChild(el);})();"
            });
        }
    });
  });
*/

// User has navigated to a new URL in a tab
chrome.tabs.onUpdated.addListener ((tabId, changeInfo, tab) => {
  if (
    changeInfo.status == 'complete' &&
    tab.url.startsWith ('http') &&
    tab.active
  ) {
    InjectWatcherPerf ();
  }
});

// User has made a new or existing tab visible
chrome.tabs.onActivated.addListener (({tabId, windowId}) => {
  InjectWatcherPerf ();
});

function InjectWatcherPerf () {
  chrome.storage.sync.get (['active'], function (obj) {
    if (obj.active == true) {
      chrome.tabs.executeScript (null, {
        code: "javascript:(function(){var el=document.createElement('script');el.src='https://ludovic33fr.github.io/WCV-HeatMap/wcvmap.js';document.head.appendChild(el);})();",
      });
    }
  });
}
