chrome.browserAction.onClicked.addListener(function(activeTab) {
    chrome.tabs.executeScript(null, {
        code: "javascript:(function(){var el=document.createElement('script');el.src='https://raw.githubusercontent.com/Ludovic33Fr/WCV-HeatMap/main/wcvmap.js';document.body.appendChild(el);})();"
    });
});
