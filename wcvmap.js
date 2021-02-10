
function triggerCLS() {
    let cls = 0;
	new PerformanceObserver((list) => {
		for (const entry of list.getEntries()) {
			if (!entry.hadRecentInput) {
				cls += entry.value
				console.log('Total:', cls, 'Current:', entry.value, ...entry.sources.map(s => s.node))
				
				//Mark the element shifted
				var elem = entry.sources.map(s => s.node)[0];
				
				if (elem  != null) {
					elem.style.border = '4px solid red';
					elem.style.borderRadius = '4em';					
				}
				
				changeLine('linecls', cls);
			}
		}
	}).observe({type: "layout-shift", buffered: true})
}

function markLCP() {
	new PerformanceObserver((entryList) => {
		for (const entry of entryList.getEntries()) {
			console.log('LCP candidate:', entry.startTime, entry);

			//Mark the element LCP
			var elem = entry.element;

			if (elem  != null) {
				elem.style.border = '4px solid blue';
				elem.style.borderRadius = '4em';					
			}

			changeLine('linelcp', entry.startTime);
		}
	  }).observe({type: 'largest-contentful-paint', buffered: true});
}

function changeLine(eltName, value) {
	var eltLine = document.getElementById(eltName);

	if (eltName == 'linecls') {
		var perc = 100 * value / 1;
		eltLine.style.left = perc+'%';
		eltLine.innerHTML = (value*100).toFixed(2) + '%';
	}

	if (eltName == 'linelcp') {
		var perc = 100 * value / 5000;
		eltLine.style.left = perc+'%';
		eltLine.innerHTML = value.toFixed(0) + ' ms';
	}

}

// give visual feedback asap
var loading = document.createElement("div");
loading.id = "wcvmap-loading";
loading.innerHTML = "Creating HeatMap for WebCoreVitals";
loading.style.cssText = "position:absolute; z-index:6000; left:40%; top:45%; background-color:#000; color:#fff; padding:20px 30px; font-family:\"Helvetica Neue\",sans-serif; font-size:24px; font-weight:800;border:2px solid white;";
document.body.appendChild(loading);

//Compute several performance metrics
// get full page load time to calculate heatmap max
var loaded = performance.timing.loadEventEnd - performance.timing.navigationStart;

// backend
var backend = performance.timing.responseEnd - performance.timing.navigationStart;
var backendLeft = (backend / loaded)*100;

// first paint in chrome from https://github.com/addyosmani/timing.js
if (window.chrome && window.chrome.loadTimes) {
	var paint = window.chrome.loadTimes().firstPaintTime * 1000;
	var firstPaint = paint - (window.chrome.loadTimes().startLoadTime*1000);
	var firstPaintLeft = (firstPaint / loaded)*100;
	hasFirstPaint = 1;
}

// remove any exisiting "clsmap" divs on second click
var elements = document.getElementsByClassName("clsmap");
while(elements.length > 0){
    elements[0].parentNode.removeChild(elements[0]);
}

// build bottom legend CLS
var gaugecls = document.createElement("div");
gaugecls.id = "clsmap";
var legendCLS = "<div style='width:10%; height: 25px; float:left; background-color:#0cce6b;'></div><div style='width:15%; height: 25px; float:left; background-color:#ffa400;'></div><div style='width:75%; height: 25px; float:left; background-color:#ff4e42;'></div>";
legendCLS += "<div style='position:absolute; z-index:3; left:0%; padding-top:5px; border-left:2px solid white;padding-left:5px;height:100%;color:#fff;'>CLS</div>";
legendCLS += "<div id='linecls' style='position:absolute; z-index:3; left:0%; padding-top:5px; border-left:2px solid white;padding-left:5px;height:100%;color:#fff;'></div></div>";
gaugecls.style.cssText = "position: fixed; width:100%; bottom:0; left:0; z-index:5000; height: 25px; color:#fff; font-family:\"Helvetica Neue\",sans-serif; font-size:14px; font-weight:800; line-height:14px;";
gaugecls.innerHTML = legendCLS;
document.body.appendChild(gaugecls);

// build bottom legend LCP
var gaugelcp = document.createElement("div");
gaugelcp.id = "lcpmap";
var legendLCP = "<div style='width:50%; height: 25px; float:left; background-color:#0cce6b;'></div><div style='width:30%; height: 25px; float:left; background-color:#ffa400;'></div><div style='width:20%; height: 25px; float:left; background-color:#ff4e42;'></div>";
legendLCP += "<div style='position:absolute; z-index:3; left:0%; padding-top:5px; border-left:2px solid white;padding-left:5px;height:100%;color:#fff;'>LCP</div>";
legendLCP += "<div id='linelcp' style='position:absolute; z-index:3; left:0%; padding-top:5px; border-left:2px solid white;padding-left:5px;height:100%;color:#fff;'></div></div>";
gaugelcp.style.cssText = "position: fixed; width:100%; bottom:30px; left:0; z-index:5000; height: 25px; color:#fff; font-family:\"Helvetica Neue\",sans-serif; font-size:14px; font-weight:800; line-height:14px;";
gaugelcp.innerHTML = legendLCP;
document.body.appendChild(gaugelcp);

// mark the LCP
markLCP();

// mark the CLS
triggerCLS();

// remove loading
loading.remove();



