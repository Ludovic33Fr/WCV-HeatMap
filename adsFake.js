
function triggerAds() {

}


// give visual feedback asap
var loading = document.createElement("div");
loading.id = "Cds-FakeAds";
loading.innerHTML = "Creating fake ads to test inject js";
loading.style.cssText = "position:absolute; z-index:6000; left:40%; top:45%; background-color:#000; color:#fff; padding:20px 30px; font-family:\"Helvetica Neue\",sans-serif; font-size:24px; font-weight:800;border:2px solid white;";
document.body.appendChild(loading);

// Trigger a new ad into the page
triggerAds();

// remove loading
loading.remove();



